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
<p>Let's add a decentralized Discourse proof to your OpenPGP keys.</p>

<h3>Update the Discourse account</h3>

<p>Log in to the discourse instance website and add the following text to your <strong>About me</strong> (make sure to replace FINGERPRINT):</p>
<code>This is an OpenPGP proof that connects my OpenPGP key to this Discourse account.
For details check out https://keyoxide.org/guides/openpgp-proofs
<br><br>[Verifying my OpenPGP key: openpgp4fpr:FINGERPRINT]</code>

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

<p>Upload the key to WKD or use the following command to upload the key to <a href="https://keys.openpgp.org">keys.openpgp.org</a> (make sure to replace FINGERPRINT):</p>
<code>gpg --keyserver hkps://keys.openpgp.org --send-keys FINGERPRINT</code>

<p>And you're done! Reload your profile page, it should now show a verified Discourse account.</p>
