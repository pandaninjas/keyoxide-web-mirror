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
                    <!-- <a href="/verify">verify</a>
                    <a href="/encrypt">encrypt</a>
                    <a href="/proofs">proofs</a> -->
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
