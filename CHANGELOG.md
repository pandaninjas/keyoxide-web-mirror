# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.5.2] - 2022-12-12
### Fixed
- Removed obsolete XMPP API parameter

## [3.5.1] - 2022-12-12
### Changed
- Updated doipjs to 0.18.1
- Updated dependencies
### Removed
- jsdom install in Dockerfile

## [3.5.0] - 2022-11-17
### Added
- Request proxy API endpoint
- Standard coding style
### Changed
- Restructured source code
- Updated dependencies

## [3.4.18] - 2022-10-27
### Changed
- Updated dependencies
### Fixed
- Documentation

## [3.4.17] - 2022-10-27
### Fixed
- API data validation

## [3.4.16] - 2022-10-25
### Changed
- Updated dependencies

## [3.4.15] - 2022-10-11
### Changed
- Attempt both WKD and HKP if no protocol specified
- Improve profile viewing error message

## [3.4.14] - 2022-10-07
### Changed
- Updated dependencies

## [3.4.13] - 2022-10-06
### Fixed
- Check validity of data to be cached

## [3.4.12] - 2022-10-06
### Fixed
- Caching of keys

## [3.4.11] - 2022-10-06
### Added
- Caching of keys (experimental; opt-in)

## [3.4.10] - 2022-10-05
### Fixed
- Hash input fix function

## [3.4.9] - 2022-10-05
### Added
- Feedback to hash utilities

## [3.4.8] - 2022-09-30
### Changed
- Updated dependencies

## [3.4.7] - 2022-09-28
### Added
- Argon2 and bcrypt hash utilities

## [3.4.6] - 2022-09-21
### Changed
- Updated dependencies

## [3.4.5] - 2022-09-18
### Fixed
- Enable node's experimental-fetch

## [3.4.4] - 2022-09-16
### Changed
- Renamed "generate profile" to "view profile"
- Added data to API output

## [3.4.3] - 2022-09-10
### Changed
- Updated dependencies

## [3.4.2] - 2022-09-10
### Fixed
- Webpack build error

## [3.4.1] - 2022-09-10
### Changed
- Updated doipjs to 0.16.0

## [3.4.0] - 2022-09-10
### Added
- h-card markup to profile pages (thanks to [caesar](https://codeberg.org/caesar) [PR#130](https://codeberg.org/keyoxide/keyoxide-web/pulls/130))
- `ariadne-identity-proof` header to profile pages
### Fixed
- Keybase profiles (thanks to [gonz0](https://codeberg.org/gonz0))

## [3.3.1] - 2022-03-15
### Fixed
- Docker builds
- Static files
- robots.txt content

## [3.3.0] - 2022-03-15
### Added
- Webpack bundling
- Link to community forum
- Tests
### Changed
- Updated openpgpjs to 5.1.0

## [3.2.0] - 2021-11-07
### Added
- Support for ariadne.id proof notations
- Links to new Keyoxide docs and blog
- Community section on index
- Alpha version of API (undocumented as of release)
### Changed
- Styles
- Minor index content changes
- Updated doipjs to 0.14.0
### Removed
- Guides and other documentation
- Markdown related dependencies

## [3.1.1] - 2021-07-26
### Added
- Quick dev setup using nix and direnv
### Changed
- Updated doipjs to 0.13.0

## [3.1.0] - 2021-06-29
### Changed
- Improve accessibility
### Fixed
- Utilities back in working order

## [3.0.4] - 2021-06-03
### Changed
- Updated doipjs to 0.12.9
### Fixed
- Hide claims without matches

## [3.0.3] - 2021-06-03
### Changed
- Use libravatar for avatar fetching
- Updated doipjs to 0.12.7
### Fixed
- XMPP documentation on vCard editing

## [3.0.2] - 2021-05-05
### Fixed
- Put profile name in page title
- Remove faulty claims before rendering the page

## [3.0.1] - 2021-05-04
### Fixed
- Optimize excessively large image

## [3.0.0] - 2021-05-04
### Added
- Server-side rendering of profiles
- Custom components for claims and keys
- "FLoC off" response headers
### Updated
- User interface redesign
- Integrate encrypt, verify into profile pages
- Rel="me" profile links
- Guides
### Removed
- Dedicated encrypt, verify and proofs pages
- Utility pages

## [2.5.0] - 2021-03-09
### Added
- IRC service provider
- Matrix service provider
### Fixed
- Gracefully handle fetching non-existing guides

## [2.4.2] - 2021-03-02
### Fixed
- Twitter claim verification

## [2.4.1] - 2021-01-13
### Added
- Owncast service provider
### Changed
- Visual tweaks

## [2.4.0] - 2021-01-11
### Added
- Support for signature profiles
- Robots.txt
- Noindex meta tags on profile pages
### Changed
- Allow setting of custom HKP server
## Fixed
- Render error messages when error is object

## [2.3.4] - 2021-01-02
### Fixed
- Twitter claims

## [2.3.3] - 2020-12-26
### Fixed
- Handling null userIds

## [2.3.2] - 2020-12-24
### Fixed
- Variable used in URL returned undefined

## [2.3.1] - 2020-12-20
### Fixed
- Handling of claim verifications that timed out

## [2.3.0] - 2020-12-15
### Changed
- Identity claim verifications are now handled by doipjs

### Fixed
- Fix Reddit proofs

## [2.2.8] - 2020-09-11
### Fixed
- Fix handling of Twitter URLs with parameters

## [2.2.7] - 2020-09-10
### Fixed
- Remove newlines before checking equality

## [2.2.6] - 2020-09-10
### Fixed
- Fix handling of keys without selfCertifications

## [2.2.5] - 2020-09-06
### Changed
- Add domain to proof displays for gitea and gitlab
- Allow Mastodon backlinks to be URLs containing fingerprint

## [2.2.4] - 2020-08-31
### Fixed
- Fix var declaration

## [2.2.3] - 2020-08-31
### Fixed
- Make server verification case insensitive

## [2.2.2] - 2020-08-31
### Fixed
- Fix missing env variable

## [2.2.1] - 2020-08-30
### Added
- Add a Getting Started page
### Changed
- Update FAQ
- Migrate to different QR library

## [2.2.0] - 2020-08-24
### Added
- Add environment variable to set Onion-Location header
- Support images embedded in keys
- Support Gitea proofs
- Support GitLab proofs
- Support Twitter verification without Twitter API key
### Fixed
- Fix env template DOMAIN name
- Fix non-updating guide titles

## [2.1.1] - 2020-08-15
### Fixed
- Fix duplicate proof verifications

## [2.1.0] - 2020-08-15
### Added
- Custom XMPP vCard fetch server setting
- Custom Express port setting
- Custom domain setting
- Include Keyoxide version number in footer
### Changed
- Improve static link handling to dependencies
- Get notations from all available UIDs
- Add timeout to some fetch calls
### Fixed
- Fix hardcoded URLs

## [2.0.2] - 2020-08-13
### Fixed
- Reference to old license

## [2.0.1] - 2020-08-12
### Fixed
- Reference to old license

## [2.0.0] - 2020-08-09
### Added
- Docker containers
### Changed
- NodeJS backend
- Distinguish primary email address from additional email addresses
### Fixed
- Profile view for keys without name

## [1.0.0] - 2020-07-30
### Added
- license-check-and-add NPM tool and scripts
### Changed
- Migrated to AGPL-3.0-or-later

## [0.4.0] - 2020-07-23
### Added
- QR code for XMPP+OMEMO
### Changed
- Update design
- Update index content
- Remove dependency on external MD5 library
- Improve WKD URL generator

## [0.3.1] - 2020-07-21
### Changed
- Update openpgpjs to v4.10.7

## [0.3.0] - 2020-07-18
### Added
- dev.to identity proof
- XMPP identity proof
### Fixed
- Improve proof snippets
- Prevent null proofs from displaying

## [0.2.1] - 2020-07-16
### Fixed
- Make www optional for reddit regex

## [0.2.0] - 2020-07-16
### Added
- Discourse identity proof
- Pleroma identity proof
- New logo
### Changed
- Update openpgpjs to v4.10.6
- Update design
- New favicon
- Improve Keybase guide
### Fixed
- Remove underscores from verify and encrypt links
- Hide revoked userids
- Hide null proofs

## [0.1.0] - 2020-07-05
### Added
- Keybase keys support
- Profile URL generator utility
### Fixed
- Identity proofs case sensitivity
