# Adding a DNS proof

Let's add a decentralized DNS proof to your OpenPGP keys.

[[toc]]

## Update DNS records for your website

Add the following TXT record to the DNS records of the (sub)domain you want to prove control over (make sure to replace FINGERPRINT):

`openpgp4fpr:FINGERPRINT`

No specific TTL value is required.

## Update the PGP key

First, edit the key (make sure to replace FINGERPRINT):

```
gpg --edit-key FINGERPRINT
```

Get a list of user IDs and find the index of the one to assign the notation to:

```
list
```

Select the desired user ID (make sure to replace N):

```
uid N
```

Add a new notation:

```
notation
```

Enter the notation (make sure to replace DOMAIN, don't include https://):

```
proof@metacode.biz=dns:DOMAIN?type=TXT
```

Save the key:

```
save
```

Upload the key to WKD or use the following command to upload the key to [keys.openpgp.org](https://keys.openpgp.org) (make sure to replace FINGERPRINT):

```
gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT
```

And you're done! Reload your profile page, it should now show a verified domain name.
