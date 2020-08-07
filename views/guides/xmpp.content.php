<?php
// Copyright (C) 2020 Yarmo Mackenbach
// 
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
// details.
// 
// You should have received a copy of the GNU Affero General Public License along
// with this program. If not, see <https://www.gnu.org/licenses/>.
// 
// Also add information on how to contact you by electronic and paper mail.
// 
// If your software can interact with users remotely through a computer network,
// you should also make sure that it provides a way for users to get its source.
// For example, if your program is a web application, its interface could display
// a "Source" link that leads users to an archive of the code. There are many
// ways you could offer source, and different solutions will be better for different
// programs; see section 13 for the specific requirements.
// 
// You should also get your employer (if you work as a programmer) or school,
// if any, to sign a "copyright disclaimer" for the program, if necessary. For
// more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
?>
<p>Let's add a decentralized XMPP proof to your OpenPGP keys.</p>

<h3>Add a message to your XMPP vCard</h3>

<p>Using a XMPP client that supports editing the vCard (such as <a href="https://dino.im/">Dino</a> and <a href="https://gajim.org/">Gajim</a>), append the following message to the <strong>About</strong> section (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this XMPP account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

<h3>Update the PGP key (basic edition)</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>Add a new notation:</p>
<code>notation</code>

<p>Enter the notation (make sure to replace XMPP-ID):</p>
<code>proof@metacode.biz=xmpp:XMPP-ID</code>

<p>The XMPP-ID looks something like an email address: <strong>user@domain.org</strong>.</p>

<p>Save the key:</p>
<code>save</code>

<p>Upload the key to WKD or use the following command to upload the key to <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a XMPP account.</p>

<h3>Update the PGP key (OMEMO edition)</h3>

<p>XMPP communication can be end-to-end encrypted with <a href="https://conversations.im/omemo/">OMEMO</a>. Verifying OMEMO fingerprints is essential to trust your communication and keep it safe from Man-in-the-Middle attacks.</p>

<p><strong>Keyoxide</strong> makes the fingerprint verification process easy for all. Add a special identity proof that not only contains your XMPP-ID but also the fingerprints of all your OMEMO keys.</p>

<p>If your XMPP identity proof is verified, a QR code is shown. Anyone can scan this QR code using XMPP apps like <a href="https://conversations.im/">Conversations</a> (free on <a href="https://f-droid.org/en/packages/eu.siacs.conversations/">F-Droid</a>) to not only add you as a contact, but also verify your OMEMO keys with the highest level of trust.</p>

<p>Making this identity proof yourself can be a tad difficult when using clients like Gajim, but luckily for us, <a href="https://conversations.im/">Conversations</a> can directly generate the proof by going to <strong>Account details > Share > Share as XMPP URI</strong>. The resulting URI should look something like:</p>

<code>xmpp:user@domain.org?omemo-sid-123456789=A1B2C3D4E5F6G7H8I9...</code>

<p>To take advantage of the easy and secure XMPP identity proof including OMEMO fingerprints, follow the <strong>basic edition</strong> guide above but replace XMPP-ID with the URI obtained through the <strong>Conversations</strong> app.</p>
