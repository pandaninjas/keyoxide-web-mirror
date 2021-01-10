# Creating signature profiles

Let's create a signature profile. This is a profile that can be verified by Keyoxide but the data for which lives in a clear-signed text document rather than as notations in the key itself.

[[toc]]

## Why put claims in a signed document/signature profile?

Storing claims inside the key as notations is a powerful method. Wherever the public key goes, so go the identity claims. This allows one to use the existing vast network of key sharing tools to also share these identity claims.

There are drawbacks to this: you lose granularity. You cannot pick and choose the claims you want to send to certain people or use for certain purposes. There is also the possibility that notations in keys could be scraped as the keys are publicly available.

Putting (certain) claims in a signature profile solves both drawbacks. You can choose which claims to be associated with each other and you can choose which persons can see this by only sending it to them. You can even encrypt the signature profile! Since the signature profile is not publicly available (unless you make it so), there is no possibility to scrape the contents of it.

Note that there is one catch: the person you send it to could publish it. Only send claims you wish to keep secret to people you trust!

## Writing the plaintext document

Using terminal tools like vim, emacs, nano or graphical tools like notepad, create a new document. The content should eventually look like this:

```
Hey there! Here's a signature profile with doip-related proofs.

openpgp4fpr:3637202523e7c1309ab79e99ef2dc5827b445f4b
proof=dns:doip.rocks
```

You can add as much "regular" text as you'd like. The point of these signature profiles is that they are both human-friendly and machine-readable. In this case, the first line is meant for humans.

The second thing to add is the fingerprint of the key that will sign this message. This is done by typing **openpgp4fpr:** followed by the fingerprint.

Note: this line is also intended for humans and corresponds to the text that is usually used to verify the claims. Though it can be handy for humans when reading the signature profile, the line is not strictly necessary.

Finally, you can add proofs by adding a new line beginning with **proof=** followed by the claim that is given by the [guides](/guides). So, for example, **proof=dns:doip.rocks** verifies a domain name and **proof@metacode.biz=https://twitter.com/USERNAME/status/1234567891234567891** verifies a Twitter account.

You can add as many claims as you wish as long as each is on their own line.

## Signing the document

You will now sign this document, making it untemperable and possible to prove beyond doubt that you, as holder of the private key, and only you could have signed the document.

Assuming you have an OpenPGP key with signing capabilities, execute the following command in the terminal:

```
gpg -u EMAIL_ADDRESS --clear-sign FILENAME
```

Replace EMAIL_ADDRESS and FILENAME with the correct values. As an example:

```
gpg -u test@doip.rocks --clear-sign sigpro.txt
```

This will generate a file named **sigpro.txt.asc** with the following content:

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

Hey there! Here's a signature profile with doip-related proofs.

openpgp4fpr:3637202523e7c1309ab79e99ef2dc5827b445f4b
proof=dns:doip.rocks
-----BEGIN PGP SIGNATURE-----

iQHfBAEBCgBJFiEENjcgJSPnwTCat56Z7y3FgntEX0sFAl/5rvsaGGh0dHBzOi8v
a2V5cy5vcGVucGdwLm9yZy8QHHRlc3RAZG9pcC5yb2NrcwAKCRDvLcWCe0RfSz45
C/9msqmNZlTXa99Oec82Za24LPCKuUDLwNEdnO4s8uzDmjFcNSGeM55RxfVJOOPX
zT4b91GgHy/q8+4THZbsF+3Lu6CCUTe33cDQVpdcPA8Gpm7ipjLM2xSdhspqOzhu
PvWJzk8H7CIk+iuv9IYatr7caR8x1G/NN+r0YpkKyI27oVQu4oOBvGPl30R/6734
JuFCY6oRe9spXzCZ7qbPVzqzuflPZHvgGMIj29x8lmtPgOAYhMbdhZi5RvfP9jDB
huUdRPE9ATk09hztOHaMNTTbxOLGtEQXog3ef5iYLUT3/KjG8a79Cqq51OS+6zVC
lUbUGQISCBJ68qfLbxXMGcL6kPiOm9XQbGZI+QcZI7vOSafPr/+FKbFonIgjTFNY
WJSTyVzhAcH0OPl/vL0DMjNIInIUelYUmaBM+MEXIgLcwtSoICLJDRpCybVjzoZi
evqL4ZA7Th3KZYcF6buPvBdl8tg8nsK2KWHDPCpYRW/RYN3D0QZkx9v/Cxks400U
MIQ=
=WGb1
-----END PGP SIGNATURE-----
```

This document is a fully functional signature profile! Test it out [here](/sig).

### The process of fetching keys

Keyoxide verifies the validity of the signature before verifying the individual claims. To this end, it needs to find the key that signed this profile.

Keyoxide always first checks whether it can fetch the public key using [Web Key Directory](/guides/web-key-directory) with the email address provided as **sender**.

If this fails, Keyoxide tries to fetch the key using a keyserver. By default, it will use [keys.openpgp.org](https://keys.openpgp.org) (which tends to be the most reliable of keyservers). To set your preferred keyserver, execute the following command instead:

```
gpg -u EMAIL_ADDRESS --sig-keyserver-url https://KEYSERVER_DOMAIN/ --clear-sign FILENAME
```