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
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#fff">
        <link rel="shortcut icon" href="/favicon.svg">
        <title><?=$this->e($title)?>Keyoxide</title>
        <link rel="stylesheet" href="/assets/styles.css">
    </head>
    <body>
        <header>
            <div class="container">
                <a href="/" class="logo"><img src="/assets/img/logo_96.png" alt="Keyoxide logo"></a>
                <div class="spacer"></div>
                <nav>
                    <a href="/">about</a>
                    <a href="/guides">guides</a>
                    <a href="/faq">faq</a>
                </nav>
            </div>
        </header>

        <div class="container">
            <?=$this->section('content')?>

            <footer>
                <p>
                    <a href="https://codeberg.org/keyoxide">Source code</a> -
                    <a href="https://drone.keyoxide.org/keyoxide/web/">CI/CD</a> -
                    <a href="https://fosstodon.org/@keyoxide">Mastodon</a>
                </p>
                <p>&copy; 2020 Keyoxide contributors</p>
            </footer>
        </div>

    </body>
    <script src="/assets/openpgp.min.js"></script>
    <script src="/assets/qrcode.min.js"></script>
    <script type="text/javascript" src="/assets/scripts.js" charset="utf-8"></script>
</html>
