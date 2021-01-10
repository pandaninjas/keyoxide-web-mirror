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
Hey there! Here's a signature profile with proofs related to the DOIP project (https://doip.rocks).

Verify this profile at https://keyoxide.org/sig

proof=dns:doip.rocks
proof=https://fosstodon.org/@keyoxide
```

You can add as much "regular" text as you'd like. The point of these signature profiles is that they are both human-friendly and machine-readable. In this case, the first line is meant for humans.

The second thing to add is a link to a website that can verify these signature profiles. If you know or host a different instance, you can choose to link that instance instead! If not, you are welcome to leave the link as is. Note that this link is not mandatory but could prove very helpful to the recipients.

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

Hey there! Here's a signature profile with proofs related to the DOIP project (https://doip.rocks).

Verify this profile at https://keyoxide.org/sig

proof=dns:doip.rocks
proof=https://fosstodon.org/@keyoxide
-----BEGIN PGP SIGNATURE-----

iQHEBAEBCgAuFiEENjcgJSPnwTCat56Z7y3FgntEX0sFAl/7L0MQHHRlc3RAZG9p
cC5yb2NrcwAKCRDvLcWCe0RfS3iYC/0QQqz2lzSNrkApdIN9OJFfd/sP2qeGr/uH
98YHa+ucwBxer6yrAaTYYuBJg1uyzdxQhqF2jWno7FwN4crnj15AN5XGemjpmqat
py9wG6vCVjC81q/BWMIMZ7RJ/m8F8Kz556xHiU8KbqLNDqFVcT35/PhJsw71XVCI
N3HgrgD7CY/vIsZ3WIH7mne3q9O7X4TJQtFoZZ/l9lKj7qk3LrSFnL6q+JxUr2Im
xfYZKaSz6lmLf+vfPc59JuQtV1z0HSNDQkpKEjmLeIlc+ZNAdSQRjkfi+UDK7eKV
KGOlkcslroJO6rT3ruqx9L3hHtrM8dKQFgtRSaofB51HCyhNzmipbBHnLnKQrcf6
o8nn9OkP7F9NfbBE6xYIUCkgnv1lQbzeXsLLVuEKMW8bvZOmI7jTcthqnwzEIHj/
G4p+zPGgO+6Pzuhn47fxH+QZ0KPA8o2vx0DvOkZT6HEqG+EqpIoC/a7wD68n789c
K2NLCVb9oIGarPfhIdPV3QbrA5eXRRQ=
=QyNy
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