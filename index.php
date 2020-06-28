<?php

include_once __DIR__ . '/vendor/autoload.php';
use Pagerange\Markdown\MetaParsedown;
include_once 'server/functions.php';

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
$router->map('GET', '/verify/hkp/[:uid]', function() {}, 'verifyHKP');
$router->map('GET', '/encrypt/hkp/[:uid]', function() {}, 'encryptHKP');
$router->map('GET', '/proofs/hkp/[:uid]', function() {}, 'proofsHKP');
$router->map('GET', '/verify/wkd/[:uid]', function() {}, 'verifyWKD');
$router->map('GET', '/encrypt/wkd/[:uid]', function() {}, 'encryptWKD');
$router->map('GET', '/proofs/wkd/[:uid]', function() {}, 'proofsWKD');
$router->map('GET', '/guides', function() {}, 'guides');
$router->map('GET', '/guides/[:id]', function() {}, 'guideId');
$router->map('GET', '/faq', function() {}, 'faq');
$router->map('GET', '/[:uid]', function() {}, 'profile');

// Router matching
$match = $router->match();

// Fix "escaped" email address
if (array_key_exists('uid', $match['params'])) {
    $match['params']['uid'] = str_lreplace('_', '.', $match['params']['uid']);
}

// Render the appropriate route
if(is_array($match) && is_callable($match['target'])) {
    switch ($match['name']) {
        case 'index':
            readfile('pages/index.html');
            break;

        case 'verify':
        case 'verifyUid':
        case 'verifyHKP':
            $content = file_get_contents('pages/verify.html');
            $content = str_replace('%HKP_UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ''), $content);
            $content = str_replace('%WKD_UID%', '', $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'verifyWKD':
            $content = file_get_contents('pages/verify.html');
            $content = str_replace('%HKP_UID%', '', $content);
            $content = str_replace('%WKD_UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ''), $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'encrypt':
        case 'encryptUid':
        case 'encryptHKP':
            $content = file_get_contents('pages/encrypt.html');
            $content = str_replace('%HKP_UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ''), $content);
            $content = str_replace('%WKD_UID%', '', $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'encryptWKD':
            $content = file_get_contents('pages/encrypt.html');
            $content = str_replace('%HKP_UID%', '', $content);
            $content = str_replace('%WKD_UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ''), $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'proofs':
        case 'proofsUid':
        case 'proofsHKP':
            $content = file_get_contents('pages/proofs.html');
            $content = str_replace('%HKP_UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ''), $content);
            $content = str_replace('%WKD_UID%', '', $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'proofsWKD':
            $content = file_get_contents('pages/proofs.html');
            $content = str_replace('%HKP_UID%', '', $content);
            $content = str_replace('%WKD_UID%', (array_key_exists('uid', $match['params']) ? $match['params']['uid'] : ''), $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'profile':
            $content = file_get_contents('pages/profile.html');
            $content = str_replace('%UID%', $match['params']['uid'], $content);
            header('Content-Type: text/html; charset=utf-8');
            echo($content);
            break;

        case 'guides':
            readfile('pages/guides.html');
            break;

        case 'guideId':
            $id = $match['params']['id'];
            $content = file_get_contents("pages/template.html");
            $guideTitle = file_get_contents("pages/guides/$id.title.html");
            $guideContent = file_get_contents("pages/guides/$id.content.html");
            $guideContent = "<p><a href='/guides'>Back to guides</a></p>".$guideContent;
            $content = str_replace('%TITLE%', $guideTitle, $content);
            $content = str_replace('%CONTENT%', $guideContent, $content);
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
