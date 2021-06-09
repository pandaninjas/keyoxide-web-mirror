class Key extends HTMLElement {
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
        profile_link.innerHTML = `Key link: <a href="${data.key.uri}" aria-label="Link to cryptographic key">${data.key.uri}</a>`;

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
        button_fingerprintQR.setAttribute('onClick', `showQR('${data.fingerprint}', 'fingerprint')`);
        button_fingerprintQR.setAttribute('aria-label', `Show QR code for cryptographic fingerprint`);
    }
}

customElements.define('kx-key', Key);
