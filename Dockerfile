FROM node:16-alpine as builder

WORKDIR /app
COPY . .

RUN yarn --pure-lockfile
RUN yarn run build

###

FROM node:16-alpine

WORKDIR /app
COPY --from=builder /app /app
RUN rm -r /app/node_modules

EXPOSE 3000

CMD node --experimental-fetch ./dist/