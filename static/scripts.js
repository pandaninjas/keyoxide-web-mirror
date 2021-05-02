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
const claims = document.querySelectorAll('kx-claim');

claims.forEach(function(claim) {
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

// let elFormSignatureProfile = document.body.querySelector("#formGenerateSignatureProfile"),
//     elProfileUid = document.body.querySelector("#profileUid"),
//     elProfileMode = document.body.querySelector("#profileMode"),
//     elProfileServer = document.body.querySelector("#profileServer"),
//     elModeSelect = document.body.querySelector("#modeSelect"),
//     elUtilWKD = document.body.querySelector("#form-util-wkd"),
//     elUtilQRFP = document.body.querySelector("#form-util-qrfp"),
//     elUtilQR = document.body.querySelector("#form-util-qr"),
//     elUtilProfileURL = document.body.querySelector("#form-util-profile-url");

// if (elModeSelect) {
//     elModeSelect.onchange = function (evt) {
//         let elAllModes = document.body.querySelectorAll('.modes');
//         elAllModes.forEach(function(el) {
//             el.classList.remove('modes--visible');
//         });
//         document.body.querySelector(`.modes--${elModeSelect.value}`).classList.add('modes--visible');
//     }
//     elModeSelect.dispatchEvent(new Event("change"));
// }

// if (elProfileUid) {
//     let opts, profileUid = elProfileUid.innerHTML;
//     switch (elProfileMode.innerHTML) {
//         default:
//         case "sig":
//             elFormSignatureProfile.onsubmit = function (evt) {
//                 evt.preventDefault();

//                 opts = {
//                     input: document.body.querySelector("#plaintext_input").value,
//                     mode: elProfileMode.innerHTML
//                 }

//                 displayProfile(opts)
//             }
//             break;

//         case "auto":
//             if (/.*@.*/.test(profileUid)) {
//                 // Match email for wkd
//                 opts = {
//                     input: profileUid,
//                     mode: "wkd"
//                 }
//             } else {
//                 // Match fingerprint for hkp
//                 opts = {
//                     input: profileUid,
//                     mode: "hkp"
//                 }
//             }
//             break;

//         case "hkp":
//             opts = {
//                 input: profileUid,
//                 server: elProfileServer.innerHTML,
//                 mode: elProfileMode.innerHTML
//             }
//             break;

//         case "wkd":
//             opts = {
//                 input: profileUid,
//                 mode: elProfileMode.innerHTML
//             }
//             break;

//         case "keybase":
//             let match = profileUid.match(/(.*)\/(.*)/);
//             opts = {
//                 username: match[1],
//                 fingerprint: match[2],
//                 mode: elProfileMode.innerHTML
//             }
//             break;
//     }

//     if (elProfileMode.innerHTML !== 'sig') {
//         keyoxide.displayProfile(opts);
//     }
// }

// if (elUtilWKD) {
//     elUtilWKD.onsubmit = function (evt) {
//         evt.preventDefault();
//     }

//     const elInput = document.body.querySelector("#input");
//     const elOutput = document.body.querySelector("#output");
//     const elOutputDirect = document.body.querySelector("#output_url_direct");
//     const elOutputAdvanced = document.body.querySelector("#output_url_advanced");
//     let match;

//     elInput.addEventListener("input", async function(evt) {
//         if (evt.target.value) {
//             if (/(.*)@(.{1,}\..{1,})/.test(evt.target.value)) {
//                 match = evt.target.value.match(/(.*)@(.*)/);
//                 elOutput.innerText = await computeWKDLocalPart(match[1]);
//                 elOutputDirect.innerText = `https://${match[2]}/.well-known/openpgpkey/hu/${elOutput.innerText}?l=${match[1]}`;
//                 elOutputAdvanced.innerText = `https://openpgpkey.${match[2]}/.well-known/openpgpkey/${match[2]}/hu/${elOutput.innerText}?l=${match[1]}`;
//             } else {
//                 elOutput.innerText = await computeWKDLocalPart(evt.target.value);
//                 elOutputDirect.innerText = "Waiting for input";
//                 elOutputAdvanced.innerText = "Waiting for input";
//             }
//         } else {
//             elOutput.innerText = "Waiting for input";
//             elOutputDirect.innerText = "Waiting for input";
//             elOutputAdvanced.innerText = "Waiting for input";
//         }
//     });

//     elInput.dispatchEvent(new Event("input"));
// }

// if (elUtilQRFP) {
//     elUtilQRFP.onsubmit = function (evt) {
//         evt.preventDefault();
//     }

//     const qrTarget = document.getElementById('qrcode');
//     const qrContext = qrTarget.getContext('2d');
//     const qrOpts = {
//         errorCorrectionLevel: 'H',
//         margin: 1,
//         width: 256,
//         height: 256
//     };

//     const elInput = document.body.querySelector("#input");

//     elInput.addEventListener("input", async function(evt) {
//         if (evt.target.value) {
//             QRCode.toCanvas(qrTarget, evt.target.value, qrOpts, function (error) {
//                 if (error) {
//                     qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
//                     console.error(error);
//                 }
//             });
//         } else {
//             qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
//         }
//     });

//     elInput.dispatchEvent(new Event("input"));
// }

// if (elUtilQR) {
//     elUtilQR.onsubmit = function (evt) {
//         evt.preventDefault();
//     }

//     const qrTarget = document.getElementById('qrcode');
//     const qrContext = qrTarget.getContext('2d');
//     const qrOpts = {
//         errorCorrectionLevel: 'L',
//         margin: 1,
//         width: 256,
//         height: 256
//     };

//     const elInput = document.body.querySelector("#input");

//     if (elInput.innerText) {
//         elInput.innerText = decodeURIComponent(elInput.innerText);

//         QRCode.toCanvas(qrTarget, elInput.innerText, qrOpts, function (error) {
//             if (error) {
//                 document.body.querySelector("#qrcode--altLink").href = "#";
//                 qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
//                 console.error(error);
//             } else {
//                 document.body.querySelector("#qrcode--altLink").href = elInput.innerText;
//             }
//         });
//     } else {
//         qrContext.clearRect(0, 0, qrTarget.width, qrTarget.height);
//     }
// }

// if (elUtilProfileURL) {
//     elUtilProfileURL.onsubmit = function (evt) {
//         evt.preventDefault();
//     }

//     const elInput = document.body.querySelector("#input"),
//         elSource = document.body.querySelector("#source"),
//         elOutput = document.body.querySelector("#output");

//     let data = {
//         input: elInput.value,
//         source: elSource.value
//     };

//     elInput.addEventListener("input", async function(evt) {
//         data = {
//             input: elInput.value,
//             source: elSource.value
//         };
//         elOutput.innerText = await generateProfileURL(data);
//     });

//     elSource.addEventListener("input", async function(evt) {
//         data = {
//             input: elInput.value,
//             source: elSource.value
//         };
//         elOutput.innerText = await generateProfileURL(data);
//     });

//     elInput.dispatchEvent(new Event("input"));
// }
