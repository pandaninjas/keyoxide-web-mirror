<p>Let's see how to verify identity proofs.</p>

<h3>Obtain a public key for verification</h3>

<p>The idea is that anyone can add identity proofs of various platforms in their keys. Since this information is kept in the public key, you could take anyone's public key and check whether they indeed have control over the accounts they claim to.</p>

<p>If you already have a public key (or its fingerprint) with OpenPGP identity proofs you would like to use to verify, great! If not, you could use the following fingerprint:</p>
<code>9f0048ac0b23301e1f77e994909f6bd6f80f485d</code>

<h3>Verify proofs</h3>

<p>Open the <a href="/proofs" target="_blank">keyoxide.org/proofs</a> page and paste the fingerprint in the <strong>Email / key id / fingerprint</strong> field. Scroll down and press the <strong>VERIFY PROOFS</strong> button.</p>
<p>You now see a list of domains and/or accounts on platforms for which the owner of the public key claims to have an control over.</p>
<p>If the last link on a line says <strong>proof</strong>, the proof could not be verified for any number of reasons but Keyoxide still allows to check the supposed proof and decide for yourself whether you trust the claim. If the </p>
<p>If the last link on a line says <strong>verified</strong>, the owner of the public key indeed has shown beyond doubt that it has control over the domain or account.</p>

<h3>Your turn</h3>

<p>If you'd like to add decentralized OpenPGP identity proofs to your key, go to the <a href="/guides">guides</a> and find the right one for your platform of choice. You may find the process to be remarkably easy.</p>

<p>If your platform is not in the list of <a href="/guides">guides</a>, it's not supported yet. See the <a href="/guides/contributing">contributing guide</a> for more information on how to get that platform supported.</p>
