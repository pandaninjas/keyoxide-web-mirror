# Adding a Matrix proof

Let's add a decentralized Matrix proof to your OpenPGP keys.

[[toc]]

### Sending a proof message

After logging in into Matrix, join the
[#doipver:matrix.org](https://matrix.to/#/#doipver:matrix.org) room and send the
following message (make sure to replace FINGERPRINT)

```
[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]
```

Click on "View Source" for that message, you should now see the value for
`room_id` and `event_id`.

The value for `room_id` should be `!dBfQZxCoGVmSTujfiv:matrix.org`. The value
for `event_id` is unique to your message.

If your Matrix client does not support "View Source", choose "Share" or
"Permalink". The URL obtained should look like this:

```
https://matrix.to/#/ROOM_ID/EVENT_ID?via=...
```

### Update the PGP key

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

Enter the notation (make sure to replace USER_ID, ROOM_ID, EVENT_ID):

```
proof@metacode.biz=matrix:u/USER_ID?org.keyoxide.r=ROOM_ID&org.keyoxide.e=EVENT_ID
```

So, for user `@foo:matrix.org`, this would be:

```
proof@metacode.biz=matrix:u/@foo:matrix.org?org.keyoxide.r=!dBfQZxCoGVmSTujfiv:matrix.org&org.keyoxide.e=$3dVX1nv3lmwnKxc0mgto_Sf-REVr45Z6G7LWLWal10w
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

And you're done! Reload your profile page, it should now show a Matrix account.
