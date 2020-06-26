async function verifySignature(opts) {
    // Init
    const elRes = document.body.querySelector("#result");
    const elResContent = document.body.querySelector("#resultContent");
    let keyData, feedback, signature, verified, valid;

    // Reset feedback
    elRes.innerHTML = "";
    elResContent.innerHTML = "";

    try {
        // Get key data
        keyData = await fetchKeys(opts);

        // Handle missing signature
        if (opts.signature == null) { throw("No signature was provided."); }

        // Try two different methods of signature reading
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
        if (signature == null) { throw(readError) };

        // Verify the signature
        verified = await openpgp.verify({
            message: signature,
            publicKeys: keyData.publicKey
        });
        valid = verified.signatures[0].valid;
    } catch (e) {
        console.error(e);
        elRes.innerHTML = e;
        elRes.classList.remove('green');
        elRes.classList.add('red');
        return;
    }

    // Init feedback to empty string
    feedback = '';

    // If content was extracted from signature
    if (keyData.sigContent) {
        elResContent.innerHTML = "<strong>Signature content:</strong><br><span style=\"white-space: pre-line\">"+sigContent+"</span>";
    }

    // Provide different feedback depending on key input mode
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

    // Display feedback
    elRes.innerHTML = feedback;
};

async function encryptMessage(opts) {
    // Init
    const elEnc = document.body.querySelector("#messageEncrypted");
    const elRes = document.body.querySelector("#result");
    let keyData, feedback, message, encrypted;

    // Reset feedback
    elRes.innerHTML = "";
    elEnc.value = "";

    try {
        // Get key data
        keyData = await fetchKeys(opts);

        // Handle missing message
        if (opts.message == null) {
            throw("No message was provided.");
        }

        // Encrypt the message
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

    // Display encrypted data
    elEnc.value = encrypted.data;
};

async function verifyProofs(opts) {
    // Init
    const elRes = document.body.querySelector("#result");
    let keyData, feedback = "", message, encrypted;

    // Reset feedback
    elRes.innerHTML = "";

    try {
        // Get key data
        keyData = await fetchKeys(opts);
    } catch (e) {
        console.error(e);
        elRes.innerHTML = e;
        elRes.classList.remove('green');
        elRes.classList.add('red');
        return;
    }

    let notation, isVerified, verifications = [];
    for (var i = 0; i < keyData.notations.length; i++) {
        notation = keyData.notations[i];
        if (!(notation[0] == "proof@keyoxide.org" || notation[0] == "proof@metacode.biz")) { continue; }
        verifications.push(await verifyProof(notation[1], keyData.fingerprint));
    }

    // Generate feedback
    for (var i = 0; i < verifications.length; i++) {
        feedback += `${verifications[i].type}: <a href="${verifications[i].url}">${verifications[i].display}</a>: ${verifications[i].isVerified}<br>`;
    }

    // Display feedback
    elRes.innerHTML = feedback;
}

async function displayProfile(opts) {
    let keyData = await fetchKeys(opts);
    let userData = keyData.user.user.userId;
    let feedback = "", notation, isVerified, verifications = [];

    document.body.querySelector('#profileName').innerHTML = userData.name;

    for (var i = 0; i < keyData.notations.length; i++) {
        notation = keyData.notations[i];
        if (!(notation[0] == "proof@keyoxide.org" || notation[0] == "proof@metacode.biz")) { continue; }
        verifications.push(await verifyProof(notation[1], keyData.fingerprint));
    }

    // Generate feedback
    feedback += `<div class="profileDataItem profileDataItem--separator">`;
    feedback += `<div class="profileDataItem__label"></div>`;
    feedback += `<div class="profileDataItem__value">general information</div>`;
    feedback += `</div>`;
    feedback += `<div class="profileDataItem">`;
    feedback += `<div class="profileDataItem__label">email</div>`;
    feedback += `<div class="profileDataItem__value"><a href="mailto:${userData.email}">${userData.email}</a></div>`;
    feedback += `</div>`;
    feedback += `<div class="profileDataItem">`;
    feedback += `<div class="profileDataItem__label">fingerprint</div>`;
    feedback += `<div class="profileDataItem__value"><a href="https://keys.openpgp.org/pks/lookup?op=get&options=mr&search=0x${keyData.fingerprint}">${keyData.fingerprint}</a></div>`;
    feedback += `</div>`;

    feedback += `<div class="profileDataItem profileDataItem--separator">`;
    feedback += `<div class="profileDataItem__label"></div>`;
    feedback += `<div class="profileDataItem__value">proofs</div>`;
    feedback += `</div>`;
    for (var i = 0; i < verifications.length; i++) {
        // feedback += `${verifications[i].type}: <a href="${verifications[i].url}">${verifications[i].display}</a>: ${verifications[i].isVerified}<br>`;
        feedback += `<div class="profileDataItem">`;
        feedback += `<div class="profileDataItem__label">${verifications[i].type}</div>`;
        feedback += `<div class="profileDataItem__value">`;
        feedback += `<a class="proofDisplay" href="${verifications[i].url}">${verifications[i].display}</a>`;
        if (verifications[i].isVerified) {
            feedback += `<a class="proofUrl proofUrl--verified" href="${verifications[i].proofUrl}">verified &#10004;</a>`;
        } else {
            feedback += `<a class="proofUrl" href="${verifications[i].proofUrl}">proof</a>`;
        }
        feedback += `</div>`;
        feedback += `</div>`;
    }

    // Display feedback
    document.body.querySelector('#profileData').innerHTML = feedback;
}

async function verifyProof(url, fingerprint) {
    // Init
    let reVerify, output = {url: url, type: null, proofUrl: url, proofUrlFetch: null, isVerified: false, display: null};

    // DNS
    if (/^dns:/.test(url)) {
        output.type = "website";
        output.display = url.replace(/dns:/, '').replace(/\?type=TXT/, '');
        output.proofUrlFetch = `https://dns.google.com/resolve?name=${output.display}&type=TXT`;
        output.url = `https://${output.display}`;

        try {
            response = await fetch(output.proofUrlFetch, {
                headers: {
                    Accept: 'application/json'
                },
                credentials: 'omit'
            });
            if (!response.ok) {
                throw new Error('Response failed: ' + response.status);
            }
            json = await response.json();
            reVerify = new RegExp(`openpgp4fpr:${fingerprint}`);
            json.Answer.forEach((item, i) => {
                if (reVerify.test(item.data)) {
                    output.isVerified = true;
                }
            });
        } catch (e) {
        } finally {
            return output;
        }
    }
    // HN
    if (/^https:\/\/news.ycombinator.com/.test(url)) {
        output.type = "hn";
        output.display = url.replace(/https:\/\/news.ycombinator.com\/user\?id=/, "");
        output.proofUrlFetch = `https://hacker-news.firebaseio.com/v0/user/${output.display}.json`;
        try {
            response = await fetch(output.proofUrlFetch, {
                headers: {
                    Accept: 'application/json'
                },
                credentials: 'omit'
            });
            if (!response.ok) {
                throw new Error('Response failed: ' + response.status);
            }
            json = await response.json();
            reVerify = new RegExp(`openpgp4fpr:${fingerprint}`);
            if (reVerify.test(json.about)) {
                output.isVerified = true;
            }
        } catch (e) {
        } finally {
            return output;
        }
    }
    // Reddit
    if (/^https:\/\/www.reddit.com\/user/.test(url)) {
        output.type = "reddit";
        output.display = url.replace(/^https:\/\/www.reddit.com\/user\//, "").replace(/\/comments\/.*/, "");
        output.url = `https://www.reddit.com/user/${output.display}`;
        output.proofUrlFetch = url.replace(/\/[a-zA-Z0-9_]*\/$/, ".json");
        try {
            response = await fetch(output.proofUrlFetch, {
                headers: {
                    Accept: 'application/json'
                },
                credentials: 'omit'
            });
            if (!response.ok) {
                throw new Error('Response failed: ' + response.status);
            }
            json = await response.json();
            console.log(json);
            reVerify = new RegExp(`Verifying my OpenPGP key: openpgp4fpr:${fingerprint}`);
            json.Answer.forEach((item, i) => {
                if (reVerify.test(item.data)) {
                    output.isVerified = true;
                }
            });
        } catch (e) {
        } finally {
            return output;
        }
    }
    // Github
    if (/^https:\/\/gist.github.com/.test(url)) {
        output.type = "github";
        output.display = url.replace(/^https:\/\/gist.github.com\//, "").replace(/\/[a-zA-Z0-9]*$/, "");
        output.url = `https://github.com/${output.display}`;
        let gistId = url.replace(/^https:\/\/gist.github.com\/[a-zA-Z0-9_-]*\//, "");
        output.proofUrlFetch = `https://api.github.com/gists/${gistId}`;
        try {
            response = await fetch(output.proofUrlFetch, {
                headers: {
                    Accept: 'application/json'
                },
                credentials: 'omit'
            });
            if (!response.ok) {
                throw new Error('Response failed: ' + response.status);
            }
            json = await response.json();
            reVerify = new RegExp(`[Verifying my OpenPGP key: openpgp4fpr:${fingerprint}]`);
            if (reVerify.test(json.files["openpgp.md"].content)) {
                output.isVerified = true;
            }
        } catch (e) {
        } finally {
            return output;
        }
    }
    // Catchall
    try {
        response = await fetch(url, {
            headers: {
                Accept: 'application/json'
            },
            credentials: 'omit'
        });
        if (!response.ok) {
            throw new Error('Response failed: ' + response.status);
        }
        json = await response.json();
        if ('attachment' in json) {
            // Potentially Mastodon
            json.attachment.forEach((item, i) => {
                if (item.value === fingerprint) {
                    output.type = "mastodon";
                    output.display = json.url;
                    output.proofUrlFetch = json.url;
                    output.isVerified = true;
                }
            });
        }
    } catch (e) {
    } finally {
        return output;
    }
}

async function fetchKeys(opts) {
    // Init
    let lookupOpts, wkd, hkd, sig, lastPrimarySig;
    let output = {
        publicKey: null,
        user: null,
        notations: null,
        sigKeyId: null,
        sigUserId: null,
        sigContent: null
    };

    // Fetch keys depending on the input mode
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

    // Gather more data about the primary key and user
    output.fingerprint = await output.publicKey.primaryKey.getFingerprint();
    output.user = await output.publicKey.getPrimaryUser();
    lastPrimarySig = output.user.selfCertification;
    output.notations = lastPrimarySig.notations || [];

    return output;
}

// General purpose
let elFormVerify = document.body.querySelector("#form-verify"),
    elFormEncrypt = document.body.querySelector("#form-encrypt"),
    elFormProofs = document.body.querySelector("#form-proofs"),
    elProfileUid = document.body.querySelector("#profileUid");

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

if (elFormProofs) {
    elFormProofs.onsubmit = function (evt) {
        evt.preventDefault();

        let opts = {
            mode: null,
            input: null,
            server: null,
        };

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
            opts.mode = null;
        }
        verifyProofs(opts);
    };
}

if (elProfileUid) {
    let profileUid = elProfileUid.innerHTML;
    let opts = {
        input: profileUid,
        mode: "hkp"
    }
    displayProfile(opts);
}
