class Claim extends HTMLElement {
    // Specify the attributes to observe
    static get observedAttributes() {
        return ['data-claim'];
    }

    constructor() {
        // Call super
        super();

        // Shadow root
        this.attachShadow({mode: 'open'});

        // Details element
        const details = document.createElement('details');
        details.setAttribute('class', 'kx-item');

        // Summary element
        const summary = details.appendChild(document.createElement('summary'));

        // Info
        const info = summary.appendChild(document.createElement('div'));
        info.setAttribute('class', 'info');

        // Info > Service provider
        const serviceProvider = info.appendChild(document.createElement('p'));
        serviceProvider.setAttribute('class', 'subtitle');

        // Info > Profile
        const profile = info.appendChild(document.createElement('p'));
        profile.setAttribute('class', 'title');

        // Icons
        const icons = summary.appendChild(document.createElement('div'));
        icons.setAttribute('class', 'icons');

        const icons__verificationStatus = icons.appendChild(document.createElement('div'));
        icons__verificationStatus.setAttribute('class', 'verificationStatus');

        const icons__verificationStatus__inProgress = icons__verificationStatus.appendChild(document.createElement('div'));
        icons__verificationStatus__inProgress.setAttribute('class', 'inProgress');

        // Details content
        const content = details.appendChild(document.createElement('div'));
        content.setAttribute('class', 'content');

        // Load CSS stylesheet
        const linkCSS = document.createElement('link');
        linkCSS.setAttribute('rel', 'stylesheet');
        linkCSS.setAttribute('href', '/static/kx-styles.css');

        // Attach the elements to the shadow DOM
        this.shadowRoot.append(linkCSS, details);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateContent(newValue);
    }

    async verify() {
        const claim = new doip.Claim(JSON.parse(this.getAttribute('data-claim')));
        await claim.verify({
            proxy: {
                policy: 'adaptive',
                hostname: 'PLACEHOLDER__PROXY_HOSTNAME'
            }
        });
        this.setAttribute('data-claim', JSON.stringify(claim));
    }

    updateContent(value) {
        const shadow = this.shadowRoot;
        const claim = new doip.Claim(JSON.parse(value));

        switch (claim.matches[0].serviceprovider.name) {
            case 'dns':
            case 'xmpp':
            case 'irc':
                shadow.querySelector('.info .subtitle').innerText = claim.matches[0].serviceprovider.name.toUpperCase();
                break;

            default:
                shadow.querySelector('.info .subtitle').innerText = claim.matches[0].serviceprovider.name;
                break;
        }
        shadow.querySelector('.info .title').innerText = claim.matches[0].profile.display;

        try {
            if (claim.status === 'verified') {
                shadow.querySelector('.icons .verificationStatus').setAttribute('data-value', claim.verification.result ? 'success' : 'failed');
            } else {
                shadow.querySelector('.icons .verificationStatus').setAttribute('data-value', 'running');
            }
        } catch (error) {
            shadow.querySelector('.icons .verificationStatus').setAttribute('data-value', 'failed');
        }

        const elContent = shadow.querySelector('.content');
        elContent.innerHTML = ``;

        // Handle failed ambiguous claim
        if (claim.status === 'verified' && !claim.verification.result && claim.isAmbiguous()) {
            shadow.querySelector('.info .subtitle').innerText = '---';

            const subsection_alert = elContent.appendChild(document.createElement('div'));
            subsection_alert.setAttribute('class', 'subsection');
            const subsection_alert_icon = subsection_alert.appendChild(document.createElement('img'));
            subsection_alert_icon.setAttribute('src', '/static/img/alert-decagram.png');
            const subsection_alert_text = subsection_alert.appendChild(document.createElement('div'));

            const message = subsection_alert_text.appendChild(document.createElement('p'));
            message.innerHTML = `None of the matched service providers could be verified. Keyoxide was not able to determine which was the correct service provider or why the verification process failed.`;
            return;
        }

        // Links to profile and proof
        const subsection_links = elContent.appendChild(document.createElement('div'));
        subsection_links.setAttribute('class', 'subsection');
        const subsection_links_icon = subsection_links.appendChild(document.createElement('img'));
        subsection_links_icon.setAttribute('src', '/static/img/link.png');
        const subsection_links_text = subsection_links.appendChild(document.createElement('div'));

        const profile_link = subsection_links_text.appendChild(document.createElement('p'));
        if (claim.matches[0].profile.uri) {
            profile_link.innerHTML = `Profile link: <a rel="me" href="${claim.matches[0].profile.uri}">${claim.matches[0].profile.uri}</a>`;
        } else {
            profile_link.innerHTML = `Profile link: not accessible from browser`;
        }

        const proof_link = subsection_links_text.appendChild(document.createElement('p'));
        if (claim.matches[0].proof.uri) {
            proof_link.innerHTML = `Proof link: <a href="${claim.matches[0].proof.uri}">${claim.matches[0].proof.uri}</a>`;
        } else {
            proof_link.innerHTML = `Proof link: not accessible from browser`;
        }

        // QR Code
        if (claim.matches[0].profile.qr) {
            elContent.appendChild(document.createElement('hr'));

            const subsection_qr = elContent.appendChild(document.createElement('div'));
            subsection_qr.setAttribute('class', 'subsection');
            const subsection_qr_icon = subsection_qr.appendChild(document.createElement('img'));
            subsection_qr_icon.setAttribute('src', '/static/img/qrcode.png');
            const subsection_qr_text = subsection_qr.appendChild(document.createElement('div'));

            const button_profileQR = subsection_qr_text.appendChild(document.createElement('button'));
            button_profileQR.innerText = `Show profile QR`;
            button_profileQR.setAttribute('onClick', `showQR('${claim.matches[0].profile.qr}', 'url')`);
        }

        elContent.appendChild(document.createElement('hr'));

        // Claim verification status
        const subsection_status = elContent.appendChild(document.createElement('div'));
        subsection_status.setAttribute('class', 'subsection');
        const subsection_status_icon = subsection_status.appendChild(document.createElement('img'));
        subsection_status_icon.setAttribute('src', '/static/img/decagram.png');
        const subsection_status_text = subsection_status.appendChild(document.createElement('div'));

        const verification = subsection_status_text.appendChild(document.createElement('p'));
        if (claim.status === 'verified') {
            verification.innerHTML = `Claim verification has completed.`;
            subsection_status_icon.setAttribute('src', '/static/img/check-decagram.png');
        } else {
            verification.innerHTML = `Claim verification is in progress&hellip;`;
            return;
        }

        elContent.appendChild(document.createElement('hr'));

        // Result of claim verification
        const subsection_result = elContent.appendChild(document.createElement('div'));
        subsection_result.setAttribute('class', 'subsection');
        const subsection_result_icon = subsection_result.appendChild(document.createElement('img'));
        subsection_result_icon.setAttribute('src', '/static/img/shield-search.png');
        const subsection_result_text = subsection_result.appendChild(document.createElement('div'));

        const result = subsection_result_text.appendChild(document.createElement('p'));
        result.innerHTML = `The claim <strong>${claim.verification.result ? 'HAS BEEN' : 'COULD NOT BE'}</strong> verified by the proof.`;

        // Additional info
        if (claim.verification.proof.viaProxy) {
            elContent.appendChild(document.createElement('hr'));

            const subsection_info = elContent.appendChild(document.createElement('div'));
            subsection_info.setAttribute('class', 'subsection');
            const subsection_info_icon = subsection_info.appendChild(document.createElement('img'));
            subsection_info_icon.setAttribute('src', '/static/img/information.png');
            const subsection_info_text = subsection_info.appendChild(document.createElement('div'));

            const result_proxyUsed = subsection_info_text.appendChild(document.createElement('p'));
            result_proxyUsed.innerHTML = `A proxy was used to fetch the proof: <a href="https://PLACEHOLDER__PROXY_HOSTNAME">PLACEHOLDER__PROXY_HOSTNAME</a>`;
        }

        // TODO Display errors
        // if (claim.verification.errors.length > 0) {
        //     console.log(claim.verification);
        //     elContent.appendChild(document.createElement('hr'));

        //     const subsection_errors = elContent.appendChild(document.createElement('div'));
        //     subsection_errors.setAttribute('class', 'subsection');
        //     const subsection_errors_icon = subsection_errors.appendChild(document.createElement('img'));
        //     subsection_errors_icon.setAttribute('src', '/static/img/alert-circle.png');
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

customElements.define('kx-claim', Claim);
