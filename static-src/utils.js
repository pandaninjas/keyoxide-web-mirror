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
import * as openpgp from 'openpgp'
import QRCode from 'qrcode'

// Compute local part of Web Key Directory URL 
export async function computeWKDLocalPart(message) {
    const data = openpgp.util.str_to_Uint8Array(message.toLowerCase());
    const hash = await openpgp.crypto.hash.sha1(data);
    return openpgp.util.encodeZBase32(hash);
}

// Generate Keyoxide profile URL
export async function generateProfileURL(data) {
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

// Fetch OpenPGP key based on information stored in window
export async function fetchProfileKey() {
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

// Show QR modal
export function showQR(input, type) {
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
