<p>Let's add a decentralized Mastodon proof to your OpenPGP keys.</p>

<h3>Update the Mastodon account</h3>

<p>Log in to your Mastodon instance and click on <strong>Edit profile</strong>.</p>
<p>Add a new item under <strong>Profile metadata</strong> with the label <strong>OpenPGP</strong> and your PGP fingerprint as the content.</p>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to update the link):</p>
<code>proof@metacode.biz=https://INSTANCE.ORG/@USERNAME</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or use the following command to upload the key to <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Mastodon account.</p>
