<?php

include_once __DIR__ . '/vendor/autoload.php';
use Pagerange\Markdown\MetaParsedown;

// Init router
$router = new AltoRouter();

// Router mapping
$router->map('GET', '/', function() {}, 'index');
$router->map('GET', '/verify', function() {}, 'verify');
$router->map('GET', '/encrypt', function() {}, 'encrypt');
$router->map('GET', '/proofs', function() {}, 'proofs');
$router->map('GET', '/verify/[:uid]', function() {}, 'verifyUid');
$router->map('GET', '/encrypt/[:uid]', function() {}, 'encryptUid');
$router->map('GET', '/proofs/[:uid]', function() {}, 'proofsUid');
$router->map('GET', '/faq', function() {}, 'faq');
$router->map('GET', '/[:uid]', function() {}, 'profile');

// Router matching
$match = $router->match();

// Render the appropriate route
if(is_array($match) && is_callable($match['target'])) {
    switch ($match['name']) {
        case 'index':
            readfile('pages/index.html');
            break;

        case 'verify':
        case 'verifyUid':
            $content = file_get_contents('pages/verify.html');
            $content = str_replace('%UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ""), $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'encrypt':
        case 'encryptUid':
            $content = file_get_contents('pages/encrypt.html');
            $content = str_replace('%UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ""), $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'proofs':
        case 'proofsUid':
            $content = file_get_contents('pages/proofs.html');
            $content = str_replace('%UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ""), $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'profile':
            $content = file_get_contents('pages/profile.html');
            $content = str_replace('%UID%', $match['params']['uid'], $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'faq':
            readfile('pages/faq.html');
            break;
    }
} else {
    // No route was matched
}
