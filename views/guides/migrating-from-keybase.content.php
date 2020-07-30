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
<p>Let's see how easy it is to get a Keyoxide profile when you already have a Keybase account.</p>

<h3>Claim your Keyoxide profile</h3>

<p>Go to the <a href="/util/profile-url">profile URL generator</a>, set Keybase as Source and follow the Keybase specific instructions. Has a profile URL been generated? Congratulations, you now have your very own Keyoxide profile!</p>

<h3>Actually migrating to Keyoxide</h3>

<p>Unfortunately, you get very little control when using your Keybase key directly. You will need to generate your own PGP keypair (use guides like <a href="https://spin.atomicobject.com/2013/11/24/secure-gpg-keys-guide/">this one</a> for help) to unlock the full potential of <a href="/guides/proofs">distributed identity proofs</a>.</p>

<p>Have you generated a keypair and made the public key accessible through <a href="/guides/web-key-directory">web key directory (WKD)</a> or uploaded it to <a href="https://keys.openpgp.org/">keys.openpgp.org</a>? Use the <a href="/util/profile-url">profile URL generator</a> to get your own profile URL and <a href="/guides">start adding identity proofs</a>.</p>

<h3>Keyoxide as a partial replacement for Keybase</h3>

<p>It's important to moderate expectations and state that <a href="/">Keyoxide</a> only replaces the subset of Keybase features that are considered the "core" features: message encryption, signature verification and identity proofs.</p>

<p>Message decryption and signing are <strong>not</strong> supported features: they would require you to upload your secret key to a website which is a big <strong>no-no</strong>.</p>

<p>Encrypted chat and cloud storage are <strong>not</strong> supported features: there are plenty of dedicated alternative services.</p>

<p>If you need any of these Keybase-specific supports, <a href="/">Keyoxide</a> may not be a full Keybase replacement for you but you could still generate a profile and take advantage of <strong>distributed identity proofs</strong>.</p>
