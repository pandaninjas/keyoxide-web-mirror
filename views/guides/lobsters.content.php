<p>Let's add a decentralized Lobste.rs proof to your OpenPGP keys.</p>

<h3>Update the Lobste.rs account</h3>

<p>Log in to <a href="https://lobste.rs">Lobste.rs</a> and append the following text to the <strong>About</strong> section (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this Lobste.rs account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to replace USERNAME):</p>
<code>proof@metacode.biz=https://lobste.rs/u/USERNAME</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Lobste.rs account.</p>
