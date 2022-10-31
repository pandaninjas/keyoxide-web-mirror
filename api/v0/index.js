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
import express from 'express'
import { check, validationResult } from 'express-validator'
import Ajv from 'ajv'
import { generateWKDProfile, generateHKPProfile } from '../../server/index.js'
import 'dotenv/config.js'

const router = express.Router()
const ajv = new Ajv({coerceTypes: true})

const apiProfileSchema = {
    type: "object",
    properties: {
        keyData: {
            type: "object",
            properties: {
                fingerprint: {
                    type: "string"
                },
                openpgp4fpr: {
                    type: "string"
                },
                users: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            userData: {
                                type: "object",
                                properties: {
                                    id: { type: "string" },
                                    name: { type: "string" },
                                    email: { type: "string" },
                                    comment: { type: "string" },
                                    isPrimary: { type: "boolean" },
                                    isRevoked: { type: "boolean" },
                                }
                            },
                            claims: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        claimVersion: { type: "integer" },
                                        uri: { type: "string" },
                                        fingerprint: { type: "string" },
                                        status: { type: "string" },
                                        matches: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    serviceProvider: {
                                                        type: "object",
                                                        properties: {
                                                            type: { type: "string" },
                                                            name: { type: "string" },
                                                        }
                                                    },
                                                    match: {
                                                        type: "object",
                                                        properties: {
                                                            regularExpression: { type: "object" },
                                                            isAmbiguous: { type: "boolean" },
                                                        }
                                                    },
                                                    profile: {
                                                        type: "object",
                                                        properties: {
                                                            display: { type: "string" },
                                                            uri: { type: "string" },
                                                            qr: { type: "string" },
                                                        }
                                                    },
                                                    proof: {
                                                        type: "object",
                                                        properties: {
                                                            uri: { type: "string" },
                                                            request: {
                                                                type: "object",
                                                                properties: {
                                                                    fetcher: { type: "string" },
                                                                    access: { type: "string" },
                                                                    format: { type: "string" },
                                                                    data: { type: "object" },
                                                                }
                                                            },
                                                        }
                                                    },
                                                    claim: {
                                                        type: "object",
                                                        properties: {
                                                            format: { type: "string" },
                                                            relation: { type: "string" },
                                                            path: {
                                                                type: "array",
                                                                items: {
                                                                    type: "string"
                                                                }
                                                            },
                                                        }
                                                    },
                                                }
                                            }
                                        },
                                        verification: {
                                            type: "object"
                                        },
                                        summary: {
                                            type: "object",
                                            properties: {
                                                profileName: { type: "string" },
                                                profileURL: { type: "string" },
                                                serviceProviderName: { type: "string" },
                                                isVerificationDone: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                            }
                                        }
                                    }
                                }
                            },
                        }
                    }
                },
                primaryUserIndex: {
                    type: "integer"
                },
                key: {
                    type: "object",
                    properties: {
                        data: { type: "object" },
                        fetchMethod: { type: "string" },
                        uri: { type: "string" },
                    }
                },
            },
        },
        keyoxide: {
            type: "object",
            properties: {
                url: { type: "string" },
            }
        },
        extra: {
            type: "object",
            properties: {
                avatarURL: { type: "string" },
            }
        },
        errors: {
            type: "array"
        },
    },
    required: ["keyData", "keyoxide", "extra", "errors"],
    additionalProperties: false
}

const apiProfileValidate = ajv.compile(apiProfileSchema)

const doVerification = async (data) => {
    let promises = []
    let results = []
    let verificationOptions = {
        proxy: {
            hostname: process.env.PROXY_HOSTNAME,
            policy: (process.env.PROXY_HOSTNAME != "") ? 'adaptive' : 'never'
        }
    }

    for (let iUser = 0; iUser < data.keyData.users.length; iUser++) {
        const user = data.keyData.users[iUser]
        
        for (let iClaim = 0; iClaim < user.claims.length; iClaim++) {
            const claim = user.claims[iClaim]
            
            promises.push(
                new Promise(async (resolve, reject) => {
                    await claim.verify(verificationOptions)
                    results.push([iUser, iClaim, claim])
                    resolve()
                })
            )
        }
    }
    await Promise.all(promises)
    
    results.forEach(result => {
        data.keyData.users[result[0]].claims[result[1]] = result[2]
    })

    return data
}

const sanitize = (data) => {
    let results = []
    
    const dataClone = JSON.parse(JSON.stringify(data))
    
    for (let iUser = 0; iUser < dataClone.keyData.users.length; iUser++) {
        const user = dataClone.keyData.users[iUser]
        
        for (let iClaim = 0; iClaim < user.claims.length; iClaim++) {
            const claim = user.claims[iClaim]
            
            // TODO Fix upstream
            for (let iMatch = 0; iMatch < claim.matches.length; iMatch++) {
                const match = claim.matches[iMatch];
                if (Array.isArray(match.claim)) {
                    match.claim = match.claim[0]
                }
            }
            // TODO Fix upstream
            if (!claim.verification) {
                claim.verification = {}
            }
            // TODO Fix upstream
            claim.matches.forEach(match => {
                match.proof.request.access = ['generic', 'nocors', 'granted', 'server'][match.proof.request.access]
                match.claim.format = ['uri', 'fingerprint', 'message'][match.claim.format]
                match.claim.relation = ['contains', 'equals', 'oneof'][match.claim.relation]
            })

            data.keyData.users[iUser].claims[iClaim] = claim
        }
    }

    const valid = apiProfileValidate(data)
    if (!valid) {
        throw new Error(`Profile data sanitization error`)
    }

    return data
}

const addSummaryToClaims = (data) => {
    // To be removed when data is added by DOIP library
    for (let userIndex = 0; userIndex < data.keyData.users.length; userIndex++) {
        const user = data.keyData.users[userIndex]
        
        for (let claimIndex = 0; claimIndex < user.claims.length; claimIndex++) {
            const claim = user.claims[claimIndex]

            const isVerificationDone = claim.status === "verified"
            const isVerified = isVerificationDone ? claim.verification.result : false
            const isAmbiguous = isVerified
                ? false
                : claim.matches.length > 1 || claim.matches[0].match.isAmbiguous
            
            data.keyData.users[userIndex].claims[claimIndex].summary = {
                profileName: !isAmbiguous ? claim.matches[0].profile.display : claim.uri,
                profileURL: !isAmbiguous ? claim.matches[0].profile.uri : "",
                serviceProviderName: !isAmbiguous ? claim.matches[0].serviceprovider.name : "",
                isVerificationDone: isVerificationDone,
                isVerified: isVerified,
            }
        }
    }

    return data
}

router.get('/profile/fetch',
    check('query').exists(),
    check('protocol').optional().toLowerCase().isIn(["hkp", "wkd"]),
    check('doVerification').default(false).isBoolean().toBoolean(),
    check('returnPublicKey').default(false).isBoolean().toBoolean(),
    async (req, res) => {
        const valRes = validationResult(req);
        if (!valRes.isEmpty()) {
            res.status(400).send(valRes)
            return
        }

        // Generate profile
        let data
        switch (req.query.protocol) {
            case 'wkd':
                data = await generateWKDProfile(req.query.query)
                break;
            case 'hkp':
                data = await generateHKPProfile(req.query.query)
                break;
            default:
                if (req.query.query.includes('@')) {
                    data = await generateWKDProfile(req.query.query)
                } else {
                    data = await generateHKPProfile(req.query.query)
                }
                break;
        }

        if (data.errors.length > 0) {
            delete data.key
            res.status(500).send(data)
        }

        // Return public key
        if (req.query.returnPublicKey) {
            data.keyData.key.data = data.key.publicKey
        }
        delete data.key

        // Do verification
        if (req.query.doVerification) {
            data = await doVerification(data)
        }

        try {
            // Sanitize JSON
            data = sanitize(data)
        } catch (error) {
            data.keyData = {}
            data.extra = {}
            data.errors = [error.message]
        }

        // Add missing data
        data = addSummaryToClaims(data)
        
        let statusCode = 200
        if (data.errors.length > 0) {
            statusCode = 500
        }

        res.status(statusCode).send(data)
    }
)

router.get('/profile/verify',
    check('data').exists().isJSON(),
    async (req, res) => {
        const valRes = validationResult(req)
        if (!valRes.isEmpty()) {
            res.status(400).send(valRes)
            return
        }

        // Do verification
        data = await doVerification(req.query.data)

        try {
            // Sanitize JSON
            data = sanitize(data);
        } catch (error) {
            data.keyData = {}
            data.extra = {}
            data.errors = [error.message]
        }

        // Add missing data
        data = addSummaryToClaims(data)
        
        let statusCode = 200
        if (data.errors.length > 0) {
            statusCode = 500
        }

        res.status(statusCode).send(data)
    }
)

export default router
