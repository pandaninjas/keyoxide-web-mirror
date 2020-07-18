<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>WKD Local Part</h1>
    <form id="form-util-wkd" method="post">
        <p>This tool computes the part of the URL that corresponds to the username when <a href="https://keyoxide.org/guides/web-key-directory">uploading keys using web key directory</a>.</p>
        <h3>Input</h3>
        <input type="text" name="input" id="input" placeholder="Username">
        <h3>Output</h3>
        <input type="text" name="output" id="output" placeholder="Waiting for input..." readonly>
    </form>
</div>
