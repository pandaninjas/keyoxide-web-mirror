<p>Let's add a decentralized Reddit proof to your OpenPGP keys.</p>

<h3>Post a Reddit proof message</h3>

<p>Log in to <a href="https://www.reddit.com">www.reddit.com</a> and create a new post with the following text (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this Reddit account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

<p>After posting, copy the link to the post.</p>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to update with the link to the post copied above):</p>
<code>proof@metacode.biz=https://www.reddit.com/user/USERNAME/comments/123123/TITLE/</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Reddit account.</p>
