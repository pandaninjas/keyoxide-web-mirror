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
<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>Keyoxide</h1>
    <p>A modern, secure and privacy-friendly platform to establish your <strong>decentralized online identity</strong> and perform <strong>basic cryptographic operations</strong>.</p>

    <div class="flex-column-container">
        <div class="flex-column">
            <h2>Cryptographic operations</h2>
            <p>
                <a href="/verify">Verify PGP signature</a><br>
                <a href="/encrypt">Encrypt PGP message</a><br>
                <a href="/proofs">Verify distributed identity proofs</a>
            </p>
        </div>

        <div class="flex-column">
            <h2>Utilities</h2>
            <p>
                <a href="/util/profile-url">Profile URL generator</a><br>
                <a href="/util/wkd">Web Key Directory URL generator</a><br>
                <a href="/util/qrfp">Fingerprint QR generator</a>
            </p>
        </div>
    </div>

    <h2>About</h2>
    <p><strong>Keyoxide</strong> allows you to link accounts on various online services and platforms together, prove they belong to you and establish an online identity. This puts <strong>you</strong>, the internet citizen, in charge when it comes to defining who you are on the internet instead of large corporations.</p>
    <p>As an example, here's the <a href="/9f0048ac0b23301e1f77e994909f6bd6f80f485d">developer's Keyoxide profile</a>.</p>
    <p>
        <strong>Keyoxide</strong> is developed by <a href="https://yarmo.eu">Yarmo Mackenbach</a>.
        The MIT-licensed code is hosted on <a href="https://codeberg.org/keyoxide/web">Codeberg</a>.
        It uses <a href="https://github.com/openpgpjs/openpgpjs">openpgp.js</a> (version <a href="https://github.com/openpgpjs/openpgpjs/releases/tag/v4.10.7">4.10.7</a>) for all cryptographic operations.
    </p>

    <h2>Features</h2>

    <h3>Decentralized online identity proofs</h3>
    <ul>
        <li>You decide which accounts are linked together</li>
        <li>You decide where this data is stored</li>
        <li>Keyoxide does not hold your identity data on its servers</li>
        <li>Keyoxide merely verifies the identity proofs and displays them</li>
    </ul>

    <h3>Empowering the internet citizen</h3>
    <ul>
        <li>A verified identity proof proves ownership of an account and builds trust</li>
        <li>No bad actor can impersonate you as long as your accounts aren't compromised</li>
        <li>Your online identity data is safe from greedy internet corporations</li>
    </ul>

    <h3>User-centric platform</h3>
    <ul>
        <li>Easily encrypt messages and verify signatures from the profile page</li>
        <li>Keyoxide generates QR codes that integrate with <a href="https://www.openkeychain.org/">OpenKeychain</a></li>
        <li>Keyoxide fetches the key wherever the used decides to store it</li>
        <li>Keyoxide is self-hostable, meaning you could put it on any server you trust</li>
    </ul>

    <h3>Secure and privacy-friendly</h3>
    <ul>
        <li>Keyoxide doesn't want your personal data, track you or show you ads</li>
        <li>You never give data to Keyoxide, it simply uses the data you have made public</li>
        <li>Keyoxide relies on OpenPGP, a widely used public-key cryptography standard (<a href="https://tools.ietf.org/html/rfc4880">RFC-4880</a>)</li>
        <li>Cryptographic operations are performed in-browser by <a href="https://openpgpjs.org/">OpenPGP.js</a>, a library maintained by <a href="https://protonmail.com/blog/openpgpjs-email-encryption/">ProtonMail</a></li>
    </ul>

    <h3>Free Open Source Software</h3>
    <ul>
        <li>Keyoxide is licensed under the permissive <a href="https://codeberg.org/keyoxide/web/src/branch/dev/LICENSE">MIT license</a></li>
        <li>The source code is hosted on <a href="https://codeberg.org/keyoxide/web">Codeberg.org</a></li>
        <li>Even the <a href="https://drone.keyoxide.org/keyoxide/web/">CI/CD activity</a> is publicly visible</li>
    </ul>

</div>
