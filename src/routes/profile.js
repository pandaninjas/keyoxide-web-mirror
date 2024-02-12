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
import { param } from 'express-validator'
import bodyParserImport from 'body-parser'
import { rateLimit } from 'express-rate-limit'
import { generateSignatureProfile, utils, generateWKDProfile, generateHKPProfile, generateAutoProfile, generateKeybaseProfile } from '../server/index.js'
import { Profile } from 'doipjs'
import { generateProfileTheme, getMetaFromReq } from '../server/utils.js'
import logger from '../log.js'

const router = express.Router()
const bodyParser = bodyParserImport.urlencoded({ extended: false })

let profileRateLimiter = (req, res, next) => {
  next()
}

if (process.env.ENABLE_EXPERIMENTAL_RATE_LIMITER) {
  profileRateLimiter = rateLimit({
    windowMs: 5000,
    limit: 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      logger.debug('Rate-limiting a profile request',
        { component: 'profile_rate_limiter', action: 'block' })

      res.status(options.statusCode).render('429', { meta: getMetaFromReq(req) })
    }
  })

  logger.debug('Starting the profile request rate limiter',
    { component: 'profile_rate_limiter', action: 'start' })
}

router.get('/sig',
  profileRateLimiter,
  (req, res) => {
    res.render('profile', { isSignature: true, signature: null, meta: getMetaFromReq(req) })
  })

router.post('/sig',
  profileRateLimiter,
  bodyParser,
  async (req, res) => {
    const data = await generateSignatureProfile(req.body.signature)
    const title = utils.generatePageTitle('profile', data)
    res.set('ariadne-identity-proof', data.identifier)
    res.render('profile', {
      title,
      data: data instanceof Profile ? data.toJSON() : data,
      isSignature: true,
      signature: req.body.signature,
      enable_message_encryption: false,
      enable_signature_verification: false,
      meta: getMetaFromReq(req)
    })
  })

router.get('/wkd/:id',
  profileRateLimiter,
  param('id').escape(),
  async (req, res) => {
    const data = await generateWKDProfile(req.params.id)
    const title = utils.generatePageTitle('profile', data)
    res.set('ariadne-identity-proof', data.identifier)
    res.render('profile', {
      title,
      data: data instanceof Profile ? data.toJSON() : data,
      enable_message_encryption: false,
      enable_signature_verification: false,
      meta: getMetaFromReq(req)
    })
  })

router.get('/hkp/:id',
  profileRateLimiter,
  param('id').escape(),
  async (req, res) => {
    const data = await generateHKPProfile(req.params.id)
    const title = utils.generatePageTitle('profile', data)
    res.set('ariadne-identity-proof', data.identifier)
    res.render('profile', {
      title,
      data: data instanceof Profile ? data.toJSON() : data,
      enable_message_encryption: false,
      enable_signature_verification: false,
      meta: getMetaFromReq(req)
    })
  })

router.get('/hkp/:server/:id',
  profileRateLimiter,
  param('server').escape(),
  param('id').escape(),
  async (req, res) => {
    const data = await generateHKPProfile(req.params.id, req.params.server)
    const title = utils.generatePageTitle('profile', data)
    res.set('ariadne-identity-proof', data.identifier)
    res.render('profile', {
      title,
      data: data instanceof Profile ? data.toJSON() : data,
      enable_message_encryption: false,
      enable_signature_verification: false,
      meta: getMetaFromReq(req)
    })
  })

router.get('/keybase/:username/:fingerprint',
  profileRateLimiter,
  param('username').escape(),
  param('fingerprint').escape(),
  async (req, res) => {
    const data = await generateKeybaseProfile(req.params.username, req.params.fingerprint)
    const title = utils.generatePageTitle('profile', data)
    res.set('ariadne-identity-proof', data.identifier)
    res.render('profile', {
      title,
      data: data instanceof Profile ? data.toJSON() : data,
      enable_message_encryption: false,
      enable_signature_verification: false,
      meta: getMetaFromReq(req)
    })
  })

router.get('/:id',
  profileRateLimiter,
  param('id').escape(),
  async (req, res) => {
    const data = await generateAutoProfile(req.params.id)
    const theme = generateProfileTheme(data)
    const title = utils.generatePageTitle('profile', data)
    res.set('ariadne-identity-proof', data.identifier)
    res.render('profile', {
      title,
      data: data instanceof Profile ? data.toJSON() : data,
      enable_message_encryption: false,
      enable_signature_verification: false,
      theme,
      meta: getMetaFromReq(req)
    })
  })

export default router
