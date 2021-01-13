# Adding an Owncast proof

Let's add a decentralized Owncast proof to your OpenPGP keys.

[[toc]]

## Update your Owncast server configuration

On your server, add the following lines to the `instanceDetails > socialHandles` entry in the `config.yaml` (make sure to replace FINGERPRINT):

```
    - platform: keyoxide
      url: https://keyoxide.org/FINGERPRINT
```

When not identifying your key by its fingerprint (for example, when using WKD), add the following lines instead:

```
    - platform: keyoxide
      url: https://keyoxide.org/EMAIL#FINGERPRINT
```

## Update the PGP key

First, edit the key (make sure to replace FINGERPRINT):

```
gpg --edit-key FINGERPRINT
```

Add a new notation:

```
notation
```

Enter the notation (make sure to update with the domain of the Owncast instance):

```
proof@metacode.biz=https://stream.example.org
```

Save the key:

```
save
```

Upload the key to WKD or use the following command to upload the key to [keys.openpgp.org](https://keys.openpgp.org) (make sure to replace FINGERPRINT):

```
gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT
```

And you're done! Reload your profile page, it should now show a verified Owncast account.
