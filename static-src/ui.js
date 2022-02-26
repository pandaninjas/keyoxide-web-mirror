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
import dialogPolyfill from 'dialog-polyfill'
import QRCode from 'qrcode'
import * as openpgp from 'openpgp'
import * as utils from './utils'

// Prepare element selectors
const elFormSignatureProfile = document.body.querySelector("#formGenerateSignatureProfile")
const elFormEncrypt = document.body.querySelector("#dialog--encryptMessage form")
const elFormVerify = document.body.querySelector("#dialog--verifySignature form")
const elFormSearch = document.body.querySelector("#search")

const elProfileUid = document.body.querySelector("#profileUid")
const elProfileMode = document.body.querySelector("#profileMode")
const elProfileServer = document.body.querySelector("#profileServer")

const elModeSelect = document.body.querySelector("#modeSelect")

const elUtilWKD = document.body.querySelector("#form-util-wkd")
const elUtilQRFP = document.body.querySelector("#form-util-qrfp")
const elUtilQR = document.body.querySelector("#form-util-qr")
const elUtilProfileURL = document.body.querySelector("#form-util-profile-url")

// Initialize UI elements and event listeners
export function init() {
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

    // Run context-dependent scripts
    if (elFormEncrypt) {
        runEncryptionForm()
    }

    if (elFormVerify) {
        runVerificationForm()
    }

    if (elFormSearch) {
        runSearchForm()
    }
    if (elModeSelect) {
        runModeSelector()
    }

    if (elProfileUid) {
        runProfileGenerator()
    }

    if (elUtilWKD) {
        runWKDUtility()
    }

    if (elUtilQRFP) {
        runQRFPUtility()
    }

    if (elUtilQR) {
        runQRUtility()  
    }

    if (elUtilProfileURL) {
        runProfileURLUtility()  
    }
}

const runEncryptionForm = () => {
    elFormEncrypt.onsubmit = async function (evt) {
        evt.preventDefault();

        try {
            // Fetch a key if needed
            await utils.fetchProfileKey();

            // Encrypt the message
            let config = openpgp.config;
            config.show_comment = false;
            config.show_version = false;
            
            let encrypted = await openpgp.encrypt({
                message: await openpgp.createMessage({
                    text: elFormEncrypt.querySelector('.input').value
                }),
                encryptionKeys: window.kx.key.object,
                config: config
            });
            elFormEncrypt.querySelector('.output').value = encrypted;
        } catch (e) {
            console.error(e);
            elFormEncrypt.querySelector('.output').value = `Could not encrypt message!\n==========================\n${e.message ? e.message : e}`;
        }
    }
}

const runVerificationForm = () => {
    elFormVerify.onsubmit = async function (evt) {
        evt.preventDefault();

        try {
            // Fetch a key if needed
            await utils.fetchProfileKey();

            // Try two different methods of signature reading
            let signature = null, verified = null, readError = null;
            try {
                signature = await openpgp.readMessage({
                    armoredMessage: elFormVerify.querySelector('.input').value
                });
            } catch(e) {
                try {
                    signature = await openpgp.readCleartextMessage({
                        cleartextMessage: elFormVerify.querySelector('.input').value
                    });
                } catch(e) {
                    readError = e;
                }
            }
            if (signature == null) { throw(readError) };

            // Verify the signature
            verified = await openpgp.verify({
                message: signature,
                verificationKeys: window.kx.key.object
            });

            if (await verified.signatures[0].verified) {
                elFormVerify.querySelector('.output').value = `The message was signed by the profile's key.`;
            } else {
                elFormVerify.querySelector('.output').value = `The message was NOT signed by the profile's key.`;
            }
        } catch (e) {
            console.error(e);
            elFormVerify.querySelector('.output').value = `Could not verify signature!\n===========================\n${e.message ? e.message : e}`;
        }
    }
}

const runSearchForm = () => {
    elFormSearch.onsubmit = function (evt) {
        evt.preventDefault();

        const protocol = elFormSearch.querySelector("input[type='radio']:checked").value;
        const identifier = elFormSearch.querySelector("input[type='search']").value;

        if (protocol == 'sig') {
            window.location.href = `/${protocol}`;
        } else {
            window.location.href = `/${protocol}/${encodeURIComponent(identifier)}`;
        }
    }

    elFormSearch.querySelectorAll("input[type='radio']").forEach(function (el) {
        el.oninput = function (evt) {
            evt.preventDefault();

            if (evt.target.getAttribute('id') === 'protocol-sig') {
                elFormSearch.querySelector("input[type='search']").setAttribute('disabled', true);
            } else {
                elFormSearch.querySelector("input[type='search']").removeAttribute('disabled');
            }
        }
    });
    
    elFormSearch.querySelector("input[type='radio']:checked").dispatchEvent(new Event('input'));
}

const runModeSelector = () => {
    elModeSelect.onchange = function (evt) {
        let elAllModes = document.body.querySelectorAll('.modes');
        elAllModes.forEach(function(el) {
            el.classList.remove('modes--visible');
        });
        document.body.querySelector(`.modes--${elModeSelect.value}`).classList.add('modes--visible');
    }
    elModeSelect.dispatchEvent(new Event("change"));
}

const runProfileGenerator = () => {
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
        keyoxide.displayProfile(opts);
    }
}

const runWKDUtility = () => {
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
                elOutput.innerText = await utils.computeWKDLocalPart(match[1]);
                elOutputDirect.innerText = `https://${match[2]}/.well-known/openpgpkey/hu/${elOutput.innerText}?l=${match[1]}`;
                elOutputAdvanced.innerText = `https://openpgpkey.${match[2]}/.well-known/openpgpkey/${match[2]}/hu/${elOutput.innerText}?l=${match[1]}`;
            } else {
                elOutput.innerText = await utils.computeWKDLocalPart(evt.target.value);
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

const runQRFPUtility = () => {
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

const runQRUtility = () => {
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

const runProfileURLUtility = () => {
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
        elOutput.innerText = await utils.generateProfileURL(data);
    });

    elSource.addEventListener("input", async function(evt) {
        data = {
            input: elInput.value,
            source: elSource.value
        };
        elOutput.innerText = await utils.generateProfileURL(data);
    });

    elInput.dispatchEvent(new Event("input"));
}