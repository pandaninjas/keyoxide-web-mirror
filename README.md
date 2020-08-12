# Keyoxide

[![Build Status](https://drone.keyoxide.org/api/badges/keyoxide/web/status.svg?branch=main)](https://drone.keyoxide.org/keyoxide/web)
![License](https://img.shields.io/badge/license-AGPL--v3-blue)
![Docker Image Version (latest semver)](https://img.shields.io/docker/v/keyoxide/keyoxide?sort=semver)
![Docker Pulls](https://img.shields.io/docker/pulls/keyoxide/keyoxide)
![Mastodon Follow](https://img.shields.io/mastodon/follow/247838?domain=https%3A%2F%2Ffosstodon.org&style=social)

[Keyoxide](https://keyoxide.org) is a modern, secure and decentralized platform to prove your online identity.



## Self-hosting

Self-hosting Keyoxide is an important aspect of the project. Users need to trust the Keyoxide instance they're using to reliably verify identities. Making Keyoxide itself decentralized means no one needs to trust a central server. If a friend or family member is hosting a Keyoxide instance, it becomes much easier to trust the instance!

### Docker

The Docker container allows you to easily self-host the [Keyoxide](https://keyoxide.org) project. To get started, simply run:

`docker run -d -p 3000:3000 keyoxide/keyoxide:stable`

Keyoxide will now be available by visiting http://localhost:3000.

To add support for Twitter account verification, make a [developer account](https://developer.twitter.com/en), [obtain a Bearer token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0) and run:

`docker run -d -p 3000:3000 -e "TWITTER_API_AUTH=XXXXXXXXXXXXXXXXXX" keyoxide/keyoxide:stable`

### Docker-compose

To run Keyoxide using docker-compose, add the following snippet to your `docker-compose.yml`:

```
keyoxide:
  image: keyoxide/keyoxide:stable
  ports:
    - 3000:3000
  environment:
    - TWITTER_API_AUTH=XXXXXXXXXXXXXXXXXX
```

## Contributing

Anyone can contribute if they'd like! No need to be a programmer or technically-oriented for that matter.

Contributing to Keyoxide can happen in many forms:

- Finding and reporting bugs
- Suggesting new features
- Improving documentation
- Writing code to fix bugs and features
- Promoting decentralized identity and web3.0

Please note that this project has a [Code of Conduct](https://codeberg.org/keyoxide/web/src/branch/main/CODE_OF_CONDUCT.md) that all contributors agree to abide when participating.
