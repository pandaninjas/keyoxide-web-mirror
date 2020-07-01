<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.png">
        <title>Encrypt - Keyoxide</title>
        <link rel="stylesheet" href="/assets/styles.css">
    </head>
    <body>
        <header>
            <div class="container">
                <a href="/">Keyoxide</a>
                <div class="spacer"></div>
                <nav>
                    <a href="/verify">verify</a>
                    <a href="/encrypt">encrypt</a>
                    <a href="/proofs">proofs</a>
                </nav>
            </div>
        </header>

        <div class="container">
            <h1>Encrypt</h1>
            <div class="content">
                <form id="form-encrypt" method="post">
                    <h3>Recipient</h3>
                    <label for="mode">Mode: </label>
                    <select class="mode" name="mode" id="mode">
                        <option value="auto" %MODE_AUTO%>Autodetect</option>
                        <option value="wkd" %MODE_WKD%>Web Key Directory</option>
                        <option value="hkp" %MODE_HKP%>Keyservers</option>
                        <option value="plaintext" %MODE_PT%>Plaintext</option>
                    </select>
                    <div class="modes modes--auto modes--hkp" style="display: none">
                        <input type="text" name="wkd" id="wkd" placeholder="Email / key id / fingerprint" value="%WKDUID%">
                    </div>
                    <div class="modes modes--auto modes--hkp" style="display: none">
                        <input type="text" name="wkd" id="wkd" placeholder="Email / key id / fingerprint" value="%WKDUID%">
                    </div>
                    <h3>Message</h3>
                    <textarea name="message" id="message"></textarea>
                    <!-- <h3>Public Key (1: plaintext)</h3>
                    <textarea name="publicKey" id="publicKey"></textarea>
                    <h3>Public Key (2: web key directory)</h3>
                    <input type="text" name="wkd" id="wkd" placeholder="name@domain.com" value="%WKD_UID%">
                    <h3>Public Key (3: HKP server)</h3>
                    <input type="text" name="hkp_server" id="hkp_server" placeholder="https://keys.openpgp.org/">
                    <input type="text" name="hkp_input" id="hkp_input" placeholder="Email / key id / fingerprint" value="%HKP_UID%"> -->
                    <!-- <h3>Result</h3>
                    <textarea name="messageEncrypted" id="messageEncrypted" readonly></textarea> -->
                    <p id="result"></p>
                    <input type="submit" class="bigBtn" name="submit" value="ENCRYPT MESSAGE">
                </form>
            </div>

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
    <script type="text/javascript" src="/assets/scripts.js" charset="utf-8"></script>
</html>
