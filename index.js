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
const express = require('express');
const md = require('markdown-it')({typographer: true});
const fs = require('fs');
const app = express();
const env = {};
const { stringReplace } = require('string-replace-middleware');
require('dotenv').config();

md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"), { "includeLevel": [2, 3], "listType": "ol" });
md.use(require('markdown-it-title'));

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use('/favicon.svg', express.static('favicon.svg'));

app.use(stringReplace({
    PLACEHOLDER__XMPP_VCARD_SERVER_DOMAIN: process.env.XMPP_VCARD_SERVER_DOMAIN || 'xmpp-vcard.keyoxide.org'
}, {
    contentTypeFilterRegexp: /application\/javascript/,
}));

app.locals.env = process.env;
app.use('/', require('./routes/main'));
app.use('/static', require('./routes/static'));
app.use('/server', require('./routes/server'));
app.use('/encrypt', require('./routes/encrypt'));
app.use('/verify', require('./routes/verify'));
app.use('/proofs', require('./routes/proofs'));
app.use('/util', require('./routes/util'));
app.use('/', require('./routes/profile'));

app.listen(app.get('port'), () => {
    console.log(`Node server listening at http://localhost:${app.get('port')}`);
});
