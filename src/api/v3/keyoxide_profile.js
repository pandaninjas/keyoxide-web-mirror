/*
Copyright (C) 2023 Yarmo Mackenbach

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
import Ajv from 'ajv/dist/2020.js'
import * as dotenv from 'dotenv'
import { Claim } from 'doipjs'
import { generateAspeProfile, generateWKDProfile, generateHKPProfile, generateAutoProfile } from '../../server/index.js'
import { claimSchema, personaSchema, profileSchema, serviceProviderSchema } from '../../schemas.js'
dotenv.config()

const router = express.Router()
const ajv = new Ajv({
  schemas: [profileSchema, personaSchema, claimSchema, serviceProviderSchema]
})

const apiProfileValidate = ajv.compile(profileSchema)

const doVerification = async (profile) => {
  const promises = []
  const results = []
  const verificationOptions = {
    proxy: {
      hostname: process.env.PROXY_HOSTNAME,
      policy: (process.env.PROXY_HOSTNAME !== '') ? 'adaptive' : 'never'
    }
  }

  // Return early if no users in key
  if (!profile.personas) {
    return profile
  }

  for (let iUser = 0; iUser < profile.personas.length; iUser++) {
    const user = profile.personas[iUser]

    for (let iClaim = 0; iClaim < user.claims.length; iClaim++) {
      const claim = user.claims[iClaim]

      promises.push(
        new Promise((resolve, reject) => {
          (async () => {
            await claim.verify(verificationOptions)
            results.push([iUser, iClaim, claim])
            resolve()
          })()
        })
      )
    }
  }
  await Promise.all(promises)

  results.forEach(result => {
    profile.personas[result[0]].claims[result[1]] = result[2]
  })

  return profile
}

const validate = (profile) => {
  const valid = apiProfileValidate(profile)
  if (!valid) {
    throw new Error(`Profile data validation error: ${apiProfileValidate.errors.map(x => x.message).join(', ')}`)
  }
}

router.get('/fetch',
  check('query').exists(),
  check('protocol').optional().toLowerCase().isIn(['aspe', 'hkp', 'wkd']),
  check('doVerification').default(false).isBoolean().toBoolean(),
  async (req, res) => {
    const valRes = validationResult(req)
    if (!valRes.isEmpty()) {
      res.status(400).send(valRes)
      return
    }

    // Generate profile
    let data
    switch (req.query.protocol) {
      case 'aspe':
        data = await generateAspeProfile(req.query.query)
        break
      case 'wkd':
        data = await generateWKDProfile(req.query.query)
        break
      case 'hkp':
        data = await generateHKPProfile(req.query.query)
        break
      default:
        data = await generateAutoProfile(req.query.query)
        break
    }

    if ('errors' in data && data.errors.length > 0) {
      res.status(500).send(data)
    }

    // Do verification
    if (req.query.doVerification) {
      data = await doVerification(data)
    }

    try {
      data = data.toJSON()
    } catch (error) {
      data = {
        errors: [error.message]
      }
    }

    try {
      // Validate JSON
      validate(data)
    } catch (error) {
      data = {
        errors: [error.message]
      }
    }

    let statusCode = 200
    if ('errors' in data && data.errors.length > 0) {
      statusCode = 500
    }

    res.status(statusCode).send(data)
  }
)

router.get('/verify',
  check('data').exists().isJSON(),
  async (req, res) => {
    const valRes = validationResult(req)
    if (!valRes.isEmpty()) {
      res.status(400).send(valRes)
      return
    }

    const profile = Claim.fromJson(req.query.data)

    // Do verification
    let data = await doVerification(profile)

    try {
      data = data.toJSON()
    } catch (error) {
      data = {
        errors: [error.message]
      }
    }

    try {
      // Validate JSON
      validate(data)
    } catch (error) {
      data = {
        errors: [error.message]
      }
    }

    let statusCode = 200
    if ('errors' in data) {
      statusCode = 500
    }

    res.status(statusCode).send(data)
  }
)

export default router
