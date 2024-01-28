# keyoxide-web

[![status-badge](https://ci.codeberg.org/api/badges/5919/status.svg)](https://ci.codeberg.org/repos/5919)
[![License](https://img.shields.io/badge/license-AGPL--v3-blue?style=flat)](https://codeberg.org/keyoxide/web/src/branch/main/LICENSE)
[![Docker Image Version (latest semver)](https://img.shields.io/docker/v/keyoxide/keyoxide?sort=semver&style=flat)](https://hub.docker.com/r/keyoxide/keyoxide)
[![Docker Pulls](https://img.shields.io/docker/pulls/keyoxide/keyoxide?style=flat)](https://hub.docker.com/r/keyoxide/keyoxide)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/247838?domain=https%3A%2F%2Ffosstodon.org&style=flat)](https://fosstodon.org/@keyoxide)
[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/keyoxide?style=flat)](https://opencollective.com/keyoxide)

`keyoxide-web` is the web client that powers [keyoxide.org](https://keyoxide.org) and which you can freely host on your own infrastructure.

## Hosting keyoxide-web

Self-hosting Keyoxide is an important aspect of the project. Users need to trust the Keyoxide instance they're using to reliably verify identities. Making Keyoxide itself decentralized means no one needs to trust a central server. If a friend or family member is hosting a Keyoxide instance, it becomes much easier to trust the instance!

### Docker

The Docker container allows you to easily self-host the [Keyoxide](https://keyoxide.org) project. To get started, simply run:

```sh
docker run -d -p 3000:3000 codeberg.org/keyoxide/keyoxide-web:latest
```

Keyoxide will now be available by visiting http://localhost:3000.

More information available in the [documentation](https://docs.keyoxide.org/guides/self-hosting/).

## Local development

Install `node` in one of the following ways:

  - [nix](https://nixos.org/guides/install-nix.html) with [direnv](https://direnv.net/)
  - using [fnm](https://github.com/Schniz/fnm)
  - using [nvm](https://github.com/nvm-sh/nvm)
  - directly from their [website](https://nodejs.org/)

Install dependencies with `npm install` or `yarn`.

Run the server with `npm dev` or `yarn dev`. The Keyoxide web client will now be available at [https://localhost:3000](https://localhost:3000).

## Contributing

Anyone can contribute!

Developers are invited to:

- fork the repository and play around
- submit PRs to [implement new features or fix bugs](https://codeberg.org/keyoxide/keyoxide-web/issues)

If you are new to contributing to open source software, we'd love to help you! To get started, here's a [list of "good first issues"](https://codeberg.org/keyoxide/keyoxide-web/issues?q=&type=all&state=open&labels=183598) that you could look into.

Everyone is invited to:

- find and [report bugs](https://codeberg.org/keyoxide/keyoxide-web/issues/new/choose)
- suggesting [new features](https://codeberg.org/keyoxide/keyoxide-web/issues/new/choose)
- [help with translations](https://translate.codeberg.org/projects/keyoxide/)
- [improve documentation](https://codeberg.org/keyoxide/keyoxide-docs)
- start using open source software and promote it

Please note that this project has a [Code of Conduct](https://codeberg.org/keyoxide/web/src/branch/main/CODE_OF_CONDUCT.md) that all contributors agree to abide when participating.

### About the Keyoxide project

The Keyoxide project strives for a healthier internet for all and has made all its efforts fully [open source](https://codeberg.org/keyoxide). Our [community](https://docs.keyoxide.org/community/) is open and welcoming, feel free to say hi!

Funding for the project comes primarily from the [NLnet foundation](https://nlnet.nl/), [NGI0](https://www.ngi.eu/) and the people supporting our [OpenCollective](https://opencollective.com/keyoxide). The project is grateful for all your support.
