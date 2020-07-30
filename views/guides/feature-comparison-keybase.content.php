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
<p>Let's see how Keyoxide's features compare to those of Keybase.</p>

<h3>Encrypt and verify</h3>

<p>Both Keyoxide and Keybase allow easy encryption of data and verification of signatures. While Keybase can only perform these actions for their users who uploaded at least a public key to their servers, Keyoxide can do this for any key on the internet, whether it's available through web key directory, dedicated key servers or simply copy-pasting a plaintext key.</p>

<h3>Decrypt and sign</h3>

<p>Keyoxide cannot decrypt data or sign messages.</p>
<p>Keybase can do both of those things but this should NOT be considered a feature. It requires one to upload their private key to closed-source servers which is an act in stark contradiction with all safety precautions any owner of a private key should aim to heed.</p>

<h3>Online identity proofs</h3>

<p>Both Keyoxide and Keybase allow the user to generate proofs of online identity on various platforms. The difference lies in the method of generation and the implications this has on security.</p>

<p>Keybase generates a signed message to be posted by the to-be-verified account. Since this involves a signature, any signing key can be used. If a signing key gets misappropriated, it becomes easy for a bad actor to create fake identity proofs.</p>

<p>Keyoxide uses decentralized OpenPGP proofs in which the identity proofs are stored as notations within the keys themselves. This is only possible when you have access to keys with "certification" capability. As these are the most valuable of keys, they should also be handled more securely than signing keys and are therefore less prone to forgery of identity proofs.</p>

<h3>Social network and additional services</h3>

<p>Keybase provides an additional social network, chat functionality, encrypted drive, encrypted git, XLM crypto wallet and much more.</p>
<p>Keyoxide has none of that. Just keys and proofs.</p>

<h3>Openness</h3>

<p>Keyoxide is fully open-source. It consists mainly of a client component which is the browser. The supporting server functions are open-source as well.</p>
<p>Keybase has open-source clients but closed-source servers.</p>

<h3>Data safety</h3>

<p>Keyoxide lets the user's devices do almost all of the heavy lifting, meaning no data is ever sent to a server to perform any of the actions. Only exceptions to this rule are a couple of "proxy scripts" for proofs that cannot be verified by a browser. These proxy scripts are open-source as well and inspectable by all.</p>
<p>Keybase servers are closed-source. One does not know what happens inside that black box.</p>
