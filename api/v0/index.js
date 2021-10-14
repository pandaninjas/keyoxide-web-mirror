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
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const kx = require('../../server')

const doVerification = async (data) => {
    let promises = []
    let results = []

    for (let iUser = 0; iUser < data.keyData.users.length; iUser++) {
        const user = data.keyData.users[iUser];
        
        for (let iClaim = 0; iClaim < user.claims.length; iClaim++) {
            const claim = user.claims[iClaim];
            
            promises.push(
                new Promise(async (resolve, reject) => {
                    await claim.verify()
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
                data = await kx.generateWKDProfile(req.query.query)
                break;
            case 'hkp':
                data = await kx.generateHKPProfile(req.query.query)
                break;
            default:
                if (req.query.query.includes('@')) {
                    data = await kx.generateWKDProfile(req.query.query)
                } else {
                    data = await kx.generateHKPProfile(req.query.query)
                }
                break;
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

        res.send(data)
    }
)

router.get('/profile/verify',
    check('data').exists().isJSON(),
    async (req, res) => {
        const valRes = validationResult(req);
        if (!valRes.isEmpty()) {
            res.status(400).send(valRes)
            return
        }

        // Do verification
        data = await doVerification(req.query.data)

        res.send(data)
    }
)

module.exports = router
