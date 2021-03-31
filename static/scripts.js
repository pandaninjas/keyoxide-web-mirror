/*
Copyright (C) 2021 Yarmo Mackenbach

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If your software can interact with users remotely through a computer network,
you should also make sure that it provides a way for users to get its source.
For example, if your program is a web application, its interface could display
a "Source" link that leads users to an archive of the code. There are many
ways you could offer source, and different solutions will be better for different
programs; see section 13 for the specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary. For
more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
*/
async function verifySignature(opts) {
    // Init
    const elRes = document.body.querySelector("#result");
    const elResContent = document.body.querySelector("#resultContent");
    let keyData, feedback, signature, verified, valid;

    // Reset feedback
    elRes.innerHTML = "";
    elRes.classList.remove('green');
    elRes.classList.remove('red');
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
    const elEnc = document.body.querySelector("#message");
    const elRes = document.body.querySelector("#result");
    const elBtn = document.body.querySelector("[name='submit']");
    let keyData, feedback, message, encrypted;

    // Reset feedback
    elRes.innerHTML = "";
    elRes.classList.remove('green');
    elRes.classList.remove('red');

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
    elEnc.toggleAttribute("readonly");
    elBtn.setAttribute("disabled", "true");
};

async function displayProfile(opts) {
    /// UTILITY FUNCTIONS
    // Sort claims by name and filter for errors
    const sortClaims = (claims) => {
        claims = claims.filter((a) => (a && a.errors.length == 0 && a.serviceproviderData));
        claims = claims.sort((a,b) => (a.serviceproviderData.serviceprovider.name > b.serviceproviderData.serviceprovider.name) ? 1 : ((b.serviceproviderData.serviceprovider.name > a.serviceproviderData.serviceprovider.name) ? -1 : 0));
        return claims;
    }
    // Find the primary claims
    const getPrimaryClaims = (primaryUserId, userIds, verifications) => {
        let primaryClaims = null;
        userIds.forEach((userId, i) => {
            if (!primaryClaims && userId.userId && userId.userId.email === primaryUserId.email) {
                primaryClaims = sortClaims(verifications[i]);
            }
        });
        return primaryClaims;
    }
    // Generate a HTML string for the profile header
    const generateProfileHeaderHTML = (data) => {
        if (!data) {
            data = {
                profileHide: true,
                name: '',
                fingerprint: '',
                key: {
                    url: '',
                    mode: '',
                    server: '',
                    id: '',
                },
                avatarURL: '/static/img/avatar_placeholder.png',
            }
        }

        // TODO Add support for custom HKP server
        return `
            <div class="profile__avatar" style="${data.profileHide ? "display='none" : ''}">
                <a class="avatar" href="#">
                    <img id="profileAvatar" src="${data.avatarURL}" alt="avatar">
                </a>
            </div>
            <div class="profile__description" style="${data.profileHide ? "display='none" : ''}">
                <p id="profileName">${data.name}</p>
                <p id="profileURLFingerprint">
                    <a href="${data.key.url}">${data.fingerprint}</a>
                </p>
                <div class="buttons">
                    <a href="/encrypt/${data.key.mode}/${data.key.id}">Encrypt message</a>
                    <a href="/verify/${data.key.mode}/${data.key.id}">Verify signature</a>
                </div>
            </div>
        `;
    }
    // Generate a HTML string for each userId and associated claims
    const generateProfileUserIdHTML = (userId, claims, dialogIds, opts) => {
        // Init output
        let output = '';

        // Add claim header to output
        output += `<h2>${userId.email}${opts.isPrimary ? ' <small class="primary">primary</small>' : ''}</h2>`;

        // Handle claims identical to primary
        if ('isIdenticalToPrimary' in opts && opts.isIdenticalToPrimary) {

            output += `
                <div class="claim">
                    <div class="claim__main">
                        <div class="claim__description">
                            <p>Identical to primary claims</p>
                        </div>
                    </div>
                </div>
            `;
            return output;
        }

        // Handle "no claims"
        if (claims.length == 0) {
            output += `
                <div class="claim">
                    <div class="claim__main">
                        <div class="claim__description">
                            <p>No claims associated</p>
                        </div>
                    </div>
                </div>
            `;
            return output;
        }

        claims = sortClaims(claims);

        //  Generate output for each claim
        claims.forEach((claim, i) => {
            console.log(claim);
            const claimData = claim.serviceproviderData;
            if (!claimData.serviceprovider.name) {
                return;
            }

            output += `
                <div class="claim">
                    <div class="claim__main">
                        <div class="claim__description">
                            <p>${claimData.profile.display}</p>
                        </div>
                        <div class="claim__links">
                            <p>
                                <span>${capitalizeLetteredServices(claimData.serviceprovider.name)}</span>
                                <a href="${claimData.profile.uri}">View&nbsp;account</a>
                                <a href="${claimData.proof.uri}">View&nbsp;proof</a>
                                `;
            if (claimData.profile.qr) {
                output += `
                    <a href="/util/qr/${encodeURIComponent(claimData.profile.qr)}">View&nbsp;QR</a>
                `;
            }
            output += `
                                <button onClick="document.querySelector('#dialog--${dialogIds[i]}').showModal();">Details</button>
                            </p>
                        </div>
                    </div>
                    <div class="claim__verification claim__verification--${claim.isVerified ? "true" : "false"}">${claim.isVerified ? "✔" : "✕"}</div>
                </div>
            `;
        });

        return output;
    }
    // Generate a HTML string for each userId and associated claims
    const generateClaimDialogHTML = (claims, dialogIds) => {
        //  Generate dialog for each claim
        let output = '';

        claims.forEach((claim, i) => {
            const claimData = claim.serviceproviderData;
            output += `
                <dialog id="dialog--${dialogIds[i]}">
                    <div>
                        <p>
                            The claim's service provider is <strong>${claimData.serviceprovider.name}</strong>.
                        </p>
                        <p>
                            The claim points to: <a href="${claimData.profile.uri}">${claimData.profile.uri}</a>.
                        </p>
                        <p>
                            The supposed proof is located at: <a href="${claimData.proof.uri}">${claimData.proof.uri}</a>.
                        </p>
            `;
            if (claimData.proof.fetch) {
                output += `
                        <p class="warning">
                            Due to technical restraints, the machine had to fetch the proof from: <a href="${claimData.proof.fetch}">${claimData.proof.fetch}</a>. This link may not work for you.
                        </p>
                `;
            }
            if (claimData.customRequestHandler) {
                output += `
                        <p class="warning">
                            This claim's verification process was more complex than most verifications. The link(s) above may offer only limited insight into the verification process.
                        </p>
                `;
            }
            output += `
                        <p>
                            The claim <strong>${claim.isVerified ? 'has been' : 'could not be'} verified</strong> by this proof.
                        </p>
                `;
            if (claim.errors.length > 0) {
                output += `
                        <p class="warning">
                            The verification encountered errors: ${JSON.stringify(claim.errors)}.
                        </p>
                `;
            }
            output += `
                        <form method="dialog">
                            <input type="submit" value="Close" />
                        </form>
                    </div>
                </dialog>
            `;
        });

        return output;
    }

    /// MAIN
    // Init variables
    let keyData, keyLink, sigVerification, sigKeyUri, fingerprint, feedback = "", verifications = [];

    const doipOpts = {
        proxyPolicy: 'adaptive',
    }

    // Reset the avatar
    document.body.querySelector('#profileHeader').src = generateProfileHeaderHTML(null)

    if (opts.mode == 'sig') {
        try {
            sigVerification = await doip.signatures.verify(opts.input, doipOpts);
            keyData = sigVerification.publicKey.data;
            fingerprint = sigVerification.publicKey.fingerprint;
        } catch (e) {
            feedback += `<p>There was a problem reading the signature.</p>`;
            if ('errors' in e) {
                feedback += `<code>${e.errors.join(', ')}</code>`;
            } else {
                feedback += `<code>${e}</code>`;
            }
            document.body.querySelector('#profileData').innerHTML = feedback;
            document.body.querySelector('#profileName').innerHTML = "Could not load profile";
            return;
        }
    } else {
        try {
            let keyURI;
            if (opts.mode === 'hkp' && opts.server) {
                keyURI = `${opts.mode}:${opts.server}:${opts.input}`
            } else {
                keyURI = `${opts.mode}:${opts.input}`
            }
            keyData = await doip.keys.fetch.uri(keyURI);
            fingerprint = keyData.keyPacket.getFingerprint();
        } catch (e) {
            feedback += `<p>There was a problem fetching the keys.</p>`;
            feedback += `<code>${e}</code>`;
            document.body.querySelector('#profileData').innerHTML = feedback;
            document.body.querySelector('#profileName').innerHTML = "Could not load profile";
            return;
        }
    }

    // Get data of primary userId
    const userPrimary = await keyData.getPrimaryUser();
    const userData = userPrimary.user.userId;
    const userName = userData.name ? userData.name : userData.email;
    const userMail = userData.email ? userData.email : null;

    // TODO Get image from user attribute
    let imgUri = null;

    // Determine WKD or HKP link
    let keyUriMode = opts.mode;
    let keyUriServer = null;
    let keyUriId = opts.input;
    if (opts.mode === 'sig') {
        const keyUriMatch = sigVerification.publicKey.uri.match(/([^:]*)(?:\:(.*))?:(.*)/);
        keyUriMode = keyUriMatch[1];
        keyUriServer = keyUriMatch[2];
        keyUriId = keyUriMatch[3];
    }

    switch (keyUriMode) {
        case "wkd":
            const [, localPart, domain] = /(.*)@(.*)/.exec(keyUriId);
            const localEncoded = await computeWKDLocalPart(localPart.toLowerCase());
            const urlAdvanced = `https://openpgpkey.${domain}/.well-known/openpgpkey/${domain}/hu/${localEncoded}`;
            const urlDirect = `https://${domain}/.well-known/openpgpkey/hu/${localEncoded}`;

            try {
                keyLink = await fetch(urlAdvanced).then(function(response) {
                    if (response.status === 200) {
                        return urlAdvanced;
                    }
                });
            } catch (e) {
                console.warn(e);
            }
            if (!keyLink) {
                try {
                    keyLink = await fetch(urlDirect).then(function(response) {
                        if (response.status === 200) {
                            return urlDirect;
                        }
                    });
                } catch (e) {
                    console.warn(e);
                }
            }
            if (!keyLink) {
                keyLink = `https://${keyUriServer ? keyUriServer : 'keys.openpgp.org'}/pks/lookup?op=get&options=mr&search=0x${fingerprint}`;
            }
            break;

        case "hkp":
            keyLink = `https://${keyUriServer ? keyUriServer : 'keys.openpgp.org'}/pks/lookup?op=get&options=mr&search=0x${fingerprint}`;
            break;

        case "keybase":
            keyLink = opts.keyLink;
            break;
    }

    // Generate profile header
    const profileHash = openpgp.util.str_to_hex(openpgp.util.Uint8Array_to_str(await openpgp.crypto.hash.md5(openpgp.util.str_to_Uint8Array(userData.email))));
    document.body.querySelector('#profileHeader').innerHTML = generateProfileHeaderHTML({
        profileHide: false,
        name: userName,
        fingerprint: fingerprint,
        key: {
            url: keyLink,
            mode: keyUriMode,
            server: keyUriServer,
            id: keyUriId,
        },
        avatarURL: imgUri ? imgUri : `https://www.gravatar.com/avatar/${profileHash}?s=128&d=mm`
    })
    document.title = `${userName} - Keyoxide`;

    try {
        if (sigVerification) {
            verifications = sigVerification.claims
        } else {
            verifications = await doip.claims.verify(keyData, fingerprint, doipOpts)
        }
    } catch (e) {
        feedback += `<p>There was a problem verifying the claims.</p>`;
        feedback += `<code>${e}</code>`;
        document.body.querySelector('#profileData').innerHTML = feedback;
        document.body.querySelector('#profileName').innerHTML = "Could not load profile";
        return;
    }

    // Exit if no notations are available
    if (verifications.length == 0) {
        return;
    }

    let feedbackDialog = "";
    let dialogIds = null;
    feedback = "";

    if (opts.mode === 'sig') {
        const claims = sortClaims(verifications);

        dialogIds = new Uint32Array(claims.length);
        window.crypto.getRandomValues(dialogIds);

        feedback += generateProfileUserIdHTML(userData, claims, dialogIds, {isPrimary: false});
        feedbackDialog += generateClaimDialogHTML(claims, dialogIds);
    } else {
        const primaryClaims = getPrimaryClaims(userData, keyData.users, verifications);

        dialogIds = new Uint32Array(primaryClaims.length);
        window.crypto.getRandomValues(dialogIds);

        feedback += generateProfileUserIdHTML(userData, primaryClaims, dialogIds, {isPrimary: true});
        feedbackDialog += generateClaimDialogHTML(primaryClaims, dialogIds);

        keyData.users.forEach((user, i) => {
            if (!user.userId || userData.email && user.userId && user.userId.email === userData.email) {
                return;
            }

            const claims = sortClaims(verifications[i])
            const opts = {
                isPrimary: false,
                isIdenticaltoPrimary: primaryClaims && primaryClaims.toString() === claims.toString()
            }

            dialogIds = new Uint32Array(claims.length);
            window.crypto.getRandomValues(dialogIds);

            feedback += generateProfileUserIdHTML(user.userId, claims, dialogIds, opts);
            feedbackDialog += generateClaimDialogHTML(claims, dialogIds);
        })
    }

    feedback += `
        <dialog id="dialog--whatisthis">
            <div>
                <p>
                    Keyoxide allows anyone to prove that they have accounts on certain websites and, by doing so, establish an online identity. To guarantee the validity of these identity verifications and prevent impersonation, Keyoxide uses secure and well-known encryption paradigms. All claims are verified using bidirectional linking.
                </p>
                <p>
                    You are currently viewing someone's Keyoxide profile, including the verification results of their identity claims.
                </p>
                <p>
                    More detailed information is available on the <a href="/">What is Keyoxide</a> page.
                </p>
                <form method="dialog">
                    <input type="submit" value="Close" />
                </form>
            </div>
        </dialog>
        <dialog id="dialog--localverification">
            <div>
                <p>
                    The profile page you are currently viewing depends at least partially on a server you may not know, operated by someone you may not have reason to trust.
                </p>
                <p>
                    You can choose to perform the identity verification again, but this time completely locally, removing the need to trust unknown servers.
                </p>
                <p>
                    On linux/mac/windows, run:
                </p>
                <pre><code>keyoxide verify ${opts.mode}:${opts.input}</code></pre>
                <form method="dialog">
                    <input type="submit" value="Close" />
                </form>
            </div>
        </dialog>
        <p class="subtle-links">
            <button onclick="document.querySelector('#dialog--whatisthis').showModal()">What is this?</button>
            <button onclick="document.querySelector('#dialog--localverification').showModal()">Perform local verification</button>
        </p>`;

    // Display feedback
    document.body.querySelector('#profileProofs').innerHTML = feedback;
    if (feedbackDialog) {
        document.body.querySelector('#profileDialogs').innerHTML = feedbackDialog;
    }

    // Register modals
    document.querySelectorAll('dialog').forEach(function(d) {
        dialogPolyfill.registerDialog(d);
        d.addEventListener('click', function(ev) {
            if (ev && ev.target != d) {
                return;
            }
            d.close();
        });
    });
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

    // Autodetect mode
    if (opts.mode == "auto") {
        if (/.*@.*\..*/.test(opts.input)) {
            opts.mode = "wkd";
        } else {
            opts.mode = "hkp";
        }
    }

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

        case "keybase":
            opts.keyLink = `https://keybase.io/${opts.username}/pgp_keys.asc?fingerprint=${opts.fingerprint}`;
            opts.input = `${opts.username}/${opts.fingerprint}`;
            try {
                opts.plaintext = await fetch(opts.keyLink).then(function(response) {
                    if (response.status === 200) {
                        return response;
                    }
                })
                .then(response => response.text());
            } catch (e) {
                throw(`Error: No public keys could be fetched from the Keybase account (${e}).`);
            }
            output.publicKey = (await openpgp.key.readArmored(opts.plaintext)).keys[0];

            if (!output.publicKey) {
                throw("Error: No public keys could be read from the Keybase account.");
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

async function computeWKDLocalPart(message) {
    const data = openpgp.util.str_to_Uint8Array(message);
    const hash = await openpgp.crypto.hash.sha1(data);
    return openpgp.util.encodeZBase32(hash);
}

async function generateProfileURL(data) {
    let hostname = window.location.hostname;

    if (data.input == "") {
        return "Waiting for input...";
    }
    switch (data.source) {
        case "wkd":
            return `https://${hostname}/${data.input}`;
            break;
        case "hkp":
            if (/.*@.*\..*/.test(data.input)) {
                return `https://${hostname}/hkp/${data.input}`;
            } else {
                return `https://${hostname}/${data.input}`;
            }
            break;
        case "keybase":
            const re = /https\:\/\/keybase.io\/(.*)\/pgp_keys\.asc\?fingerprint\=(.*)/;
            if (!re.test(data.input)) {
                return "Incorrect Keybase public key URL.";
            }
            const match = data.input.match(re);
            return `https://${hostname}/keybase/${match[1]}/${match[2]}`;
            break;
    }
}

async function fetchWithTimeout(url, timeout = 3000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

// General purpose
let elFormVerify = document.body.querySelector("#form-verify"),
    elFormEncrypt = document.body.querySelector("#form-encrypt"),
    elFormProofs = document.body.querySelector("#form-proofs"),
    elFormSignatureProfile = document.body.querySelector("#form-generate-signature-profile"),
    elProfileUid = document.body.querySelector("#profileUid"),
    elProfileMode = document.body.querySelector("#profileMode"),
    elProfileServer = document.body.querySelector("#profileServer"),
    elModeSelect = document.body.querySelector("#modeSelect"),
    elUtilWKD = document.body.querySelector("#form-util-wkd"),
    elUtilQRFP = document.body.querySelector("#form-util-qrfp"),
    elUtilQR = document.body.querySelector("#form-util-qr"),
    elUtilProfileURL = document.body.querySelector("#form-util-profile-url");

if (elModeSelect) {
    elModeSelect.onchange = function (evt) {
        let elAllModes = document.body.querySelectorAll('.modes');
        elAllModes.forEach(function(el) {
            el.classList.remove('modes--visible');
        });
        document.body.querySelector(`.modes--${elModeSelect.value}`).classList.add('modes--visible');
    }
    elModeSelect.dispatchEvent(new Event("change"));
}

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
        opts.mode = document.body.querySelector("#modeSelect").value;

        switch (opts.mode) {
            default:
            case "auto":
                opts.input = document.body.querySelector("#auto_input").value;
                break;

            case "wkd":
                opts.input = document.body.querySelector("#wkd_input").value;
                break;

            case "hkp":
                opts.input = document.body.querySelector("#hkp_input").value;
                opts.server =  document.body.querySelector("#hkp_server").value;
                break;

            case "plaintext":
                opts.input = document.body.querySelector("#plaintext_input").value;
                break;

            case "keybase":
                opts.username = document.body.querySelector("#keybase_username").value;
                opts.fingerprint =  document.body.querySelector("#keybase_fingerprint").value;
                break;
        }

        // If no input was detect
        if (!opts.input && !opts.username) {
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
        opts.mode = document.body.querySelector("#modeSelect").value;

        switch (opts.mode) {
            default:
            case "auto":
                opts.input = document.body.querySelector("#auto_input").value;
                break;

            case "wkd":
                opts.input = document.body.querySelector("#wkd_input").value;
                break;

            case "hkp":
                opts.input = document.body.querySelector("#hkp_input").value;
                opts.server =  document.body.querySelector("#hkp_server").value;
                break;

            case "plaintext":
                opts.input = document.body.querySelector("#plaintext_input").value;
                break;

            case "keybase":
                opts.username = document.body.querySelector("#keybase_username").value;
                opts.fingerprint =  document.body.querySelector("#keybase_fingerprint").value;
                break;
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

        opts.mode = document.body.querySelector("#modeSelect").value;

        switch (opts.mode) {
            default:
            case "auto":
                opts.input = document.body.querySelector("#auto_input").value;
                break;

            case "wkd":
                opts.input = document.body.querySelector("#wkd_input").value;
                break;

            case "hkp":
                opts.input = document.body.querySelector("#hkp_input").value;
                opts.server =  document.body.querySelector("#hkp_server").value;
                break;

            case "plaintext":
                opts.input = document.body.querySelector("#plaintext_input").value;
                break;
        }

        verifyProofs(opts);
    };
}

if (elProfileUid) {
    let opts, profileUid = elProfileUid.innerHTML;
    switch (elProfileMode.innerHTML) {
        default:
        case "sig":
            elFormSignatureProfile.onsubmit = function (evt) {
                evt.preventDefault();

                opts = {
                    input: document.body.querySelector("#plaintext_input").value,
                    mode: elProfileMode.innerHTML
                }

                displayProfile(opts)
            }
            break;

        case "auto":
            if (/.*@.*/.test(profileUid)) {
                // Match email for wkd
                opts = {
                    input: profileUid,
                    mode: "wkd"
                }
            } else {
                // Match fingerprint for hkp
                opts = {
                    input: profileUid,
                    mode: "hkp"
                }
            }
            break;

        case "hkp":
            opts = {
                input: profileUid,
                server: elProfileServer.innerHTML,
                mode: elProfileMode.innerHTML
            }
            break;

        case "wkd":
            opts = {
                input: profileUid,
                mode: elProfileMode.innerHTML
            }
            break;

        case "keybase":
            let match = profileUid.match(/(.*)\/(.*)/);
            opts = {
                username: match[1],
                fingerprint: match[2],
                mode: elProfileMode.innerHTML
            }
            break;
    }

    if (elProfileMode.innerHTML !== 'sig') {
        displayProfile(opts);
    }
}

if (elUtilWKD) {
    elUtilWKD.onsubmit = function (evt) {
        evt.preventDefault();
    }

    const elInput = document.body.querySelector("#input");
    const elOutput = document.body.querySelector("#output");
    const elOutputDirect = document.body.querySelector("#output_url_direct");
    const elOutputAdvanced = document.body.querySelector("#output_url_advanced");
    let match;

    elInput.addEventListener("input", async function(evt) {
        if (evt.target.value) {
            if (/(.*)@(.{1,}\..{1,})/.test(evt.target.value)) {
                match = evt.target.value.match(/(.*)@(.*)/);
                elOutput.innerText = await computeWKDLocalPart(match[1]);
                elOutputDirect.innerText = `https://${match[2]}/.well-known/openpgpkey/hu/${elOutput.innerText}?l=${match[1]}`;
                elOutputAdvanced.innerText = `https://openpgpkey.${match[2]}/.well-known/openpgpkey/${match[2]}/hu/${elOutput.innerText}?l=${match[1]}`;
            } else {
                elOutput.innerText = await computeWKDLocalPart(evt.target.value);
                elOutputDirect.innerText = "Waiting for input";
                elOutputAdvanced.innerText = "Waiting for input";
            }
        } else {
            elOutput.innerText = "Waiting for input";
            elOutputDirect.innerText = "Waiting for input";
            elOutputAdvanced.innerText = "Waiting for input";
        }
    });

    elInput.dispatchEvent(new Event("input"));
}

if (elUtilQRFP) {
    elUtilQRFP.onsubmit = function (evt) {
        evt.preventDefault();
    }

    const qrTarget = document.getElementById('qrcode');
    const qrContext = qrTarget.getContext('2d');
    const qrOpts = {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 256,
        height: 256
    };

    const elInput = document.body.querySelector("#input");

    elInput.addEventListener("input", async function(evt) {
        if (evt.target.value) {
            QRCode.toCanvas(qrTarget, evt.target.value, qrOpts, function (error) {
                if (error) {
                    qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
                    console.error(error);
                }
            });
        } else {
            qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
        }
    });

    elInput.dispatchEvent(new Event("input"));
}

if (elUtilQR) {
    elUtilQR.onsubmit = function (evt) {
        evt.preventDefault();
    }

    const qrTarget = document.getElementById('qrcode');
    const qrContext = qrTarget.getContext('2d');
    const qrOpts = {
        errorCorrectionLevel: 'L',
        margin: 1,
        width: 256,
        height: 256
    };

    const elInput = document.body.querySelector("#input");

    if (elInput.innerText) {
        elInput.innerText = decodeURIComponent(elInput.innerText);

        QRCode.toCanvas(qrTarget, elInput.innerText, qrOpts, function (error) {
            if (error) {
                document.body.querySelector("#qrcode--altLink").href = "#";
                qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
                console.error(error);
            } else {
                document.body.querySelector("#qrcode--altLink").href = elInput.innerText;
            }
        });
    } else {
        qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
    }
}

if (elUtilProfileURL) {
    elUtilProfileURL.onsubmit = function (evt) {
        evt.preventDefault();
    }

    const elInput = document.body.querySelector("#input"),
        elSource = document.body.querySelector("#source"),
        elOutput = document.body.querySelector("#output");

    let data = {
        input: elInput.value,
        source: elSource.value
    };

    elInput.addEventListener("input", async function(evt) {
        data = {
            input: elInput.value,
            source: elSource.value
        };
        elOutput.innerText = await generateProfileURL(data);
    });

    elSource.addEventListener("input", async function(evt) {
        data = {
            input: elInput.value,
            source: elSource.value
        };
        elOutput.innerText = await generateProfileURL(data);
    });

    elInput.dispatchEvent(new Event("input"));
}

function capitalizeLetteredServices(serviceName) {
    const servName = serviceName.toLowerCase();
    if (servName === 'dns' || servName === 'xmpp' || servName === 'irc') {
        return servName.toUpperCase();
    }
    return serviceName;
}
