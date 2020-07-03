<p>Let's add a decentralized Github proof to your OpenPGP keys.</p>

<h3>Post a Github proof message</h3>

<p>Log in to <a href="https://github.com">github.com</a> and click on <strong>New gist</strong>.</p>

<p>Name the file <strong>openpgp.md</strong> and copy the following content into it (make sure to replace FINGERPRINT and USERNAME):</p>
<code>This is an OpenPGP proof that connects [my OpenPGP key](https://keyoxide.org/FINGERPRINT) to [this Github account](https://github.com/USERNAME).
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]
</code>

<p>After creating a public gist, copy the link to the gist.</p>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to update with the link to the post copied above):</p>
<code>proof@metacode.biz=https://gist.github.com/USERNAME/12345678912345678912345678912345</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Github account.</p>