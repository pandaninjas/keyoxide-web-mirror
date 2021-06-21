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
const md = require('markdown-it')({typographer: true})
const fs = require('fs')

md.use(require("markdown-it-anchor"), { "level": 2, "permalink": true, "permalinkClass": 'header-anchor', "permalinkSymbol": '¶', "permalinkBefore": false })
md.use(require("markdown-it-table-of-contents"), { "includeLevel": [2, 3], "listType": "ol" })
md.use(require('markdown-it-title'))

router.get('/', (req, res) => {
    let highlights = []
    for (let index = 1; index < 4; index++) {
        if (process.env[`KX_HIGHLIGHTS_${index}_NAME`]
            && process.env[`KX_HIGHLIGHTS_${index}_FINGERPRINT`]) {
            highlights.push({
                name: process.env[`KX_HIGHLIGHTS_${index}_NAME`],
                description: process.env[`KX_HIGHLIGHTS_${index}_DESCRIPTION`],
                fingerprint: process.env[`KX_HIGHLIGHTS_${index}_FINGERPRINT`],
            })
        }
    }

    res.render('index', { highlights: highlights, demoData: require('../server/demo.js').data })
})

router.get('/about', (req, res) => {
    let rawContent = fs.readFileSync(`./content/about.md`, "utf8")
    const content = md.render(rawContent)
    res.render(`long-form-content`, { title: `About Keyoxide`, content: content })
})

router.get('/privacy', (req, res) => {
    let rawContent = fs.readFileSync(`./content/privacy-policy.md`, "utf8")
    const content = md.render(rawContent)
    res.render(`long-form-content`, { title: `Privacy policy`, content: content })
})

router.get('/getting-started', (req, res) => {
    let rawContent = fs.readFileSync(`./content/getting-started.md`, "utf8")
    const content = md.render(rawContent)
    res.render(`long-form-content`, { title: `Getting started`, content: content })
})

router.get('/faq', (req, res) => {
    const mdAlt = require('markdown-it')({typographer: true})
    mdAlt.use(require("markdown-it-anchor"), { "level": 2, "permalink": true, "permalinkClass": 'header-anchor', "permalinkSymbol": '¶', "permalinkBefore": false })
    mdAlt.use(require("markdown-it-table-of-contents"), { "includeLevel": [2], "listType": "ul" })

    let rawContent = fs.readFileSync(`./content/faq.md`, "utf8")
    rawContent = rawContent.replace('${domain}', req.app.get('domain'))
    const content = mdAlt.render(rawContent)
    res.render(`long-form-content`, { title: `Frequently Asked Questions`, content: content })
})

router.get('/guides', (req, res) => {
    res.render('guides', { title: `Guides - Keyoxide` })
})

router.get('/guides/:guideId', (req, res) => {
    let env = {}
    fs.readFile(`./content/guides/${req.params.guideId}.md`, "utf8", (err, data) => {
        if (err) {
            res.render(`404`)
            return
        }

        const content = md.render(data, env)
        res.render(`long-form-content`, { title: `${env.title} - Keyoxide`, content: content })
    })
})

module.exports = router
