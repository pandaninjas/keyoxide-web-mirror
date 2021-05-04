# Self-hosting Keyoxide

Self-hosting Keyoxide is an important aspect of the project. Users need to trust the Keyoxide instance they're using to reliably verify identities. Making Keyoxide itself decentralized means no one needs to trust a central server. If a friend or family member is hosting a Keyoxide instance, it becomes much easier to trust the instance!

## Docker

- Run `docker run -d -p 3000:3000 keyoxide/keyoxide:stable`

### Configuration

- Add environment variables to the docker command:  
  `docker run -d -p 3000:3000 -e PROXY_HOSTNAME=proxy.domain.tld keyoxide/keyoxide:stable`

## Without Docker

- Fetch the [source code](https://codeberg.org/keyoxide/web) and put the files on your server
- Run `yarn` or `npm install` to install the dependencies
- Run `yarn run start` or `npm run start` to start the server at `http://localhost:3000`
- Point your reverse proxy to `http://localhost:3000`

### Configuration

- Add a `.env` file to the root directory of the source code:

```
# .env file

# Enable the use of a proxy (replace with your proxy server domain)
PROXY_HOSTNAME=proxy.domain.tld
```
