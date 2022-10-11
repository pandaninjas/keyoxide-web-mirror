/*
Copyright (C) 2021 Yarmo Mackenbach

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If your software can interact with users remotely through a computer network,
you should also make sure that it provides a way for users to get its source.
For example, if your program is a web application, its interface could display
a "Source" link that leads users to an archive of the code. There are many
ways you could offer source, and different solutions will be better for different
programs; see section 13 for the specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary. For
more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
*/
import * as doipjs from 'doipjs'
import { fetchWKD, fetchHKP, fetchSignature, fetchKeybase } from './keys.js'
import libravatar from 'libravatar'

const generateWKDProfile = async (id) => {
    return fetchWKD(id)
    .then(async key => {
        let keyData = await doipjs.keys.process(key.publicKey)
        keyData.openpgp4fpr = `openpgp4fpr:${keyData.fingerprint.toLowerCase()}`
        keyData.key.fetchMethod = 'wkd'
        keyData.key.uri = key.fetchURL
        keyData.key.data = {}
        keyData = processKeyData(keyData)

        let keyoxideData = {}
        keyoxideData.url = `https://${process.env.DOMAIN}/wkd/${id}`

        return {
            key: key,
            keyData: keyData,
            keyoxide: keyoxideData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: {},
            keyData: {},
            keyoxide: {},
            extra: {},
            errors: [err.message]
        }
    })
}

const generateHKPProfile = async (id, keyserverDomain) => {
    return fetchHKP(id, keyserverDomain)
    .then(async key => {
        let keyData = await doipjs.keys.process(key.publicKey)
        keyData.openpgp4fpr = `openpgp4fpr:${keyData.fingerprint.toLowerCase()}`
        keyData.key.fetchMethod = 'hkp'
        keyData.key.uri = key.fetchURL
        keyData.key.data = {}
        keyData = processKeyData(keyData)

        let keyoxideData = {}
        if (!keyserverDomain || keyserverDomain === 'keys.openpgp.org') {
            keyoxideData.url = `https://${process.env.DOMAIN}/hkp/${id}`
        } else {
            keyoxideData.url = `https://${process.env.DOMAIN}/hkp/${keyserverDomain}/${id}`
        }

        return {
            key: key,
            keyData: keyData,
            keyoxide: keyoxideData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: {},
            keyData: {},
            keyoxide: {},
            extra: {},
            errors: [err.message]
        }
    })
}

const generateAutoProfile = async (id) => {
    let result
    
    if (id.includes('@')) {
        result = await generateWKDProfile(id)

        if (result && result.errors.length === 0) {
            return result
        }
    }

    result = await generateHKPProfile(id)
    if (result && result.errors.length === 0) {
        return result
    }

    return {
        key: {},
        keyData: {},
        keyoxide: {},
        extra: {},
        errors: ["No public keys could be found"]
    }
}

const generateSignatureProfile = async (signature) => {
    return fetchSignature(signature)
    .then(async key => {
        let keyData = key.keyData
        keyData.openpgp4fpr = `openpgp4fpr:${keyData.fingerprint.toLowerCase()}`
        delete key.keyData
        keyData.key.data = {}
        keyData = processKeyData(keyData)

        let keyoxideData = {}

        return {
            key: key,
            keyData: keyData,
            keyoxide: keyoxideData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: {},
            keyData: {},
            keyoxide: {},
            extra: {},
            errors: [err.message]
        }
    })
}

const generateKeybaseProfile = async (username, fingerprint) => {
    return fetchKeybase(username, fingerprint)
    .then(async key => {
        let keyData = await doipjs.keys.process(key.publicKey)
        keyData.openpgp4fpr = `openpgp4fpr:${keyData.fingerprint.toLowerCase()}`
        keyData.key.fetchMethod = 'hkp'
        keyData.key.uri = key.fetchURL
        keyData.key.data = {}
        keyData = processKeyData(keyData)

        let keyoxideData = {}
        keyoxideData.url = `https://${process.env.DOMAIN}/keybase/${username}/${fingerprint}`

        return {
            key: key,
            keyData: keyData,
            keyoxide: keyoxideData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: {},
            keyData: {},
            keyoxide: {},
            extra: {},
            errors: [err.message]
        }
    })
}

const processKeyData = (keyData) => {
    keyData.users.forEach(user => {
        // Remove faulty claims
        user.claims = user.claims.filter(claim => {
            return claim instanceof doipjs.Claim
        })

        // Match claims
        user.claims.forEach(claim => {
            claim.match()
        })

        // Sort claims
        user.claims.sort((a,b) => {
            if (a.matches.length == 0) return 1
            if (b.matches.length == 0) return -1

            if (a.matches[0].serviceprovider.name < b.matches[0].serviceprovider.name) {
                return -1
            }
            if (a.matches[0].serviceprovider.name > b.matches[0].serviceprovider.name) {
                return 1
            }
            return 0
        })
    })

    return keyData
}

const computeExtraData = async (key, keyData) => {
    // Get the primary user
    const primaryUser = await key.publicKey.getPrimaryUser()

    // Query libravatar to get the avatar url
    return {
        avatarURL: await libravatar.get_avatar_url({ email: primaryUser.user.userID.email, size: 128, default: 'mm', https: true })
    }
}

export { generateWKDProfile }
export { generateHKPProfile }
export { generateAutoProfile }
export { generateKeybaseProfile }
export { generateSignatureProfile }

export * as utils from './utils.js'
