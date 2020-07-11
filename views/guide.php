<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1><?php $this->insert("guides/$id.title") ?></h1>
    <p><a href='/guides'>Back to guides</a></p>
    <?php $this->insert("guides/$id.content") ?>
</div>
