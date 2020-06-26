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
$router->map('GET', '/faq', function() {}, 'faq');

// Router matching
$match = $router->match();

// Render the appropriate route
if(is_array($match) && is_callable($match['target'])) {
    switch ($match['name']) {
        case 'index':
            readfile('pages/index.html');
            break;

        case 'verify':
            readfile('pages/verify.html');
            break;

        case 'encrypt':
            readfile('pages/encrypt.html');
            break;

        case 'proofs':
            readfile('pages/proofs.html');
            break;

        case 'faq':
            readfile('pages/faq.html');
            break;
    }
} else {
    // No route was matched
}
