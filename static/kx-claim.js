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

            const subsection0 = elContent.appendChild(document.createElement('div'));
            subsection0.setAttribute('class', 'subsection');
            const subsection0_icon = subsection0.appendChild(document.createElement('img'));
            subsection0_icon.setAttribute('src', '/static/img/alert-decagram.png');
            const subsection0_text = subsection0.appendChild(document.createElement('div'));

            const message = subsection0_text.appendChild(document.createElement('p'));
            message.innerHTML = `None of the matched service providers could be verified. Keyoxide is not able to determine which is the correct service provider and why the verification process failed.`;
            return;
        }

        // Links to profile and proof
        const subsection1 = elContent.appendChild(document.createElement('div'));
        subsection1.setAttribute('class', 'subsection');
        const subsection1_icon = subsection1.appendChild(document.createElement('img'));
        subsection1_icon.setAttribute('src', '/static/img/link.png');
        const subsection1_text = subsection1.appendChild(document.createElement('div'));

        const profile_link = subsection1_text.appendChild(document.createElement('p'));
        if (claim.matches[0].profile.uri) {
            profile_link.innerHTML = `Profile link: <a href="${claim.matches[0].profile.uri}">${claim.matches[0].profile.uri}</a>`;
        } else {
            profile_link.innerHTML = `Profile link: not accessible from browser`;
        }

        const proof_link = subsection1_text.appendChild(document.createElement('p'));
        if (claim.matches[0].proof.uri) {
            proof_link.innerHTML = `Proof link: <a href="${claim.matches[0].proof.uri}">${claim.matches[0].proof.uri}</a>`;
        } else {
            proof_link.innerHTML = `Proof link: not accessible from browser`;
        }

        elContent.appendChild(document.createElement('hr'));

        // Claim verification status
        const subsection2 = elContent.appendChild(document.createElement('div'));
        subsection2.setAttribute('class', 'subsection');
        const subsection2_icon = subsection2.appendChild(document.createElement('img'));
        subsection2_icon.setAttribute('src', '/static/img/decagram.png');
        const subsection2_text = subsection2.appendChild(document.createElement('div'));

        const verification = subsection2_text.appendChild(document.createElement('p'));
        if (claim.status === 'verified') {
            verification.innerHTML = `Claim verification has completed.`;
            subsection2_icon.setAttribute('src', '/static/img/check-decagram.png');
        } else {
            verification.innerHTML = `Claim verification is in progress&hellip;`;
            return;
        }

        elContent.appendChild(document.createElement('hr'));

        // Result of claim verification
        const subsection3 = elContent.appendChild(document.createElement('div'));
        subsection3.setAttribute('class', 'subsection');
        const subsection3_icon = subsection3.appendChild(document.createElement('img'));
        subsection3_icon.setAttribute('src', '/static/img/shield-search.png');
        const subsection3_text = subsection3.appendChild(document.createElement('div'));

        const result = subsection3_text.appendChild(document.createElement('p'));
        result.innerHTML = `The claim <strong>${claim.verification.result ? 'HAS BEEN' : 'COULD NOT BE'}</strong> verified by the proof.`;

        // Additional info
        if (claim.verification.proof.viaProxy) {
            elContent.appendChild(document.createElement('hr'));

            const subsection4 = elContent.appendChild(document.createElement('div'));
            subsection4.setAttribute('class', 'subsection');
            const subsection4_icon = subsection4.appendChild(document.createElement('img'));
            subsection4_icon.setAttribute('src', '/static/img/information.png');
            const subsection4_text = subsection4.appendChild(document.createElement('div'));

            const result_proxyUsed = subsection4_text.appendChild(document.createElement('p'));
            result_proxyUsed.innerHTML = `A proxy was used to fetch the proof: <a href="https://PLACEHOLDER__PROXY_HOSTNAME">PLACEHOLDER__PROXY_HOSTNAME</a>`;
        }

        // TODO Display errors
        // if (claim.verification.errors.length > 0) {
        //     console.log(claim.verification);
        //     elContent.appendChild(document.createElement('hr'));

        //     const subsection5 = elContent.appendChild(document.createElement('div'));
        //     subsection5.setAttribute('class', 'subsection');
        //     const subsection5_icon = subsection5.appendChild(document.createElement('img'));
        //     subsection5_icon.setAttribute('src', '/static/img/alert-circle.png');
        //     const subsection5_text = subsection5.appendChild(document.createElement('div'));

        //     claim.verification.errors.forEach(message => {
        //         const error = subsection5_text.appendChild(document.createElement('p'));

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
