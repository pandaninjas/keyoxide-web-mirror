<p>Let's add a decentralized DNS proof to your OpenPGP keys.</p>

<h3>Update DNS records for your website</h3>

<p>Add the following TXT record to the DNS records of the (sub)domain you want to prove control over (make sure to replace FINGERPRINT):</p>
<code>openpgp4fpr:FINGERPRINT</code>

<p>No specific TTL value is required.</p>

<h3>Update the PGP key</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to replace DOMAIN, don't include https://):</p>
<code>proof@metacode.biz=dns:DOMAIN?type=TXT</code>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or use the following command to upload the key to <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified domain.</p>
