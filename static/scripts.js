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
// Verify all claims
const claims = document.querySelectorAll('kx-claim');
claims.forEach(function(claim) {
    if (claim.hasAttribute('data-skip') && claim.getAttribute('data-skip')) {
        return;
    }
    claim.verify();
});

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

// Register form listeners
const elFormEncrypt = document.body.querySelector("#dialog--encryptMessage form");
if (elFormEncrypt) {
    elFormEncrypt.onsubmit = async function (evt) {
        evt.preventDefault();

        try {
            // Fetch a key if needed
            await fetchProfileKey();

            // Encrypt the message
            let config = openpgp.config;
            config.show_comment = false;
            config.show_version = false;

            encrypted = await openpgp.encrypt({
                message: openpgp.message.fromText(elFormEncrypt.querySelector('.input').value),
                publicKeys: window.kx.key.object,
                config: config
            });
            elFormEncrypt.querySelector('.output').value = encrypted.data;
        } catch (e) {
            console.error(e);
            elFormEncrypt.querySelector('.output').value = `Could not encrypt message!\n==========================\n${e.message ? e.message : e}`;
        }
    }
}

const elFormVerify = document.body.querySelector("#dialog--verifySignature form");
if (elFormVerify) {
    elFormVerify.onsubmit = async function (evt) {
        evt.preventDefault();

        try {
            // Fetch a key if needed
            await fetchProfileKey();

            // Try two different methods of signature reading
            let signature = null, verified = null, readError = null;
            try {
                signature = await openpgp.message.readArmored(elFormVerify.querySelector('.input').value);
            } catch(e) {
                readError = e;
            }
            try {
                signature = await openpgp.cleartext.readArmored(elFormVerify.querySelector('.input').value);
            } catch(e) {
                readError = e;
            }
            if (signature == null) { throw(readError) };

            // Verify the signature
            verified = await openpgp.verify({
                message: signature,
                publicKeys: window.kx.key.object
            });

            if (verified.signatures[0].valid) {
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

const elFormSearch = document.body.querySelector("#search");
if (elFormSearch) {
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

    const elSearchRadio = elFormSearch.querySelectorAll("input[type='radio']");
    elSearchRadio.forEach(function (el) {
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

// Functions
const fetchProfileKey = async function() {
    if (window.kx.key.object && window.kx.key.object instanceof openpgp.key.Key) {
        return;
    }

    const rawKeyData = await fetch(window.kx.key.url)
    let key, errorMsg

    try {
        key = (await openpgp.key.read(new Uint8Array(await rawKeyData.clone().arrayBuffer()))).keys[0]
    } catch(error) {
        errorMsg = error.message
    }

    if (!key) {
        try {
            key = (await openpgp.key.readArmored(await rawKeyData.clone().text())).keys[0]
        } catch (error) {
            errorMsg = error.message
        }
    }

    if (key) {
        window.kx.key.object = key
        return
    } else {
        throw new Error(`Public key could not be fetched (${errorMsg})`)
    }
}

// Enable QR modal
const showQR = function(input, type) {
    const qrTarget = document.getElementById('qr');
    const qrContext = qrTarget.getContext('2d');
    const qrOpts = {
        errorCorrectionLevel: 'L',
        margin: 1,
        width: 256,
        height: 256
    };

    if (input) {
        if (type === 'url') {
            input = decodeURIComponent(input);
        }
        if (type === 'fingerprint') {
            input = `OPENPGP4FPR:${input.toUpperCase()}`
        }

        QRCode.toCanvas(qrTarget, input, qrOpts, function(error) {
            if (error) {
                document.querySelector("#qr--altLink").innerText = "";
                document.querySelector("#qr--altLink").href = "#";
                qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
                console.error(error);
            } else {
                document.querySelector("#qr--altLink").innerText = input;
                document.querySelector("#qr--altLink").href = input;
                document.querySelector('#dialog--qr').showModal();
            }
        });
    } else {
        qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
    }
}
