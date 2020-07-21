<p>Over time, you may need to delete proofs. Changing proofs can be achieved by deleting proofs and adding new ones.</p>

<h3>Delete all proofs</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Launch the notation prompt</p>
<code>notation</code>

<p>Enter the 'none' notation to delete all notations</p>
<code>none</code>

<p>Save the changes</p>
<code>save</code>

<h3>Delete one of your proofs</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Launch the notation prompt</p>
<code>notation</code>

<p>In this case, you need to start with <b>-</b> followed by the proof you want to delete. Make sure you type the proof exactly like it is in your key.</p>
<code>-proof@metacode.biz=dns:yourdomain.org?type=TXT</code>

<p>Save the changes</p>
<code>save</code>

<h3>Publish your key changes</h3>
<p>Like adding new proofs, you most probably want to publish your changes to WKD or to a keyserver like <a href="keys.openpgp.org">keys.openpgp.org</a>
