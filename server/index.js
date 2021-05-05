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
const doip = require('doipjs')
const openpgp = require('openpgp')
const keys = require('./keys')

const generateWKDProfile = async (id) => {
    return keys.fetchWKD(id)
    .then(async key => {
        let keyData = await doip.keys.process(key.publicKey)
        keyData.key.fetchMethod = 'wkd'
        keyData.key.uri = key.fetchURL
        keyData.key.data = null
        keyData = processKeyData(keyData)

        return {
            key: key,
            keyData: keyData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: null,
            keyData: null,
            extra: null,
            errors: [err.message]
        }
    })
}

const generateHKPProfile = async (id, keyserverDomain) => {
    return keys.fetchHKP(id, keyserverDomain)
    .then(async key => {
        let keyData = await doip.keys.process(key.publicKey)
        keyData.key.fetchMethod = 'hkp'
        keyData.key.uri = key.fetchURL
        keyData.key.data = null
        keyData = processKeyData(keyData)

        return {
            key: key,
            keyData: keyData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: null,
            keyData: null,
            extra: null,
            errors: [err.message]
        }
    })
}

const generateSignatureProfile = async (signature) => {
    return keys.fetchSignature(signature)
    .then(async key => {
        let keyData = key.keyData
        delete key.keyData
        keyData.key.data = null
        keyData = processKeyData(keyData)

        return {
            key: key,
            keyData: keyData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: null,
            keyData: null,
            extra: null,
            errors: [err.message]
        }
    })
}

const generateKeybaseProfile = async (username, fingerprint) => {
    return keys.fetchKeybase(id, keyserverDomain)
    .then(async key => {
        let keyData = await doip.keys.process(key.publicKey)
        keyData.key.fetchMethod = 'hkp'
        keyData.key.uri = key.fetchURL
        keyData.key.data = null
        keyData = processKeyData(keyData)

        return {
            key: key,
            keyData: keyData,
            extra: await computeExtraData(key, keyData),
            errors: []
        }
    })
    .catch(err => {
        return {
            key: null,
            keyData: null,
            extra: null,
            errors: [err.message]
        }
    })
}

const processKeyData = (keyData) => {
    keyData.users.forEach(user => {
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

    // Compute hash needed for avatar services
    const profileHash = openpgp.util.str_to_hex(openpgp.util.Uint8Array_to_str(await openpgp.crypto.hash.md5(openpgp.util.str_to_Uint8Array(primaryUser.user.userId.email))))

    return {
        avatarURL: `https://www.gravatar.com/avatar/${profileHash}?s=128&d=mm`
    }
}

exports.generateWKDProfile = generateWKDProfile
exports.generateHKPProfile = generateHKPProfile
exports.generateKeybaseProfile = generateKeybaseProfile
exports.generateSignatureProfile = generateSignatureProfile

exports.utils = require('./utils')
