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
import logger from '../log.js'
import * as doipjs from 'doipjs'
import { fetchWKD, fetchHKP, fetchSignature, fetchKeybase } from './openpgpProfiles.js'
import libravatar from 'libravatar'

const generateAspeProfile = async (id) => {
  logger.debug('Generating an ASPE profile',
    { component: 'aspe_profile_generator', action: 'start', profile_id: id })

  return doipjs.asp.fetchASPE(id)
    .then(profile => {
      profile.addVerifier('keyoxide', `https://${process.env.DOMAIN}/${id}`)
      profile = processAspProfile(profile)
      return profile
    })
    .catch(err => {
      logger.warn('Failed to generate ASPE profile',
        { component: 'aspe_profile_generator', action: 'failure', error: err.message, profile_id: id })

      return {
        errors: [err.message]
      }
    })
}

const generateWKDProfile = async (id) => {
  logger.debug('Generating a WKD profile',
    { component: 'wkd_profile_generator', action: 'start', profile_id: id })

  return fetchWKD(id)
    .then(async profile => {
      profile.addVerifier('keyoxide', `${getScheme()}://${process.env.DOMAIN}/wkd/${id}`)
      profile = processOpenPgpProfile(profile)

      logger.debug('Generating a WKD profile',
        { component: 'wkd_profile_generator', action: 'done', profile_id: id })

      return profile
    })
    .catch(err => {
      logger.warn('Failed to generate WKD profile',
        { component: 'wkd_profile_generator', action: 'failure', error: err.message, profile_id: id })

      return {
        errors: [err.message]
      }
    })
}

const generateHKPProfile = async (id, keyserverDomain) => {
  logger.debug('Generating a HKP profile',
    { component: 'hkp_profile_generator', action: 'start', profile_id: id, keyserver_domain: keyserverDomain || '' })

  return fetchHKP(id, keyserverDomain)
    .then(async profile => {
      let keyoxideUrl
      if (!keyserverDomain || keyserverDomain === 'keys.openpgp.org') {
        keyoxideUrl = `${getScheme()}://${process.env.DOMAIN}/hkp/${id}`
      } else {
        keyoxideUrl = `${getScheme()}://${process.env.DOMAIN}/hkp/${keyserverDomain}/${id}`
      }

      profile.addVerifier('keyoxide', keyoxideUrl)
      profile = processOpenPgpProfile(profile)

      logger.debug('Generating a HKP profile',
        { component: 'hkp_profile_generator', action: 'done', profile_id: id, keyserver_domain: keyserverDomain || '' })

      return profile
    })
    .catch(err => {
      logger.warn('Failed to generate HKP profile',
        { component: 'hkp_profile_generator', action: 'failure', error: err.message, profile_id: id, keyserver_domain: keyserverDomain || '' })

      return {
        errors: [err.message]
      }
    })
}

const generateAutoProfile = async (id) => {
  let result

  const aspeRe = /aspe:(.*):(.*)/

  if (aspeRe.test(id)) {
    result = await generateAspeProfile(id)

    if (result && !('errors' in result)) {
      return result
    }
  }

  if (id.includes('@')) {
    result = await generateWKDProfile(id)

    if (result && !('errors' in result)) {
      return result
    }
  }

  result = await generateHKPProfile(id)
  if (result && !('errors' in result)) {
    return result
  }

  return {
    errors: ['No public profile/keys could be found']
  }
}

const generateSignatureProfile = async (signature) => {
  logger.debug('Generating a signature profile',
    { component: 'signature_profile_generator', action: 'start' })

  return fetchSignature(signature)
    .then(async key => {
      let profile = await doipjs.signatures.parse(key.publicKey)
      profile = processOpenPgpProfile(profile)

      logger.debug('Generating a signature profile',
        { component: 'signature_profile_generator', action: 'done' })

      return profile
    })
    .catch(err => {
      logger.warn('Failed to generate a signature profile',
        { component: 'signature_profile_generator', action: 'failure', error: err.message })

      return {
        errors: [err.message]
      }
    })
}

const generateKeybaseProfile = async (username, fingerprint) => {
  logger.debug('Generating a Keybase profile',
    { component: 'keybase_profile_generator', action: 'start', username, fingerprint })

  return fetchKeybase(username, fingerprint)
    .then(async profile => {
      profile.addVerifier('keyoxide', `${getScheme()}://${process.env.DOMAIN}/keybase/${username}/${fingerprint}`)
      profile = processOpenPgpProfile(profile)

      logger.debug('Generating a Keybase profile',
        { component: 'keybase_profile_generator', action: 'done', username, fingerprint })

      return profile
    })
    .catch(err => {
      logger.warn('Failed to generate a Keybase profile',
        { component: 'keybase_profile_generator', action: 'failure', error: err.message, username, fingerprint })

      return {
        errors: [err.message]
      }
    })
}

const processAspProfile = async (/** @type {import('doipjs').Profile */ profile) => {
  profile.personas.forEach(persona => {
    // Remove faulty claims
    persona.claims = persona.claims.filter(claim => {
      return claim instanceof doipjs.Claim
    })

    // Match claims
    persona.claims.forEach(claim => {
      claim.match()
    })

    // Sort claims
    persona.claims.sort((a, b) => {
      if (a.matches.length === 0) return 1
      if (b.matches.length === 0) return -1

      if (a.matches[0].about.name < b.matches[0].about.name) {
        return -1
      }
      if (a.matches[0].about.name > b.matches[0].about.name) {
        return 1
      }
      return 0
    })
  })

  // Overwrite avatarUrl
  // TODO: don't overwrite avatarUrl once it's fully supported
  profile.personas[profile.primaryPersonaIndex].avatarUrl = `https://api.dicebear.com/6.x/shapes/svg?seed=${profile.publicKey.fingerprint}&size=128`

  return profile
}

const processOpenPgpProfile = async (/** @type {import('doipjs').Profile */ profile) => {
  profile.personas.forEach(persona => {
    // Remove faulty claims
    persona.claims = persona.claims.filter(claim => {
      return claim instanceof doipjs.Claim
    })

    // Match claims
    persona.claims.forEach(claim => {
      claim.match()
    })

    // Sort claims
    persona.claims.sort((a, b) => {
      if (a.matches.length === 0) return 1
      if (b.matches.length === 0) return -1

      if (a.matches[0].about.name < b.matches[0].about.name) {
        return -1
      }
      if (a.matches[0].about.name > b.matches[0].about.name) {
        return 1
      }
      return 0
    })
  })

  // Overwrite avatarUrl
  // TODO: don't overwrite avatarUrl once it's fully supported
  profile.personas[profile.primaryPersonaIndex].avatarUrl = await libravatar.get_avatar_url({ email: profile.personas[profile.primaryPersonaIndex].email, size: 128, default: 'mm', https: true })

  return profile
}

const getScheme = () => {
  return process.env.PROXY_SCHEME
    ? process.env.PROXY_SCHEME
    : process.env.SCHEME
      ? process.env.SCHEME
      : 'https'
}

export { generateAspeProfile }
export { generateWKDProfile }
export { generateHKPProfile }
export { generateAutoProfile }
export { generateKeybaseProfile }
export { generateSignatureProfile }

export * as utils from './utils.js'
