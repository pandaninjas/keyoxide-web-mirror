<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>QR Code</h1>
    <form id="form-util-qr" method="post">
        <!-- <input type="txt" name="input" id="input" class="full-width" readonly value="<?=$this->escape($input)?>"> -->
        <!-- <textarea name="input" id="input" class="full-width" readonly><?=$this->escape($input)?></textarea> -->
        <code id="input" class="full-width"><?=$this->escape($input)?></code>
    </form>
    <div id="qrcode"></div>
    <a id="qrcode--altLink" href="#">Press this link to directly open the URI</a>
</div>
