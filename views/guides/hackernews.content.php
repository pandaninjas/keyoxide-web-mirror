<p>Let's add a decentralized Hackernews proof to your OpenPGP keys.</p>

<h3>Update the Hackernews account</h3>

<p>Log in to <a href="https://news.ycombinator.com">Hackernews</a> and click on your <strong>username</strong>.</p>

<p>Add the following lines to your <strong>about</strong> (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this Hackernews account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]
</code>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to replace USERNAME):</p>
<code>proof@metacode.biz=https://news.ycombinator.com/user?id=USERNAME</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Hackernews account.</p>