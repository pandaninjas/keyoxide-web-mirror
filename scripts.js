async function verifySignature(opts) {
    const elRes = document.body.querySelector("#result");
    const elResContent = document.body.querySelector("#resultContent");
    let keyData, feedback, signature, verified;

    elRes.innerHTML = "";
    elResContent.innerHTML = "";

    try {
        keyData = await fetchKeys(opts);

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

        verified = await openpgp.verify({
            message: signature,
            publicKeys: keyData.publicKey
        });
    } catch (e) {
        console.error(e);
        elRes.innerHTML = e;
        elRes.classList.remove('green');
        elRes.classList.add('red');
        return;
    }

    feedback = '';
    const { valid } = verified.signatures[0];

    if (keyData.sigContent) {
        elResContent.innerHTML = "<strong>Signature content:</strong><br><span style=\"white-space: pre-line\">"+sigContent+"</span>";
    }

    if (opts.mode == "signature" && keyData.sigUserId) {
        if (valid) {
            feedback += "The message was signed by the userId extracted from the signature.<br>";
            feedback += 'UserId: '+keyData.sigUserId+'<br>';
            feedback += "Fingerprint: "+keyData.fingerprint+"<br>";
            elRes.classList.remove('red');
            elRes.classList.add('green');
        } else {
            feedback += "The message's signature COULD NOT BE verified using the userId extracted from the signature.<br>";
            feedback += 'UserId: '+keyData.sigUserId+'<br>';
            elRes.classList.remove('green');
            elRes.classList.add('red');
        }
    } else if (opts.mode == "signature" && keyData.sigKeyId) {
        if (valid) {
            feedback += "The message was signed by the keyId extracted from the signature.<br>";
            feedback += 'KeyID: '+keyData.sigKeyId+'<br>';
            feedback += "Fingerprint: "+keyData.fingerprint+"<br><br>";
            feedback += "!!! You should manually verify the fingerprint to confirm the signer's identity !!!";
            elRes.classList.remove('red');
            elRes.classList.add('green');
        } else {
            feedback += "The message's signature COULD NOT BE verified using the keyId extracted from the signature.<br>";
            feedback += 'KeyID: '+keyData.sigKeyId+'<br>';
            elRes.classList.remove('green');
            elRes.classList.add('red');
        }
    } else {
        if (valid) {
            feedback += "The message was signed by the provided key ("+opts.mode+").<br>";
            feedback += "Fingerprint: "+keyData.fingerprint+"<br>";
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
    let keyData, feedback, message, encrypted;

    elRes.innerHTML = "";
    elEnc.value = "";

    try {
        keyData = await fetchKeys(opts);

        if (opts.message == null) {
            elRes.innerHTML = "No message was provided.";
            elRes.classList.remove('green');
            elRes.classList.add('red');
            return;
        }

        encrypted = await openpgp.encrypt({
            message: openpgp.message.fromText(opts.message),
            publicKeys: keyData.publicKey
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

async function fetchKeys(opts) {
    let lookupOpts, wkd, hkd, sig, lastPrimarySig;
    let output = {
        publicKey: null,
        user: null,
        notations: null,
        sigKeyId: null,
        sigUserId: null,
        sigContent: null
    };

    switch (opts.mode) {
        case "plaintext":
            output.publicKey = (await openpgp.key.readArmored(opts.input)).keys[0];

            if (!output.publicKey) {
                throw("Error: No public keys could be fetched from the plaintext input.");
            }
            break;

        case "wkd":
            wkd = new openpgp.WKD();
            lookupOpts = {
                email: opts.input
            };
            output.publicKey = (await wkd.lookup(lookupOpts)).keys[0];

            if (!output.publicKey) {
                throw("Error: No public keys could be fetched using WKD.");
            }
            break;

        case "hkp":
            if (!opts.server) {opts.server = "https://keys.openpgp.org/"};
            hkp = new openpgp.HKP(opts.server);
            lookupOpts = {
                query: opts.input
            };
            output.publicKey = await hkp.lookup(lookupOpts);
            output.publicKey = (await openpgp.key.readArmored(output.publicKey)).keys[0];

            if (!output.publicKey) {
                throw("Error: No public keys could be fetched from the HKP server.");
            }
            break;

        case "signature":
            sig = (await openpgp.signature.readArmored(opts.signature));
            if ('compressed' in sig.packets[0]) {
                sig = sig.packets[0];
                output.sigContent = (await openpgp.stream.readToEnd(await sig.packets[1].getText()));
            };
            output.sigUserId = sig.packets[0].signersUserId;
            output.sigKeyId = (await sig.packets[0].issuerKeyId.toHex());

            if (!opts.server) {opts.server = "https://keys.openpgp.org/"};
            hkp = new openpgp.HKP(opts.server);
            lookupOpts = {
                query: output.sigUserId ? output.sigUserId : output.sigKeyId
            };
            output.publicKey = await hkp.lookup(lookupOpts);
            output.publicKey = (await openpgp.key.readArmored(output.publicKey)).keys[0];

            if (!output.publicKey) {
                throw("Error: No public keys could be extracted from the signature.");
            }
            break;
    }

    output.fingerprint = output.publicKey.primaryKey.getFingerprint();
    output.user = await output.publicKey.getPrimaryUser();
    lastPrimarySig = output.user.selfCertification;
    output.notations = lastPrimarySig.notations || [];

    return output;
}

// General purpose
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
        } else {
            opts.mode = "signature";
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
        } else {
            opts.mode = "signature";
        }
        encryptMessage(opts);
    };
}
