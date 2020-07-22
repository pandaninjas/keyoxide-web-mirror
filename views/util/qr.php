<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>QR Code</h1>
    <form id="form-util-qr" method="post">
        <input type="txt" name="input" id="input" class="full-width" readonly placeholder="Fingerprint" value="<?=$this->escape($input)?>">
    </form>
    <div id="qrcode"></div>
    <a id="qrcode--altLink" href="#">Press this link to directly open the URI</a>
</div>
