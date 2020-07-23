<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>Web Key Directory generator</h1>
    <form id="form-util-wkd" method="post">
        <p>This tool computes the part of the URL that corresponds to the username when <a href="https://keyoxide.org/guides/web-key-directory">uploading keys using web key directory</a>.</p>
        <h3>Input</h3>
        <input type="text" name="input" id="input" placeholder="WKD username or identifier">
        <h3>Output</h3>
        <h4>Local part</h4>
        <code class="full-width"id="output">Waiting for input...</code>
        <h4>Direct URL</h4>
        <code class="full-width"id="output_url_direct">Waiting for input...</code>
        <h4>Advanced URL</h4>
        <code class="full-width"id="output_url_advanced">Waiting for input...</code>
    </form>
</div>
