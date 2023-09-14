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
import { webcrypto as crypto } from 'crypto'

export async function computeWKDLocalPart (localPart) {
  const localPartEncoded = new TextEncoder().encode(localPart.toLowerCase())
  const localPartHashed = new Uint8Array(await crypto.subtle.digest('SHA-1', localPartEncoded))
  return encodeZBase32(localPartHashed)
}

export function generatePageTitle (type, data) {
  switch (type) {
    case 'profile':
      try {
        return `${data.personas[data.primaryPersonaIndex].name} - Keyoxide`
      } catch (error) {
        return 'Profile - Keyoxide'
      }

    default:
      return 'Keyoxide'
  }
}

// Copied from https://github.com/openpgpjs/wkd-client/blob/0d074519e011a5139a8953679cf5f807e4cd2378/src/wkd.js
export function encodeZBase32 (data) {
  if (data.length === 0) {
    return ''
  }
  const ALPHABET = 'ybndrfg8ejkmcpqxot1uwisza345h769'
  const SHIFT = 5
  const MASK = 31
  let buffer = data[0]
  let index = 1
  let bitsLeft = 8
  let result = ''
  while (bitsLeft > 0 || index < data.length) {
    if (bitsLeft < SHIFT) {
      if (index < data.length) {
        buffer <<= 8
        buffer |= data[index++] & 0xff
        bitsLeft += 8
      } else {
        const pad = SHIFT - bitsLeft
        buffer <<= pad
        bitsLeft += pad
      }
    }
    bitsLeft -= SHIFT
    result += ALPHABET[MASK & (buffer >> bitsLeft)]
  }
  return result
}

export function getMetaFromReq (req) {
  return {
    env: req.app.get('env'),
    keyoxide: {
      version: req.app.get('keyoxide_version')
    }
  }
}
