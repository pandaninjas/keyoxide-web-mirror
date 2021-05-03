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
const got = require('got')
const doip = require('doipjs')
const openpgp = require('openpgp')
const utils = require('./utils')

const fetchWKD = (id) => {
    return new Promise(async (resolve, reject) => {
        let output = {
            publicKey: null,
            fetchURL: null
        }

        const [, localPart, domain] = /([^\@]*)@(.*)/.exec(id)
        const localEncoded = await utils.computeWKDLocalPart(localPart)
        const urlAdvanced = `https://openpgpkey.${domain}/.well-known/openpgpkey/${domain}/hu/${localEncoded}`
        const urlDirect = `https://${domain}/.well-known/openpgpkey/hu/${localEncoded}`
        let plaintext

        try {
            plaintext = await got(urlAdvanced).then((response) => {
                if (response.statusCode === 200) {
                    output.fetchURL = urlAdvanced
                    return new Uint8Array(response.rawBody)
                } else {
                    return null
                }
            })
        } catch (e) {
            try {
                plaintext = await got(urlDirect).then((response) => {
                    if (response.statusCode === 200) {
                        output.fetchURL = urlDirect
                        return new Uint8Array(response.rawBody)
                    } else {
                        return null
                    }
                })
            } catch (error) {
                reject(new Error(`No public keys could be fetched using WKD`))
            }
        }

        if (!plaintext) {
            reject(new Error(`No public keys could be fetched using WKD`))
        }

        try {
            output.publicKey = (await openpgp.key.read(plaintext)).keys[0]
        } catch(error) {
            reject(new Error(`No public keys could be read from the data fetched using WKD`))
        }

        if (!output.publicKey) {
            reject(new Error(`No public keys could be read from the data fetched using WKD`))
        }

        resolve(output)
    })
}

const fetchHKP = (id, keyserverDomain) => {
    return new Promise(async (resolve, reject) => {
        let output = {
            publicKey: null,
            fetchURL: null
        }

        keyserverDomain = keyserverDomain ? keyserverDomain : 'keys.openpgp.org'

        let query = ''
        if (id.includes('@')) {
            query = id
        } else {
            query = `0x${id}`
        }

        try {
            output.publicKey = await doip.keys.fetchHKP(id, keyserverDomain)
            output.fetchURL = `https://${keyserverDomain}/pks/lookup?op=get&options=mr&search=${query}`
        } catch(error) {
            reject(new Error(`No public keys could be fetched using HKP`))
        }

        if (!output.publicKey) {
            reject(new Error(`No public keys could be fetched using HKP`))
        }

        resolve(output)
    })
}

const fetchSignature = (signature) => {
    return new Promise(async (resolve, reject) => {
        let output = {
            publicKey: null,
            fetchURL: null,
            keyData: null
        }

        // Check validity of signature
        let signatureData
        try {
            signatureData = await openpgp.cleartext.readArmored(signature)
        } catch (error) {
            reject(new Error(`Signature could not be properly read (${error.message})`))
        }

        // Process the signature
        try {
            output.keyData = await doip.signatures.process(signature)
            output.publicKey = output.keyData.key.data
            // TODO Find the URL to the key
            output.fetchURL = null
        } catch(error) {
            reject(new Error(`Signature could not be properly read (${error.message})`))
        }

        // Check if a key was fetched
        if (!output.publicKey) {
            reject(new Error(`No public keys could be fetched`))
        }

        // Check validity of signature
        const verified = await openpgp.verify({
            message: signatureData,
            publicKeys: output.publicKey
        })
        const { valid } = verified.signatures[0]
        if (!valid) {
            reject(new Error('Signature was invalid'))
        }

        resolve(output)
    })
}

const fetchKeybase = (username, fingerprint) => {
    return new Promise(async (resolve, reject) => {
        let output = {
            publicKey: null,
            fetchURL: null
        }

        try {
            output.publicKey = await doip.keys.fetchKeybase(username, fingerprint)
            output.fetchURL = `https://keybase.io/${username}/pgp_keys.asc?fingerprint=${fingerprint}`
        } catch(error) {
            reject(new Error(`No public keys could be fetched from Keybase`))
        }

        if (!output.publicKey) {
            reject(new Error(`No public keys could be fetched from Keybase`))
        }

        resolve(output)
    })
}

exports.fetchWKD = fetchWKD
exports.fetchHKP = fetchHKP
exports.fetchSignature = fetchSignature
exports.fetchKeybase = fetchKeybase
