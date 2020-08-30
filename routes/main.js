/*
Copyright (C) 2020 Yarmo Mackenbach

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
const router = require('express').Router();
const md = require('markdown-it')({typographer: true});
const fs = require('fs');

md.use(require("markdown-it-anchor"), { "level": 2, "permalink": true, "permalinkClass": 'header-anchor', "permalinkSymbol": '¶', "permalinkBefore": false });
md.use(require("markdown-it-table-of-contents"), { "includeLevel": [2, 3], "listType": "ol" });
md.use(require('markdown-it-title'));


if (process.env.ONION_URL) {
    router.get('/*', (req, res, next) => {
        res.header('Onion-Location', process.env.ONION_URL);
        next();
    });
}

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/getting-started', (req, res) => {
    const env = {};
    let data = fs.readFileSync(`./content/getting-started.md`, "utf8");

    let content = md.render(data, env);
    res.render(`basic`, { title: `Getting started - Keyoxide`, content: content });
});

router.get('/faq', (req, res) => {
    const mdFAQ = require('markdown-it')({typographer: true});
    mdFAQ.use(require("markdown-it-anchor"), { "level": 2, "permalink": true, "permalinkClass": 'header-anchor', "permalinkSymbol": '¶', "permalinkBefore": false });
    mdFAQ.use(require("markdown-it-table-of-contents"), { "includeLevel": [2], "listType": "ul" });

    const env = {};
    let data = fs.readFileSync(`./content/faq.md`, "utf8");
    data = data.replace('${domain}', req.app.get('domain'));

    let content = mdFAQ.render(data, env);
    res.render(`basic`, { title: `Frequently Asked Questions - Keyoxide`, content: content });
});

router.get('/guides', (req, res) => {
    res.render('guides', { title: `Guides - Keyoxide` });
});

router.get('/guides/:guideId', (req, res) => {
    const env = {};
    let data = fs.readFileSync(`./content/guides/${req.params.guideId}.md`, "utf8", (err, data) => {
        if (err) throw err;
        return data;
    });

    let content = md.render(data, env);
    res.render(`basic`, { title: `${env.title} - Keyoxide`, content: content });
});

module.exports = router;
