<!--
Copyright (C) 2020 Yarmo Mackenbach

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If your software can interact with users remotely through a computer network,
you should also make sure that it provides a way for users to get its source.
For example, if your program is a web application, its interface could display
a "Source" link that leads users to an archive of the code. There are many
ways you could offer source, and different solutions will be better for different
programs; see section 13 for the specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary. For
more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 -->
<p>Let's see how to encrypt a message.</p>

<h3>Obtain a public key for encryption</h3>

<p>The idea is that you use someone's public key to encrypt a message. From then on, the message cannot be decrypted and read by anyone but the person possessing the private keys associated with the public key (they'll have the same fingerprint).</p>

<p>If you already have a public key (or its fingerprint) you would like to use to encrypt a message, great! If not, you could use the following fingerprint:</p>
<code>9f0048ac0b23301e1f77e994909f6bd6f80f485d</code>

<h3>Encrypt a message</h3>

<p>Open the <a href="/encrypt" target="_blank">keyoxide.org/encrypt</a> page and paste the fingerprint in the <strong>Email / key id / fingerprint</strong> field.</p>
<p>Write a message in the <strong>Message</strong> field. Scroll down and press the <strong>ENCRYPT MESSAGE</strong> button.</p>
<p>You have successfully encrypted the message! The encrypted message in the <strong>Message</strong> field can safely be sent via unsecured communication channels knowing that only the person possessing the private key associated with that fingerprint can read it.</p>

<h3>Going further</h3>

<p>You could try using different mechanisms of fetching keys, such as <strong>web key directory</strong> or copy-pasting a plaintext public key.</p>

<p>If you'd like to receive PGP encrypted messages, you must first learn the fundamentals of PGP and how to generate and handle your own keypair.</p>
