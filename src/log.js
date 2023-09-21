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
import { createLogger, format, transports } from 'winston'
import * as httpContext from 'express-http-context2'
import * as dotenv from 'dotenv'
dotenv.config()

const anonymize = format((info, opts) => {
  if (process.env.NODE_ENV !== 'development') {
    info.profile_id = undefined
    info.keyserver_domain = undefined
    info.username = undefined
    info.fingerprint = undefined
    info.request_path = undefined
    info.request_ip = undefined
  }
  return info
})

const addRequestData = format((info, opts) => {
  if (httpContext.get('requestId')) info.request_id = httpContext.get('requestId')
  if (httpContext.get('requestPath')) info.request_path = httpContext.get('requestPath')
  if (httpContext.get('requestIp')) info.request_ip = httpContext.get('requestIp')
  return info
})

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    addRequestData(),
    anonymize(),
    format.timestamp(),
    format.json()
  ),
  defaultMeta: {
    service: 'keyoxide'
  },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/keyoxide.log' })
  ]
})

export default logger
