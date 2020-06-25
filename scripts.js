async function verifySignature(opts) {
    const elRes = document.body.querySelector("#result");
    const elResContent = document.body.querySelector("#resultContent");
    let feedback, signature, verified, publicKey, fp, lookupOpts, wkd, hkp, sig, userId, keyId, sigContent;

    elRes.innerHTML = "";
    elResContent.innerHTML = "";

    try {
        switch (opts.mode) {
            case "plaintext":
                publicKey = (await openpgp.key.readArmored(opts.input)).keys;
                break;

            case "wkd":
                wkd = new openpgp.WKD();
                lookupOpts = {
                    email: opts.input
                };
                publicKey = (await wkd.lookup(lookupOpts)).keys;
                break;

            case "hkp":
                if (!opts.server) {opts.server = "https://keys.openpgp.org/"};
                hkp = new openpgp.HKP(opts.server);
                lookupOpts = {
                    query: opts.input
                };
                publicKey = await hkp.lookup(lookupOpts);
                publicKey = (await openpgp.key.readArmored(publicKey)).keys;
                break;

            default:
                sig = (await openpgp.signature.readArmored(opts.signature));
                if ('compressed' in sig.packets[0]) {
                    sig = sig.packets[0];
                    sigContent = (await openpgp.stream.readToEnd(await sig.packets[1].getText()));
                };
                keyId = (await sig.packets[0].issuerKeyId.toHex());
                userId = sig.packets[0].signersUserId;

                if (!keyId && !userId) {
                    elRes.innerHTML = "The signature does not contain a valid keyId or userId.";
                    elRes.classList.remove('green');
                    elRes.classList.add('red');
                    return;
                }

                if (!opts.server) {opts.server = "https://keys.openpgp.org/"};
                hkp = new openpgp.HKP(opts.server);
                lookupOpts = {
                    query: userId ? userId : keyId
                };
                publicKey = await hkp.lookup(lookupOpts);
                publicKey = (await openpgp.key.readArmored(publicKey)).keys;
                break;
        }

        if (opts.signature == null) {
            elRes.innerHTML = "No signature was provided.";
            elRes.classList.remove('green');
            elRes.classList.add('red');
            return;
        }

        let readError = null;
        try {
            signature = await openpgp.message.readArmored(opts.signature);
        } catch(e) {
            readError = e;
        }
        try {
            signature = await openpgp.cleartext.readArmored(opts.signature);
        } catch(e) {
            readError = e;
        }
        if (signature == null) {throw(readError)};

        fp = publicKey[0].getFingerprint();
        verified = await openpgp.verify({
            message: signature,
            publicKeys: publicKey
        });
    } catch (e) {
        console.error(e);
        elRes.innerHTML = e;
        elRes.classList.remove('green');
        elRes.classList.add('red');
        return;
    }

    feedback = '';
    const valid = verified.signatures[0];

    if (sigContent) {
        elResContent.innerHTML = "<strong>Signature content:</strong><br><span style=\"white-space: pre-line\">"+sigContent+"</span>";
    }

    if (userId) {
        if (valid) {
            feedback += "The message was signed by the userId extracted from the signature.<br>";
            feedback += 'UserId: '+userId+'<br>';
            feedback += "Fingerprint: "+fp+"<br>";
            elRes.classList.remove('red');
            elRes.classList.add('green');
        } else {
            feedback += "The message's signature COULD NOT BE verified using the userId extracted from the signature.<br>";
            elRes.classList.remove('green');
            elRes.classList.add('red');
        }
    } else if (keyId) {
        if (valid) {
            feedback += "The message was signed by the keyId extracted from the signature.<br>";
            feedback += 'KeyID: '+keyId+'<br>';
            feedback += "Fingerprint: "+fp+"<br><br>";
            feedback += "!!! You should manually verify the fingerprint to confirm the signer's identity !!!";
            elRes.classList.remove('red');
            elRes.classList.add('green');
        } else {
            feedback += "The message's signature COULD NOT BE verified using the keyId extracted from the signature.<br>";
            elRes.classList.remove('green');
            elRes.classList.add('red');
        }
    } else {
        if (valid) {
            feedback += "The message was signed by the provided key ("+opts.mode+").<br>";
            feedback += "Fingerprint: "+fp+"<br>";
            elRes.classList.remove('red');
            elRes.classList.add('green');
        } else {
            feedback += "The message's signature COULD NOT BE verified using the provided key ("+opts.mode+").<br>";
            elRes.classList.remove('green');
            elRes.classList.add('red');
        }
    }

    elRes.innerHTML = feedback;
};

async function encryptMessage(opts) {
    const elEnc = document.body.querySelector("#messageEncrypted");
    const elRes = document.body.querySelector("#result");
    let feedback, message, verified, publicKey, fp, lookupOpts, wkd, hkp, sig, userId, keyId, sigContent;

    elRes.innerHTML = "";
    elEnc.value = "";

    try {
        switch (opts.mode) {
            case "plaintext":
                publicKey = (await openpgp.key.readArmored(opts.input)).keys;
                break;

            case "wkd":
                wkd = new openpgp.WKD();
                lookupOpts = {
                    email: opts.input
                };
                publicKey = (await wkd.lookup(lookupOpts)).keys;
                break;

            case "hkp":
                if (!opts.server) {opts.server = "https://keys.openpgp.org/"};
                hkp = new openpgp.HKP(opts.server);
                lookupOpts = {
                    query: opts.input
                };
                publicKey = await hkp.lookup(lookupOpts);
                publicKey = (await openpgp.key.readArmored(publicKey)).keys;
                break;

            default:
                sig = (await openpgp.signature.readArmored(opts.message));
                if ('compressed' in sig.packets[0]) {
                    sig = sig.packets[0];
                    sigContent = (await openpgp.stream.readToEnd(await sig.packets[1].getText()));
                };
                keyId = (await sig.packets[0].issuerKeyId.toHex());
                userId = sig.packets[0].signersUserId;

                if (!keyId && !userId) {
                    elRes.innerHTML = "The signature does not contain a valid keyId or userId.";
                    elRes.classList.remove('green');
                    elRes.classList.add('red');
                    return;
                }

                if (!opts.server) {opts.server = "https://keys.openpgp.org/"};
                hkp = new openpgp.HKP(opts.server);
                lookupOpts = {
                    query: userId ? userId : keyId
                };
                publicKey = await hkp.lookup(lookupOpts);
                publicKey = (await openpgp.key.readArmored(publicKey)).keys;
                break;
        }

        if (opts.message == null) {
            elRes.innerHTML = "No message was provided.";
            elRes.classList.remove('green');
            elRes.classList.add('red');
            return;
        }

        encrypted = await openpgp.encrypt({
            message: openpgp.message.fromText(opts.message),
            publicKeys: publicKey
        });
    } catch (e) {
        console.error(e);
        elRes.innerHTML = e;
        elRes.classList.remove('green');
        elRes.classList.add('red');
        return;
    }

    elEnc.value = encrypted.data;
};

let elFormVerify = document.body.querySelector("#form-verify"),
    elFormEncrypt = document.body.querySelector("#form-encrypt");

if (elFormVerify) {
    elFormVerify.onsubmit = function (evt) {
        evt.preventDefault();

        let opts = {
            signature: null,
            mode: null,
            input: null,
            server: null,
        };

        opts.signature = document.body.querySelector("#signature").value;

        if (document.body.querySelector("#publicKey").value != "") {
            opts.input = document.body.querySelector("#publicKey").value;
            opts.mode = "plaintext";
        } else if (document.body.querySelector("#wkd").value != "") {
            opts.input = document.body.querySelector("#wkd").value;
            opts.mode = "wkd";
        } else if (document.body.querySelector("#hkp_input").value != "") {
            opts.input = document.body.querySelector("#hkp_input").value;
            opts.server =  document.body.querySelector("#hkp_server").value;
            opts.mode = "hkp";
        }
        verifySignature(opts);
    };
}

if (elFormEncrypt) {
    elFormEncrypt.onsubmit = function (evt) {
        evt.preventDefault();

        let opts = {
            message: null,
            mode: null,
            input: null,
            server: null,
        };

        opts.message = document.body.querySelector("#message").value;

        if (document.body.querySelector("#publicKey").value != "") {
            opts.input = document.body.querySelector("#publicKey").value;
            opts.mode = "plaintext";
        } else if (document.body.querySelector("#wkd").value != "") {
            opts.input = document.body.querySelector("#wkd").value;
            opts.mode = "wkd";
        } else if (document.body.querySelector("#hkp_input").value != "") {
            opts.input = document.body.querySelector("#hkp_input").value;
            opts.server =  document.body.querySelector("#hkp_server").value;
            opts.mode = "hkp";
        }
        encryptMessage(opts);
    };
}
