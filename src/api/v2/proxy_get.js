/*
Copyright (C) 2022 Yarmo Mackenbach

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
import { query, validationResult } from 'express-validator'
import { fetcher, enums as E } from 'doipjs'
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const opts = {
  claims: {
    activitypub: {
      url: process.env.ACTIVITYPUB_URL || null,
      privateKey: process.env.ACTIVITYPUB_PRIVATE_KEY || null
    },
    irc: {
      nick: process.env.IRC_NICK || null
    },
    matrix: {
      instance: process.env.MATRIX_INSTANCE || null,
      accessToken: process.env.MATRIX_ACCESS_TOKEN || null
    },
    telegram: {
      token: process.env.TELEGRAM_TOKEN || null
    },
    twitter: {
      bearerToken: process.env.TWITTER_BEARER_TOKEN || null
    },
    xmpp: {
      service: process.env.XMPP_SERVICE || null,
      username: process.env.XMPP_USERNAME || null,
      password: process.env.XMPP_PASSWORD || null
    }
  }
}

// Root route
router.get('/', async (req, res) => {
  return res.status(400).json({ errors: 'Invalid endpoint' })
})

// HTTP route
router.get(
  '/http',
  query('url').isURL(),
  query('format').isIn([E.ProofFormat.JSON, E.ProofFormat.TEXT]),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.http
      .fn(req.query, opts)
      .then((result) => {
        switch (req.query.format) {
          case E.ProofFormat.JSON:
            return res.status(200).json(result)

          case E.ProofFormat.TEXT:
            return res.status(200).send(result)
        }
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

// DNS route
router.get('/dns', query('domain').isFQDN(), (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  fetcher.dns
    .fn(req.query, opts)
    .then((data) => {
      return res.status(200).send(data)
    })
    .catch((err) => {
      return res.status(400).json({ errors: err.message ? err.message : err })
    })
})

// XMPP route
router.get(
  '/xmpp',
  query('id').isEmail(),
  async (req, res) => {
    if (
      !((opts.claims.xmpp.service && opts.claims.xmpp.username) && opts.claims.xmpp.password)
    ) {
      return res.status(501).json({ errors: 'XMPP not enabled on server' })
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.xmpp
      .fn(req.query, opts)
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

// Twitter route
router.get('/twitter', query('tweetId').isInt(), async (req, res) => {
  if (!opts.claims.twitter.bearerToken) {
    return res.status(501).json({ errors: 'Twitter not enabled on server' })
  }
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  fetcher.twitter
    .fn(req.query, opts)
    .then((data) => {
      return res.status(200).send(data)
    })
    .catch((err) => {
      return res.status(400).json({ errors: err.message ? err.message : err })
    })
})

// Matrix route
router.get(
  '/matrix',
  query('roomId').isString(),
  query('eventId').isString(),
  async (req, res) => {
    if (!(opts.claims.matrix.instance && opts.claims.matrix.accessToken)) {
      return res.status(501).json({ errors: 'Matrix not enabled on server' })
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.matrix
      .fn(req.query, opts)
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

// Telegram route
router.get(
  '/telegram',
  query('user').isString(),
  query('chat').isString(),
  async (req, res) => {
    if (!opts.claims.telegram.token) {
      return res.status(501).json({ errors: 'Telegram not enabled on server' })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.telegram
      .fn(req.query, opts)
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

// IRC route
router.get('/irc', query('nick').isString(), async (req, res) => {
  if (!opts.claims.irc.nick) {
    return res.status(501).json({ errors: 'IRC not enabled on server' })
  }
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  fetcher.irc
    .fn(req.query, opts)
    .then((data) => {
      return res.status(200).send(data)
    })
    .catch((err) => {
      return res.status(400).json({ errors: err.message ? err.message : err })
    })
})

// Gitlab route
router.get(
  '/gitlab',
  query('domain').isFQDN(),
  query('username').isString(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.http
      .fn({
        url: `https://${req.query.domain}/api/v4/projects/${req.query.username}%2Fgitlab_proof`,
        format: 'json'
      }, opts)
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

// ActivityPub route
router.get(
  '/activitypub',
  query('url').isURL(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.activitypub
      .fn(req.query, opts)
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

// GraphQL route
router.get(
  '/graphql',
  query('url').isURL(),
  query('query').isString(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    fetcher.graphql
      .fn(req.query, opts)
      .then((data) => {
        return res.status(200).send(data)
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.message ? err.message : err })
      })
  }
)

export default router
