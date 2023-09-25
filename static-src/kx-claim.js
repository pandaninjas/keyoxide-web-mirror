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
import * as doipjs from 'doipjs';

export class Claim extends HTMLElement {
    // Specify the attributes to observe
    static get observedAttributes() {
        return ['data-claim'];
    }

    constructor() {
        // Call super
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateContent(newValue);
    }

    async verify() {
        const claim = doipjs.Claim.fromJSON(JSON.parse(this.getAttribute('data-claim')));
        await claim.verify({
            proxy: {
                policy: 'adaptive',
                hostname: 'PLACEHOLDER__PROXY_HOSTNAME',
                scheme: 'PLACEHOLDER__PROXY_SCHEME'
            }
        });
        this.setAttribute('data-claim', JSON.stringify(claim));
    }

    updateContent(value) {
        const root = this;
        const claimJson = JSON.parse(value);
        const claim = doipjs.Claim.fromJSON(claimJson);

        root.querySelector('.info .title').innerText = claimJson.display.name;
        root.querySelector('.info .subtitle').innerText = claimJson.display.serviceProviderName ??
            (claim.status < 300 ? '???' : '---');
        root.querySelector('.info img').setAttribute('src',
            `https://design.keyoxide.org/brands/service-providers/${claimJson.display.serviceProviderName
            ? claimJson.display.serviceProviderName.toLowerCase() : '_'}/icon.svg`);

        try {
            if (claim.status >= 200) {
                root.setAttribute('data-status', claim.status < 300 ? 'success' : 'failed');
            } else {
                root.setAttribute('data-status', 'running');
            }
        } catch (error) {
            root.setAttribute('data-status', 'failed');
        }

        const elContent = root.querySelector('.content');
        elContent.innerHTML = ``;

        // Handle failed ambiguous claim
        if (claim.status >= 300 && claim.isAmbiguous()) {
            root.querySelector('.info .subtitle').innerText = '---';

            const subsection_alert = elContent.appendChild(document.createElement('div'));
            subsection_alert.setAttribute('class', 'subsection');
            const subsection_alert_icon = subsection_alert.appendChild(document.createElement('img'));
            subsection_alert_icon.setAttribute('src', '/static/img/alert-decagram.svg');
            subsection_alert_icon.setAttribute('alt', '');
            subsection_alert_icon.setAttribute('aria-hidden', 'true');
            const subsection_alert_text = subsection_alert.appendChild(document.createElement('div'));

            const message = subsection_alert_text.appendChild(document.createElement('p'));
            message.innerHTML = `None of the matched service providers could be verified. Keyoxide was not able to determine which was the correct service provider or why the verification process failed.`;
            return;
        }

        // Links to profile and proof
        const subsection_links = elContent.appendChild(document.createElement('div'));
        subsection_links.setAttribute('class', 'subsection');
        const subsection_links_icon = subsection_links.appendChild(document.createElement('img'));
        subsection_links_icon.setAttribute('src', '/static/img/link.svg');
        subsection_links_icon.setAttribute('alt', '');
        subsection_links_icon.setAttribute('aria-hidden', 'true');
        const subsection_links_text = subsection_links.appendChild(document.createElement('div'));

        const profile_link = subsection_links_text.appendChild(document.createElement('p'));
        if (claim.matches[0].profile.uri) {
            profile_link.innerHTML = `Profile link: <a rel="me" href="${claim.matches[0].profile.uri}" aria-label="link to profile">${claim.matches[0].profile.uri}</a>`;
        } else {
            profile_link.innerHTML = `Profile link: not accessible from browser`;
        }

        const proof_link = subsection_links_text.appendChild(document.createElement('p'));
        if (claim.matches[0].proof.request.uri) {
            proof_link.innerHTML = `Proof link: <a href="${claim.matches[0].proof.request.uri}" aria-label="link to profile">${claim.matches[0].proof.request.uri}</a>`;
        } else {
            proof_link.innerHTML = `Proof link: not accessible from browser`;
        }

        // QR Code
        if (claim.matches[0].profile.qr) {
            elContent.appendChild(document.createElement('hr'));

            const subsection_qr = elContent.appendChild(document.createElement('div'));
            subsection_qr.setAttribute('class', 'subsection');
            const subsection_qr_icon = subsection_qr.appendChild(document.createElement('img'));
            subsection_qr_icon.setAttribute('src', '/static/img/qrcode.svg');
            subsection_qr_icon.setAttribute('alt', '');
            subsection_qr_icon.setAttribute('aria-hidden', 'true');
            const subsection_qr_text = subsection_qr.appendChild(document.createElement('div'));

            const button_profileQR = subsection_qr_text.appendChild(document.createElement('button'));
            button_profileQR.innerText = `Show profile QR`;
            button_profileQR.setAttribute('onClick', `window.showQR('${claim.matches[0].profile.qr}', 'url')`);
            button_profileQR.setAttribute('aria-label', `Show QR code linking to profile`);
        }

        elContent.appendChild(document.createElement('hr'));

        // Claim verification status
        const subsection_status = elContent.appendChild(document.createElement('div'));
        subsection_status.setAttribute('class', 'subsection');
        const subsection_status_icon = subsection_status.appendChild(document.createElement('img'));
        subsection_status_icon.setAttribute('src', '/static/img/decagram.svg');
        subsection_status_icon.setAttribute('alt', '');
        subsection_status_icon.setAttribute('aria-hidden', 'true');
        const subsection_status_text = subsection_status.appendChild(document.createElement('div'));

        const verification = subsection_status_text.appendChild(document.createElement('p'));
        if (claim.status >= 200) {
            verification.innerHTML = `Claim verification has completed.`;
            subsection_status_icon.setAttribute('src', '/static/img/check-decagram.svg');
            subsection_status_icon.setAttribute('alt', '');
            subsection_status_icon.setAttribute('aria-hidden', 'true');
        } else {
            verification.innerHTML = `Claim verification is in progress&hellip;`;
            return;
        }

        elContent.appendChild(document.createElement('hr'));

        // Result of claim verification
        const subsection_result = elContent.appendChild(document.createElement('div'));
        subsection_result.setAttribute('class', 'subsection');
        const subsection_result_icon = subsection_result.appendChild(document.createElement('img'));
        subsection_result_icon.setAttribute('src', '/static/img/shield-search.svg');
        subsection_result_icon.setAttribute('alt', '');
        subsection_result_icon.setAttribute('aria-hidden', 'true');
        const subsection_result_text = subsection_result.appendChild(document.createElement('div'));

        const result = subsection_result_text.appendChild(document.createElement('p'));
        result.innerHTML = `The claim <strong>${claim.status >= 200 && claim.status < 300 ? 'HAS BEEN' : 'COULD NOT BE'}</strong> verified by the proof.`;

        // Additional info
        if (claim.status === 201) {
            elContent.appendChild(document.createElement('hr'));

            const subsection_info = elContent.appendChild(document.createElement('div'));
            subsection_info.setAttribute('class', 'subsection');
            const subsection_info_icon = subsection_info.appendChild(document.createElement('img'));
            subsection_info_icon.setAttribute('src', '/static/img/information.svg');
            subsection_info_icon.setAttribute('alt', '');
            subsection_info_icon.setAttribute('aria-hidden', 'true');
            const subsection_info_text = subsection_info.appendChild(document.createElement('div'));

            const result_proxyUsed = subsection_info_text.appendChild(document.createElement('p'));
            result_proxyUsed.innerHTML = `A proxy was used to fetch the proof: <a href="PLACEHOLDER__PROXY_SCHEME://PLACEHOLDER__PROXY_HOSTNAME" aria-label="Link to proxy server">PLACEHOLDER__PROXY_HOSTNAME</a>`;
        }

        // TODO Display errors
        // if (claim.verification.errors.length > 0) {
        //     console.log(claim.verification);
        //     elContent.appendChild(document.createElement('hr'));

        //     const subsection_errors = elContent.appendChild(document.createElement('div'));
        //     subsection_errors.setAttribute('class', 'subsection');
        //     const subsection_errors_icon = subsection_errors.appendChild(document.createElement('img'));
        //     subsection_errors_icon.setAttribute('src', '/static/img/alert-circle.svg');
        //     const subsection_errors_text = subsection_errors.appendChild(document.createElement('div'));

        //     claim.verification.errors.forEach(message => {
        //         const error = subsection_errors_text.appendChild(document.createElement('p'));

        //         if (message instanceof Error) {
        //             error.innerText = message.message;
        //         } else {
        //             error.innerText = message;
        //         }
        //     });
        // }
    }
}
