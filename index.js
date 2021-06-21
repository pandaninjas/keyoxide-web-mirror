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
const express = require('express')
const fs = require('fs')
const app = express()
const { stringReplace } = require('string-replace-middleware')
require('dotenv').config()

const packageData = JSON.parse(fs.readFileSync('package.json'))

app.set('env', process.env.NODE_ENV || "production")
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)
app.set('domain', process.env.DOMAIN || "keyoxide.org")
app.set('keyoxide_version', packageData.version)
app.set('onion_url', process.env.ONION_URL)

// Middlewares
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    next()
})

if (app.get('onion_url')) {
    app.get('/*', (req, res, next) => {
        res.header('Onion-Location', app.get('onion_url'))
        next()
    })
}

app.use(stringReplace({
    PLACEHOLDER__PROXY_HOSTNAME: process.env.PROXY_HOSTNAME || 'null'
}, {
    contentTypeFilterRegexp: /application\/javascript/,
}))

// Routes
app.use('/favicon.svg', express.static('favicon.svg'))
app.use('/robots.txt', express.static('robots.txt'))

app.use('/', require('./routes/main'))
app.use('/static', require('./routes/static'))
app.use('/util', require('./routes/util'))
app.use('/', require('./routes/profile'))

app.listen(app.get('port'), () => {
    console.log(`Node server listening at http://localhost:${app.get('port')}`)
})
