FROM node:14-alpine as builder

WORKDIR /app

COPY . .

RUN yarn --pure-lockfile
RUN yarn run build:static

###

FROM node:14-alpine

WORKDIR /app

COPY . .
COPY --from=builder /app/static /app/static

RUN yarn --production --pure-lockfile

EXPOSE 3000

CMD yarn start