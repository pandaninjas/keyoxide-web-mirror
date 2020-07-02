<?php $this->layout('template.base', ['title' => $title]) ?>

<h1><?=$this->escape($guide_title)?></h1>
<div class="content">
    <p><a href='/guides'>Back to guides</a></p>
    <?=$guide_content?>
</div>
