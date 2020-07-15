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
                <a href="/" class="logo"><img src="/assets/img/logo.png" alt="Keyoxide logo"></a>
                <div class="spacer"></div>
                <nav>
                    <a href="/verify">verify</a>
                    <a href="/encrypt">encrypt</a>
                    <a href="/proofs">proofs</a>
                </nav>
            </div>
        </header>

        <div class="container">
            <?=$this->section('content')?>

            <footer>
                <p>
                    Sitemap:
                    <a href="/">index</a> -
                    <a href="/encrypt">encrypt</a> -
                    <a href="/verify">verify</a> -
                    <a href="/proofs">proofs</a> -
                    <a href="/guides">guides</a> -
                    <a href="/faq">faq</a>
                </p>
            </footer>
        </div>

    </body>
    <script src="/assets/openpgp.min.js"></script>
    <script src="/assets/spark-md5.min.js"></script>
    <script src="/assets/qrcode.min.js"></script>
    <script type="text/javascript" src="/assets/scripts.js" charset="utf-8"></script>
</html>
