FROM node:14-alpine

WORKDIR /app

COPY . .

RUN yarn --production --pure-lockfile
RUN yarn run build:static

EXPOSE 3000

CMD yarn start