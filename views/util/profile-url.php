<?php
// Copyright (C) 2020 Yarmo Mackenbach
// 
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
// details.
// 
// You should have received a copy of the GNU Affero General Public License along
// with this program. If not, see <https://www.gnu.org/licenses/>.
// 
// Also add information on how to contact you by electronic and paper mail.
// 
// If your software can interact with users remotely through a computer network,
// you should also make sure that it provides a way for users to get its source.
// For example, if your program is a web application, its interface could display
// a "Source" link that leads users to an archive of the code. There are many
// ways you could offer source, and different solutions will be better for different
// programs; see section 13 for the specific requirements.
// 
// You should also get your employer (if you work as a programmer) or school,
// if any, to sign a "copyright disclaimer" for the program, if necessary. For
// more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
?>
<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>Profile URL</h1>
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
