# Adding an IRC proof

Let's add a decentralized IRC proof to your OpenPGP keys.

[[toc]]

### Add a property to your IRC taxonomy

After logging in into the IRC server with your registered nickname, send the
following message (make sure to replace FINGERPRINT):

```
/msg NickServ SET PROPERTY KEY openpgp4fpr:FINGERPRINT
```

To check whether successful, send (make sure to replace NICK):

```
/msg NickServ TAXONOMY NICK
```

To add more fingerprints, send:

```
/msg NickServ SET PROPERTY KEY2 openpgp4fpr:FINGERPRINT
```

### Update the PGP key

First, edit the key (make sure to replace FINGERPRINT):

```
gpg --edit-key FINGERPRINT
```

Add a new notation:

```
notation
```

Enter the notation (make sure to replace IRC_SERVER and NICK):

```
proof@metacode.biz=irc://IRC_SERVER/NICK
```

So, for user `foo` on the freenode server, this would be:

```
proof@metacode.biz=irc://chat.freenode.net/foo
```

Save the key:

```
save
```

Upload the key to WKD or use the following command to upload the key to
[keys.openpgp.org](https://keys.openpgp.org) (make sure to replace FINGERPRINT):

```
gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT
```

And you're done! Reload your profile page, it should now show an IRC account.
