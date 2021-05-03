Keyoxide does not participate in tracking, data collection or privacy infringement.

The following document describes how data flows and is handled by Keyoxide.

## Accounts

There are no accounts on Keyoxide. Never does Keyoxide need to know any of your personally identifiable information.

## Profile pages

To generate a profile page, Keyoxide will look at the URL and fetch the associated OpenPGP key. The OpenPGP key is parsed on the server and the claims are rendered unverified then sent to the browser. The browser will then attempt to verify the claims by fetching the required proofs, usually JSON documents.

If a browser cannot fetch the proof (for example, due to CORS restraints), it will ask a proxy server to fetch the proof instead if a proxy is configured by the instance administrator.

OpenPGP keys, profile pages and claim verifications are not cached on the server.

## Donations

Donations are handled by Stripe. Keyoxide does not store personal or payment-related information.

How Stripe processes the data is covered by the [Stripe privacy policy](https://stripe.com/privacy).

## Keyoxide instances

Each Keyoxide instance is administered by different people using different technologies and different configurations. This document cannot account for the way each particular instance handles/stores/processes the HTTP requests.

## Keyoxide.org instance

The following only applies to the keyoxide.org instance.

HTTP requests are not logged. Basic server metrics and aggregate request counters are monitored for server performance. These metrics do not contain route/page information and therefore do not reveal/store which profiles were viewed.
