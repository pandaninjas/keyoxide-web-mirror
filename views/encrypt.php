<!--
Copyright (C) 2020 Yarmo Mackenbach

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If your software can interact with users remotely through a computer network,
you should also make sure that it provides a way for users to get its source.
For example, if your program is a web application, its interface could display
a "Source" link that leads users to an archive of the code. There are many
ways you could offer source, and different solutions will be better for different
programs; see section 13 for the specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary. For
more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 -->
<?php $this->layout('template.base', ['title' => $title]) ?>

<div class="content">
    <h1>Encrypt</h1>
    <form id="form-encrypt" method="post">
        <h3>Recipient</h3>
        <label for="modeSelect">Mode: </label>
        <select class="modeSelect" name="modeSelect" id="modeSelect">
            <option value="auto" <?php if ($mode=="auto"): ?>selected<?php endif ?>>Autodetect</option>
            <option value="wkd" <?php if ($mode=="wkd"): ?>selected<?php endif ?>>Web Key Directory</option>
            <option value="hkp" <?php if ($mode=="hkp"): ?>selected<?php endif ?>>Keyserver</option>
            <option value="plaintext" <?php if ($mode=="plaintext"): ?>selected<?php endif ?>>Plaintext</option>
            <option value="keybase" <?php if ($mode=="keybase"): ?>selected<?php endif ?>>Keybase</option>
        </select>
        <div class="modesContainer">
            <div class='modes modes--auto <?php if ($mode=="auto"): ?>modes--visible<?php endif ?>'>
                <input type="text" name="auto_input" id="auto_input" placeholder="Email / key id / fingerprint" value="<?=$this->escape($auto_input)?>">
            </div>
            <div class='modes modes--wkd <?php if ($mode=="wkd"): ?>modes--visible<?php endif ?>'>
                <input type="text" name="wkd_input" id="wkd_input" placeholder="name@domain.org" value="<?=$this->escape($wkd_input)?>">
            </div>
            <div class='modes modes--hkp <?php if ($mode=="hkp"): ?>modes--visible<?php endif ?>'>
                <input type="text" name="hkp_input" id="hkp_input" placeholder="Email / key id / fingerprint" value="<?=$this->escape($hkp_input)?>">
                <input type="text" name="hkp_server" id="hkp_server" placeholder="https://keys.openpgp.org/ (default)">
            </div>
            <div class='modes modes--plaintext <?php if ($mode=="plaintext"): ?>modes--visible<?php endif ?>'>
                <textarea name="plaintext_input" id="plaintext_input"></textarea>
            </div>
            <div class='modes modes--keybase <?php if ($mode=="keybase"): ?>modes--visible<?php endif ?>'>
                <input type="text" name="keybase_username" id="keybase_username" placeholder="username" value="<?=$this->escape($keybase_username)?>">
                <input type="text" name="keybase_fingerprint" id="keybase_fingerprint" placeholder="fingerprint" value="<?=$this->escape($keybase_fingerprint)?>">
            </div>
        </div>
        <h3>Message</h3>
        <textarea name="message" id="message"></textarea>
        <p id="result"></p>
        <input type="submit" class="bigBtn" name="submit" value="ENCRYPT MESSAGE">
    </form>
</div>
