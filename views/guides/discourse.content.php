<p>Let's add a decentralized Discourse proof to your OpenPGP keys.</p>

<h3>Update the Discourse account</h3>

<p>Log in to the discourse instance website and add the following text to your <strong>About me</strong> (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this Discourse account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]
</code>

<p>After posting, copy the link to your profile page (it should end with your <strong>/u/USERNAME</strong>).</p>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to replace PROFILE_URL with the link to the profile copied above):</p>
<code>proof@metacode.biz=PROFILE_URL</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Discourse account.</p>
