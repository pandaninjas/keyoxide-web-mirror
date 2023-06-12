# Keyoxide

[![Drone (self-hosted) with branch](https://img.shields.io/drone/build/keyoxide/keyoxide-web/main?server=https%3A%2F%2Fdrone.keyoxide.org&style=for-the-badge)](https://drone.keyoxide.org/keyoxide/keyoxide-web)
[![License](https://img.shields.io/badge/license-AGPL--v3-blue?style=for-the-badge)](https://codeberg.org/keyoxide/web/src/branch/main/LICENSE)
[![Docker Image Version (latest semver)](https://img.shields.io/docker/v/keyoxide/keyoxide?sort=semver&style=for-the-badge)](https://hub.docker.com/r/keyoxide/keyoxide)
[![Docker Pulls](https://img.shields.io/docker/pulls/keyoxide/keyoxide?style=for-the-badge)](https://hub.docker.com/r/keyoxide/keyoxide)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/247838?domain=https%3A%2F%2Ffosstodon.org&style=for-the-badge)](https://fosstodon.org/@keyoxide)
[![Liberapay receiving](https://img.shields.io/liberapay/receives/keyoxide?style=for-the-badge)](https://liberapay.com/Keyoxide)

[Keyoxide](https://keyoxide.org) is a modern, secure and decentralized platform to prove your online identity.

## Self-hosting

Self-hosting Keyoxide is an important aspect of the project. Users need to trust the Keyoxide instance they're using to reliably verify identities. Making Keyoxide itself decentralized means no one needs to trust a central server. If a friend or family member is hosting a Keyoxide instance, it becomes much easier to trust the instance!

### Docker

The Docker container allows you to easily self-host the [Keyoxide](https://keyoxide.org) project. To get started, simply run:

`docker run -d -p 3000:3000 keyoxide/keyoxide:stable`

Keyoxide will now be available by visiting http://localhost:3000.

More information available in the [documentation](docs.keyoxide.org/self-hosting).

## Contributing

Anyone can contribute if they'd like! No need to be a programmer or technically-oriented for that matter.

Contributing to Keyoxide can happen in many forms:

- Finding and reporting bugs
- Suggesting new features
- Improving documentation
- Writing code to fix bugs and features
- Promoting decentralized identity and web3.0

Please note that this project has a [Code of Conduct](https://codeberg.org/keyoxide/web/src/branch/main/CODE_OF_CONDUCT.md) that all contributors agree to abide when participating.

### Local development

To run Keyoxide locally on your machine for development:

1. Install Node using [nvm](https://github.com/nvm-sh/nvm): `nvm install --lts`
2. Swap over to LTS: `nvm use --lts`
3. Ensure that yarn is installed: `npm install -g yarn`
4. Install node dependencies: `yarn`
5. Run the server a la `DOMAIN='localhost:3000' yarn dev`

Keyoxide will now be available at [https://localhost:3000](https://localhost:3000)

For **vscode/vscodium** development, a `launcher.json` is provided. Ensure that
the first four steps have been performed at least once to ensure the proper
node and yarn binaries are available to vscode, then load the project. The
launcher provides a "Launch via yarn" debug option that will start the project
with the appropriate version and environment variables set. The project will
then be available in a browser.

There is also a `shell.nix` file to install Node and yarn (steps one through
three above).

