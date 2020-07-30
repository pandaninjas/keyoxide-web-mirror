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
