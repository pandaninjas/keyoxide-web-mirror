FROM node:16-alpine as builder

WORKDIR /app
COPY . .

RUN yarn --pure-lockfile
RUN yarn run build

###

FROM node:16-alpine

WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/content /app/content
COPY --from=builder /app/views /app/views
COPY --from=builder /app/static /app/static

EXPOSE 3000

CMD node --experimental-fetch ./dist/