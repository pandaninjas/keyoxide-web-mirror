<p>Let's add a decentralized dev.to proof to your OpenPGP keys.</p>

<h3>Post a dev.to proof message</h3>

<p>Log in to <a href="https://dev.to">dev.to</a> and create a new post with the following text (make sure to replace FINGERPRINT and USERNAME):</p>
<code>This is an OpenPGP proof that connects [my OpenPGP key](https://keyoxide.org/FINGERPRINT) to [this dev.to account](https://dev.to/USERNAME).
For details check out https://keyoxide.org/guides/openpgp-proofs

[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

<p>After posting, copy the link to the post.</p>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to update with the link to the post copied above):</p>
<code>proof@metacode.biz=https://dev.to/USERNAME/POST_TITLE</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified dev.to account.</p>
