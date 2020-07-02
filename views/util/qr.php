<?php $this->layout('template.base', ['title' => $title]) ?>

<h1>QR Code</h1>
<div class="content">
    <form id="form-util-qr" method="post">
        <h3>Fingeprint</h3>
        <input type="text" name="input" id="input" placeholder="Fingerprint" value="<?=$this->escape($input)?>">
        <div id="qrcode"></div>
    </form>
</div>
