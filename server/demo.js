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
export default {
  claimVersion: 1,
  uri: 'https://fosstodon.org/@keyoxide',
  fingerprint: '9f0048ac0b23301e1f77e994909f6bd6f80f485d',
  status: 'verified',
  matches: [
    {
      serviceprovider: {
        type: 'web',
        name: 'mastodon (demo)'
      },
      match: {
        regularExpression: {},
        isAmbiguous: true
      },
      profile: {
        display: '@keyoxide@fosstodon.org',
        uri: 'https://fosstodon.org/@keyoxide',
        qr: null
      },
      proof: {
        uri: 'https://fosstodon.org/@keyoxide',
        request: {
          fetcher: 'http',
          access: 0,
          format: 'json',
          data: {
            url: 'https://fosstodon.org/@keyoxide',
            format: 'json'
          }
        }
      },
      claim: {
        format: 1,
        relation: 0,
        path: [
          'attachment',
          'value'
        ]
      }
    }
  ],
  verification: {
    result: true,
    completed: true,
    errors: [],
    proof: {
      fetcher: 'http',
      viaProxy: false
    }
  }
}
