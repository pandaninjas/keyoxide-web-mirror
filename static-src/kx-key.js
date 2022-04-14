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
export class Key extends HTMLElement {
    // Specify the attributes to observe
    static get observedAttributes() {
        return ['data-keydata'];
    }

    constructor() {
        // Call super
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateContent(newValue);
    }

    updateContent(value) {
        const root = this;
        const data = JSON.parse(value);

        root.querySelector('.info .subtitle').innerText = data.key.fetchMethod;
        root.querySelector('.info .title').innerText = data.fingerprint;

        const elContent = root.querySelector('.content');
        elContent.innerHTML = ``;

        // Link to key
        const subsection_links = elContent.appendChild(document.createElement('div'));
        subsection_links.setAttribute('class', 'subsection');
        const subsection_links_icon = subsection_links.appendChild(document.createElement('img'));
        subsection_links_icon.setAttribute('src', '/static/img/link.png');
        subsection_links_icon.setAttribute('alt', '');
        subsection_links_icon.setAttribute('aria-hidden', 'true');
        const subsection_links_text = subsection_links.appendChild(document.createElement('div'));

        const profile_link = subsection_links_text.appendChild(document.createElement('p'));
        profile_link.innerHTML = `Key link: <a class="u-key" rel="pgpkey" href="${data.key.uri}" aria-label="Link to cryptographic key">${data.key.uri}</a>`;

        elContent.appendChild(document.createElement('hr'));

        // QR Code
        const subsection_qr = elContent.appendChild(document.createElement('div'));
        subsection_qr.setAttribute('class', 'subsection');
        const subsection_qr_icon = subsection_qr.appendChild(document.createElement('img'));
        subsection_qr_icon.setAttribute('src', '/static/img/qrcode.png');
        subsection_qr_icon.setAttribute('alt', '');
        subsection_qr_icon.setAttribute('aria-hidden', 'true');
        const subsection_qr_text = subsection_qr.appendChild(document.createElement('div'));

        const button_fingerprintQR = subsection_qr_text.appendChild(document.createElement('button'));
        button_fingerprintQR.innerText = `Show OpenPGP fingerprint QR`;
        button_fingerprintQR.setAttribute('onClick', `window.showQR('${data.fingerprint}', 'fingerprint')`);
        button_fingerprintQR.setAttribute('aria-label', `Show QR code for cryptographic fingerprint`);
    }
}