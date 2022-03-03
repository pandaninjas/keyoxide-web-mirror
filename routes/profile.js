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
import bodyParserImport from 'body-parser'
import { generateSignatureProfile, utils, generateWKDProfile, generateHKPProfile, generateKeybaseProfile } from '../server/index.js'

const router = express.Router()
const bodyParser = bodyParserImport.urlencoded({ extended: false })

router.get('/sig', (req, res) => {
    res.render('profile', { isSignature: true, signature: null })
})

router.post('/sig', bodyParser, async (req, res) => {
    const data = await generateSignatureProfile(req.body.signature)
    const title = utils.generatePageTitle('profile', data)
    res.render('profile', { title: title, data: data, isSignature: true, signature: req.body.signature })
})

router.get('/wkd/:id', async (req, res) => {
    const data = await generateWKDProfile(req.params.id)
    const title = utils.generatePageTitle('profile', data)
    res.render('profile', { title: title, data: data })
})

router.get('/hkp/:id', async (req, res) => {
    const data = await generateHKPProfile(req.params.id)
    const title = utils.generatePageTitle('profile', data)
    res.render('profile', { title: title, data: data })
})

router.get('/hkp/:server/:id', async (req, res) => {
    const data = await generateHKPProfile(req.params.id, req.params.server)
    const title = utils.generatePageTitle('profile', data)
    res.render('profile', { title: title, data: data })
})

router.get('/keybase/:username/:fingerprint', async (req, res) => {
    const data = await generateKeybaseProfile(req.params.username, req.params.fingerprint)
    const title = utils.generatePageTitle('profile', data)
    res.render('profile', { title: title, data: data })
})

router.get('/:id', async (req, res) => {
    let data
    if (req.params.id.includes('@')) {
        data = await generateWKDProfile(req.params.id)
    } else {
        data = await generateHKPProfile(req.params.id)
    }
    const title = utils.generatePageTitle('profile', data)
    res.render('profile', { title: title, data: data })
})

export default router
