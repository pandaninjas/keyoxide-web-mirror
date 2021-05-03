There is a lot to Keyoxide and decentralized identity verification, so let's divide the knowledge in three sections of increasing complexity.

[[toc]]

## Basic

Keyoxide allows you to prove "ownership" of accounts on websites, domain names, IM, etc., regardless of your username.

That last part is important: you could, for example, be 'alice' on Lobste.rs, but '@alice24' on Twitter. And if your website is 'thatcoder.tld', how are people supposed to know that all that online property is yours?

Of course, one could opt for full anonymity! In which case, keep these properties as separated as possible.

But if you'd like these properties to be linked and, by doing so, establish an online identity, you'll need a clever solution.

Enter Keyoxide.

When you visit someone's Keyoxide profile and see a green tick next to an account on some website, it was proven beyond doubt that the same person who set up this profile also holds that account.

## Intermediate

Keyoxide's purpose is just that: linking online properties together. Now, many services could easily claim they could accomplish the same feat. To ensure it happens in a trustworthy manner, Keyoxide uses an "open source, decentralized and cryptography-based approach to bidirectional linking".

Let's break down that sentence.

### Open source

Open source means: everyone can inspect the code behind Keyoxide. Really! Here, have a look at the code behind this website: [https://codeberg.org/keyoxide/web](https://codeberg.org/keyoxide/web). In fact, here is the code for the page you are currently reading: [link to come](/).

Not only can you look at it, you are allowed to make changes and even "fork it": take all this code and build your own product with it. Allowed? You are invited to! This keeps the Keyoxide project honest and always moving towards something that is better for everyone.

"Doesn't open source make it easier for others to steal your idea and your revenue?" Ah, good ol' capitalism. No. More about funding and the flow of money in the [Advanced](#advanced) section.

The Keyoxide project is licensed under [AGPL-3.0-or-later](https://codeberg.org/keyoxide/web/src/branch/main/LICENSE).

### Decentralized

The topic of decentralization is vast and complex. In short, it refers to the practice of keeping data in separate but connected places, instead of putting all the data in one single place.

Have you noticed how Google, Facebook and banks are desired targets for hackers? That is because they all use a centralized model. Break in once, get all the data. Of course, breaking in is difficult. But not impossible.

Keyoxide uses decentralization on two levels: the profile data, and the identity verification process.

#### Decentralized profile data

Where does Keyoxide get the data from to generate the profile pages? To make a Facebook profile, you need to give your data to them. Is this the same? Rest assured, Keyoxide does not want your data.

You put your data in a so-called cryptographic key. For our purposes, let's consider this a "glass vault". Everyone (including Keyoxide) can look inside the glass vault and see your data, but no one except you can change it or delete it. You have full control over your data. You can store it where you want: on a dedicated "key server", on your own server. You can even put it in a little piece of text!

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

This text above is all the data Keyoxide needs to generate a profile page. Everyone can read it. But no one can modify it. Change a single character in the text above and the signature gets invalidated.

A true "glass vault".

#### Decentralized identity verification

The process itself of verifying identities (more on this in the [bidirectional linking](#bidirectional-linking) section) is also decentralized. You do not need to contact Keyoxide servers for most verifications.

A Hackernews account can be verified by looking at the content of its "about" section. Most Fediverse accounts can be verified by looking at their "biography" section.

If you view a profile page on this website, your browser handles the identity verification by directly contacting Hackernews and the Fediverse. No intermediary servers required.

If you run `keyoxide verify ...` in a terminal, your computer handles the identity verification directly, not some server.

Once Keyoxide apps for mobile devices are developed (no ETA yet), your mobile device will handle the identity verification directly, not some server.

The less intermediary servers are required, the more trustworthy the process becomes.

Note: there are some exceptions to this when it comes to browsers, more on this in the [proxy](#proxy) section.

### Cryptography

Proofs are created and managed inside cryptographic keys that act as "secure transport vessels", which are stored on special servers that already contain the cryptographic keys of many people. Keyoxide simply goes looking for your key and reads the content.

What makes cryptographic keys so useful for us is that they are actually made of two keys: a "private key" and a "public key".

Everyone has access to the public key. This is the "glass vault" itself: everyone can see it, but no one can modify its content. You can safely share your public key.

The "glass vault" can only be opened and modified using the private key, which is usually nothing more than a file with seemingly random characters. The private key is yours and yours alone, and should never be shared.

It goes without saying that losing the private key means losing access to the public key. Likewise, someone who steals your private key can easily modify the contents of your public key. Handling cryptographic keys is no simple task, a process where security always takes precedence over convenience.

Keyoxide uses the widely-used and well-known [OpenPGP standard](https://www.openpgp.org).

You'll find guidance over on the [Getting started](/getting-started) page.

### Bidirectional linking

How does one prove they have control over two online properties?

Let's consider this slightly unusual scenario: how could I prove I own a car? We do not want to use any government services (which are centralized) so checking license plates is out of the question. I would also like to remain anonymous, so identity cards are also a no-go.

Obviously, I can't link the car to my person without revealing my identity. But what if I could link it to my house? That way, "whoever owns this house also owns this car". I establish an identity (I own this house and I own this car) without ever revealing my identity.

All I need to do is place a note behind a window of my home with the license plate on it. "Behind a window", not "outside": a glass vault! Everyone can read it, but only the person with the house keys can modify it.

I have now claimed my car in a fully decentralized manner, no need to involve any centralized organization. Is this sufficient? Yes and no. Only I could have placed that note there so that proves beyond doubt my access to the house.

But what if my neighbor puts my license plate on a note in their home? Their attempt at impersonation is an attempt at claiming ownership over my car.

This is why we can only trust bidirectional linking: not only does my home need a note behind a window with the car's license plate on it, my car needs a note under the windshield with my address on it. The neighbor can no longer be claim ownership over my car, as the car's note clearly states my home address, not theirs.

An unusual scenario indeed, but one that simplifies the stakes. Keyoxide allows you to establish an online identity while remaining anonymous: no one needs to know you are, but you can still prove you hold accounts on different websites.

## Advanced

By now, you should have all the knowledge to understand what is going on and get started. Here are a few more advanced (and optional) topics.

### Proxy

This section involves almost exclusively Keyoxide's web client (the website you are currently viewing). Native clients (like the [Keyoxide CLI](https://codeberg.org/keyoxide/cli)) do not need a proxy under normal circumstances.

Some services like Gitlab or DNS require complicated verification processes or code that cannot be run in a browser. In such cases, the browser will ask a Keyoxide server to do the verification instead.

Since this is the internet we are talking about, you should always be skeptical about data that comes from some unknown server. In order to mitigate this, each profile page on this website will invite you to perform the identity verification again but locally, using a native client appropriate to your device if one exists.


### Claims

Claims are the pieces of data to lets you claim an online property. A claim can only be verified by a proof.

Claims are stored inside cryptographic keys as so-called &quot;notations&quot;: these can be seen as custom data entries. Typically, claims are structured as follows:

```
proof@metacode.biz=https://platform.com/username
```

- *proof* tells us we are looking at the location of a potential proof the current claim.
- *@metacode.biz* tells us this is a specific type of proof, as defined on the [metacode.biz website](https://metacode.biz/openpgp/proofs). This part should NOT be changed when adding a new proof to your key.
- The rest of the proof is simply a URL to the profile page of your account on a website.

It is important to note that not all websites are supported. For now, supporting a single online platform involves a bit of work. It is also important to note not all platforms can be supported. You can always suggest new platforms to support by [creating an issue here](https://codeberg.org/keyoxide/doipjs) or contacting me at [yarmo@keyoxide.org](mailto:yarmo@keyoxide.org).

### Keyoxide instances

The Keyoxide website was built with the idea that other people could put it on their servers as well. We call these "instances". The Keyoxide project's lead developer has put an instance on [https://keyoxide.org](https://keyoxide.org) but that is not the only way to access Keyoxide. Everyone could put it on their servers.

Yes, another layer of decentralization.

The idea is simple: you will most likely not know the lead developer, so why should you trust his website [https://keyoxide.org](https://keyoxide.org)? By making the Keyoxide website selfhostable, you could put it yourself on your own server, or ask a friend to put it on theirs.

Ultimately, any Keyoxide website/instance is potentially compromised and any identity verification should be performed locally to get the most trustworthy results.

### Funding and the flow of money

With surveillance capitalism on the rise, it's important to understand where money comes from, especially with a project that involves online identity!

The project is fully funded by donations. There are no fees to using or hosting Keyoxide. There are no ads. There is no tracking. There are no investors.

All donations come from the people and the organizations that see the need for a project like Keyoxide to exist and be universally accessible.

Donations go to the [Key To Identity Foundation](https://keytoidentity.foundation/), founded by the lead developer for the purpose of promoting and sustaining the Keyoxide projects and other future identity-enhancing projects. 

If you'd like to donate as well, please have a look at the [foundation's donate page](https://keytoidentity.foundation/donate). All contributions are much appreciated and help the lead developer to fully commit to the Keyoxide project.
