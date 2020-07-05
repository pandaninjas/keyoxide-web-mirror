<?php $this->layout('template.base', ['title' => $title]) ?>

<h1>Profile URL</h1>
<div class="content">
    <form id="form-util-profile-url" method="post">
        <p>This tool generates an URL for your Keyoxide profile page.</p>
        <h3>Public key</h3>
        <label for="source">Source: </label>
        <select class="source" name="source" id="source">
            <option value="wkd">Web Key Directory</option>
            <option value="hkp">keys.openpgp.org</option>
            <option value="keybase">Keybase</option>
        </select>
        <br>
        <input type="text" name="input" id="input" placeholder="Input" value="">
        <h3>Profile URL</h3>
        <code id="output">Waiting for input...</code>
        <h3>Help</h3>
        <p>When using the <strong>Web Key Directory</strong> source, the <strong>Input</strong> looks like <strong>username@domain.org</strong>.</p>
        <p>When using the <strong>keys.openpgp.org</strong> source, the <strong>Input</strong> is either the <strong>fingerprint</strong> of your public key, or the main identity's <strong>email address</strong>.</p>
        <p>When using the <strong>Keybase</strong> source, the <strong>Input</strong> is the URL obtained by going to your Keybase profile page, clicking on the <strong>key id</strong> of your keypair and copying the URL of the <strong>this key</strong> link.</p>
    </form>
</div>
