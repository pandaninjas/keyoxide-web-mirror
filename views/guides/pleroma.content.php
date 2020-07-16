<p>Let's add a decentralized Pleroma proof to your OpenPGP keys.</p>

<h3>Update the Pleroma account</h3>

<p>Log in to your Pleroma instance and add the following lines to your <strong>Bio</strong> (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this Pleroma account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to update the link):</p>
<code>proof@metacode.biz=https://INSTANCE.ORG/users/USERNAME</code>

<p>Please note that the <strong>/users/</strong> part of the URL is mandatory for the proof to work.</p>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Fediverse account (Pleroma is part of the <a href="#https://en.wikipedia.org/wiki/Fediverse">Fediverse</a>).</p>
