<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>QR Code</h1>
    <form id="form-util-qr" method="post">
        <p>This tool generates a QR code containing the fingerprint of your public key (<a href="https://github.com/open-keychain/open-keychain/wiki/QR-Codes">format</a>). This QR code can be scanned by apps like <a href="https://www.openkeychain.org/">OpenKeyChain</a>.</p>
        <h3>Fingerprint</h3>
        <input type="text" name="input" id="input" placeholder="Fingerprint" value="<?=$this->escape($input)?>">
        <div id="qrcode"></div>
    </form>
</div>
