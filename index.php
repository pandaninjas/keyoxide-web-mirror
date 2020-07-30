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
<?php

include_once __DIR__ . '/vendor/autoload.php';
use Pagerange\Markdown\MetaParsedown;
include_once 'server/functions.php';

// Init router
$router = new AltoRouter();

// Init templating
$templates = new League\Plates\Engine('views');

// Router mapping
$router->map('GET', '/', function() {}, 'index');
$router->map('GET', '/guides', function() {}, 'guides');
$router->map('GET', '/guides/[:id]', function() {}, 'guideId');
$router->map('GET', '/util/qrfp/[:fp]', function() {}, 'util_qrfp');
$router->map('GET', '/util/qr/[**:uri]', function() {}, 'util_qr');
$router->map('GET', '/util/[:id]', function() {}, 'util');
$router->map('GET', '/faq', function() {}, 'faq');
$router->map('GET', '/verify', function() {}, 'verify');
$router->map('GET', '/encrypt', function() {}, 'encrypt');
$router->map('GET', '/proofs', function() {}, 'proofs');
$router->map('GET', '/verify/hkp/[**:uid]', function() {}, 'verifyHKP');
$router->map('GET', '/verify/wkd/[**:uid]', function() {}, 'verifyWKD');
$router->map('GET', '/verify/keybase/[:uid]/[:fp]', function() {}, 'verifyKeybase');
$router->map('GET', '/verify/[**:uid]', function() {}, 'verifyAUTO');
$router->map('GET', '/encrypt/hkp/[**:uid]', function() {}, 'encryptHKP');
$router->map('GET', '/encrypt/wkd/[**:uid]', function() {}, 'encryptWKD');
$router->map('GET', '/encrypt/keybase/[:uid]/[:fp]', function() {}, 'encryptKeybase');
$router->map('GET', '/encrypt/[**:uid]', function() {}, 'encryptAUTO');
$router->map('GET', '/proofs/hkp/[**:uid]', function() {}, 'proofsHKP');
$router->map('GET', '/proofs/wkd/[**:uid]', function() {}, 'proofsWKD');
$router->map('GET', '/proofs/[**:uid]', function() {}, 'proofsAUTO');
$router->map('GET', '/hkp/[**:uid]', function() {}, 'profileHKP');
$router->map('GET', '/wkd/[**:uid]', function() {}, 'profileWKD');
$router->map('GET', '/keybase/[:uid]/[:fp]', function() {}, 'profileKeybase');
$router->map('GET', '/[**:uid]', function() {}, 'profile');

// Router matching
$match = $router->match();

// Render the appropriate route
if(is_array($match) && is_callable($match['target'])) {
    switch ($match['name']) {
        case 'index':
            echo $templates->render('index');
            break;

        case 'verify':
            echo $templates->render('verify', ['title' => 'Verify — ', 'mode' => 'auto']);
            break;

        case 'verifyAUTO':
            echo $templates->render('verify', ['title' => 'Verify — ', 'mode' => 'auto', 'auto_input' => $match['params']['uid']]);
            break;

        case 'verifyHKP':
            echo $templates->render('verify', ['title' => 'Verify — ', 'mode' => 'hkp', 'hkp_input' => $match['params']['uid']]);
            break;

        case 'verifyWKD':
            echo $templates->render('verify', ['title' => 'Verify — ', 'mode' => 'wkd', 'wkd_input' => $match['params']['uid']]);
            break;

        case 'verifyKeybase':
            echo $templates->render('verify', ['title' => 'Verify — ', 'mode' => 'keybase', 'keybase_username' => htmlspecialchars($match['params']['uid']), 'keybase_fingerprint' => htmlspecialchars($match['params']['fp'])]);
            break;

        case 'encrypt':
            echo $templates->render('encrypt', ['title' => 'Encrypt — ', 'mode' => 'auto']);
            break;

        case 'encryptAUTO':
            echo $templates->render('encrypt', ['title' => 'Encrypt — ', 'mode' => 'auto', 'auto_input' => $match['params']['uid']]);
            break;

        case 'encryptHKP':
            echo $templates->render('encrypt', ['title' => 'Encrypt — ', 'mode' => 'hkp', 'hkp_input' => $match['params']['uid']]);
            break;

        case 'encryptWKD':
            echo $templates->render('encrypt', ['title' => 'Encrypt — ', 'mode' => 'wkd', 'wkd_input' => $match['params']['uid']]);
            break;

        case 'encryptKeybase':
            echo $templates->render('encrypt', ['title' => 'Encrypt — ', 'mode' => 'keybase', 'keybase_username' => htmlspecialchars($match['params']['uid']), 'keybase_fingerprint' => htmlspecialchars($match['params']['fp'])]);
            break;

        case 'proofs':
            echo $templates->render('proofs', ['title' => 'Proofs — ', 'mode' => 'auto']);
            break;

        case 'proofsAUTO':
            echo $templates->render('proofs', ['title' => 'Proofs — ', 'mode' => 'auto', 'auto_input' => $match['params']['uid']]);
            break;

        case 'proofsHKP':
            echo $templates->render('proofs', ['title' => 'Proofs — ', 'mode' => 'hkp', 'hkp_input' => $match['params']['uid']]);
            break;

        case 'proofsWKD':
            echo $templates->render('proofs', ['title' => 'Proofs — ', 'mode' => 'wkd', 'wkd_input' => $match['params']['uid']]);
            break;

        case 'profile':
            echo $templates->render('profile', ['mode' => 'auto', 'uid' => htmlspecialchars($match['params']['uid'])]);
            break;

        case 'profileHKP':
            echo $templates->render('profile', ['mode' => 'hkp', 'uid' => htmlspecialchars($match['params']['uid'])]);
            break;

        case 'profileWKD':
            echo $templates->render('profile', ['mode' => 'wkd', 'uid' => htmlspecialchars($match['params']['uid'])]);
            break;

        case 'profileKeybase':
            echo $templates->render('profile', ['mode' => 'keybase', 'uid' => htmlspecialchars($match['params']['uid']).'/'.htmlspecialchars($match['params']['fp'])]);
            break;

        case 'guides':
            echo $templates->render('guides');
            break;

        case 'guideId':
            $id = htmlspecialchars($match['params']['id']);
            if (file_exists("views/guides/$id.title.php") && file_exists("views/guides/$id.content.php")) {
                echo $templates->render('guide', ['id' => $id]);
            } else {
                echo $templates->render("404");
            }
            break;

        case 'util':
            $id = htmlspecialchars($match['params']['id']);
            echo $templates->render("util/$id");
            break;

        case 'util_qrfp':
            $fp = htmlspecialchars($match['params']['fp']);
            echo $templates->render("util/qrfp", ['input' => $fp]);
            break;

        case 'util_qr':
            $uri = htmlspecialchars($match['params']['uri']);
            echo $templates->render("util/qr", ['input' => $uri]);
            break;

        case 'faq':
            echo $templates->render("faq");
            break;
    }
} else {
    // No route was matched
    echo $templates->render("404");
}
