class Key extends HTMLElement {
    // Specify the attributes to observe
    static get observedAttributes() {
        return ['data-keydata'];
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

        // Info > Protocol
        const serviceProvider = info.appendChild(document.createElement('p'));
        serviceProvider.setAttribute('class', 'subtitle');

        // Info > Fingerprint
        const profile = info.appendChild(document.createElement('p'));
        profile.setAttribute('class', 'title');

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

    updateContent(value) {
        const shadow = this.shadowRoot;
        const data = JSON.parse(value);

        shadow.querySelector('.info .subtitle').innerText = data.key.fetchMethod;
        shadow.querySelector('.info .title').innerText = data.fingerprint;

        const elContent = shadow.querySelector('.content');
        elContent.innerHTML = ``;

        // Link to key
        const subsection1 = elContent.appendChild(document.createElement('div'));
        subsection1.setAttribute('class', 'subsection');
        const subsection1_icon = subsection1.appendChild(document.createElement('img'));
        subsection1_icon.setAttribute('src', '/static/img/link.png');
        const subsection1_text = subsection1.appendChild(document.createElement('div'));

        const profile_link = subsection1_text.appendChild(document.createElement('p'));
        profile_link.innerHTML = `Key link: <a href="${data.key.uri}">${data.key.uri}</a>`;
    }
}

customElements.define('kx-key', Key);
