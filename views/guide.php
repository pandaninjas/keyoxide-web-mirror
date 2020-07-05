<?php $this->layout('template.base', ['title' => $title]) ?>

<h1><?php $this->insert("guides/$id.title") ?></h1>
<div class="content">
    <p><a href='/guides'>Back to guides</a></p>
    <?php $this->insert("guides/$id.content") ?>
</div>
