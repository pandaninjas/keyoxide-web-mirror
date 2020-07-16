<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>Keyoxide</h1>
    <h2>PGP actions</h2>
    <p>
        <a class="bigBtn" href="/verify">verify signature</a>
        <a class="bigBtn" href="/encrypt">encrypt message</a>
        <a class="bigBtn" href="/proofs">verify proofs</a>
    </p>
    <h2>Utilities</h2>
    <p>
        <a class="bigBtn" href="/util/profile-url">Profile URL</a>
        <a class="bigBtn" href="/util/wkd">wkd</a>
        <a class="bigBtn" href="/util/qr">QR</a>
    </p>
    <h2>Getting started</h2>
    <p>
        <a class="bigBtn" href="/guides">guides</a>
        <a class="bigBtn" href="/faq">FAQ</a>
    </p>
    <h2>About</h2>
    <p><a href="/">Keyoxide</a> is a lightweight and FOSS solution to make basic cryptography operations accessible to regular humans.</p>
    <p>
        Made by <a href="https://yarmo.eu">Yarmo Mackenbach</a>.
        <br>
        Code hosted on <a href="https://codeberg.org/yarmo/keyoxide">Codeberg</a> (<a href="https://drone.private.foss.best/yarmo/keyoxide/">drone CI/CD</a>).
        <br>
        Uses <a href="https://github.com/openpgpjs/openpgpjs">openpgp.js</a> (version <a href="https://github.com/openpgpjs/openpgpjs/releases/tag/v4.10.4">4.10.6</a>).
    </p>
</div>
