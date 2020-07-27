<p>Over time, you may need to delete proofs. Changing proofs can be achieved by deleting proofs and adding new ones.</p>

<h3>Delete all proofs</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Launch the notation prompt:</p>
<code>notation</code>

<p>Enter the 'none' notation to delete all notations:</p>
<code>none</code>

<p>Save the changes:</p>
<code>save</code>

<h3>Delete one of your proofs</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Launch the notation prompt:</p>
<code>notation</code>

<p>Enter the <b>-</b> (minus) symbol followed by the proof you want to delete. Make sure you type the proof exactly like it is in your key.</p>
<code>-proof@metacode.biz=dns:yourdomain.org?type=TXT</code>

<p><i>To make it easier to enter the right proof, you could first <a href="managing-proofs-listing">list all proofs</a> and simply copy the proof (including "proof@metacode.biz=") you want to delete.</i></p>

<p>Save the changes:</p>
<code>save</code>

<p>Upload the key to WKD or use the following command to upload the key to <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT</code>
