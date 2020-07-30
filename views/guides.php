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
    <h1>Guides</h1>

    <div class="guides">
        <div class="guides__section">
            <h3>Using Keyoxide</h3>
            <a href="/guides/verify">Verifying a signature</a><br>
            <a href="/guides/encrypt">Encrypting a message</a><br>
            <a href="/guides/proofs">Verifying identity proofs</a><br>
            <a href="/guides/contributing">Contributing to Keyoxide</a><br>
            <a href="/guides/self-hosting-keyoxide">Self-hosting Keyoxide</a><br>
        </div>

        <div class="guides__section">
            <h3>OpenPGP and identity proofs</h3>
            <a href="/guides/openpgp-proofs">How OpenPGP identity proofs work</a><br>
            <a href="/guides/web-key-directory">Uploading keys using web key directory</a><br>
        </div>

        <div class="guides__section">
            <h3>Adding proofs</h3>
            <a href="/guides/devto">Dev.to</a><br>
            <a href="/guides/discourse">Discourse</a><br>
            <a href="/guides/dns">Domain / DNS</a><br>
            <a href="/guides/github">Github</a><br>
            <a href="/guides/hackernews">Hackernews</a><br>
            <a href="/guides/lobsters">Lobste.rs</a><br>
            <a href="/guides/mastodon">Mastodon</a><br>
            <a href="/guides/pleroma">Pleroma</a><br>
            <a href="/guides/reddit">Reddit</a><br>
            <a href="/guides/twitter">Twitter</a><br>
            <a href="/guides/xmpp">XMPP+OMEMO</a><br>
        </div>

        <div class="guides__section">
            <h3>Other services</h3>
            <a href="/guides/feature-comparison-keybase">Feature comparison with Keybase</a><br>
            <a href="/guides/migrating-from-keybase">Migrating from Keybase</a><br>
        </div>

        <div class="guides__section">
            <h3>Managing proofs in GnuPG</h3>
            <a href="/guides/managing-proofs-listing">Listing proofs</a><br>
            <a href="/guides/managing-proofs-deleting">Deleting proofs</a><br>
        </div>
    </div>
</div>
