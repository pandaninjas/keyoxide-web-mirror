<p><strong>WARNING: XMPP proofs are a work in progress. XMPP URIs are supported and displayed but NOT verified at the moment.</strong></p>

<p>Let's add a decentralized XMPP proof to your OpenPGP keys.</p>

<h3>Add a message to your XMPP vCard</h3>

<p>Using a XMPP client that supports editing the vCard (such as <a href="https://dino.im/">Dino</a> and <a href="https://gajim.org/">Gajim</a>), append the following message to the <strong>About</strong> section (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this XMPP account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to replace JABBERID):</p>
<code>proof@metacode.biz=xmpp:JABBERID</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or use the following command to upload the key to <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a XMPP account.</p>
