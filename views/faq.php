<?php $this->layout('template.base', ['title' => $title]) ?>

<h1>FAQ</h1>
<div class="content">
    <h3 id="what-is-keyoxide"><a href="#what-is-keyoxide">#</a> What is Keyoxide?</h3>
    <p><a href="/">Keyoxide</a> is a lightweight and FOSS solution to make basic cryptography operations accessible to regular humans. It is built to be privacy friendly and secure, it can even be selfhosted.</p>

    <h3 id="why-does-keyoxide-exist"><a href="#why-does-keyoxide-exist">#</a> Why does Keyoxide exist?</h3>
    <p><a href="/">Keyoxide</a> provides a solution to a modern problem: we humans have developed advanced methods of encrypting data and signing it. Unfortunately, it requires complicated tools that demand a minimal level of understanding cryptography and how keypairs work to leverage these technologies.</p>
    <p>Sadly, this means that true privacy and secrecy in this modern age of surveillance capitalism is reserved to a subset of the world population.</p>
    <p>Luckily, there is one thing we can do. Some cryptographic operations are more accessible than others and less prone to leaking private data. By building a service around only those operations, we hope a wider general audience can benefit from modern cryptography.</p>

    <h3 id="what-cryptographic-operations-can-keyoxide-handle"><a href="#what-cryptographic-operations-can-keyoxide-handle">#</a> What cryptographic operations can Keyoxide handle?</h3>
    <p><a href="/">Keyoxide</a> can: <a href="/verify">verify signatures</a> and <a href="/encrypt">encrypt messages</a>.<br><a href="/">Keyoxide</a> can't: sign messages or decrypt messages.</p>

    <h3 id="why-so-few-cryptographic-operations"><a href="#why-so-few-cryptographic-operations">#</a> Why so few cryptographic operations?</h3>
    <p>Good question. First, what cryptographic operations are generally available? There's <strong>encryption</strong> and its counterpart, <strong>decryption</strong>, but also <strong>signing</strong> and its counterpart, <strong>signature verification</strong>.</p>
    <p><strong>Decryption</strong> and <strong>signing</strong> require private keys. <strong>Encryption</strong> and <strong>signature verification</strong> only require public keys.</p>
    <p>If you happen to be in possession of a private key, there is one thing you should know: that key is private! It shouldn't leave your computer and most certainly should never be uploaded to any website!</p>
    <p>So yes, alternative services may offer more cryptographic operations but at the highest cost of surrendering your private keys to servers you generally shouldn't trust and companies that may be under geopolitical influence.</p>
    <p><a href="/">Keyoxide</a> offers a simple solution to the trust issue: we don't want your keys, therefore you don't even need to trust us. Everything that this service offers is possible thanks to publicly available keys.</p>

    <h3 id="how-does-keyoxide-work-without-keys"><a href="#how-does-keyoxide-work-without-keys">#</a> How does Keyoxide work without keys?</h3>
    <p>We still need keys, of course, but only the harmless public keys. And yes, we could have built a website where one can make an account and upload public keys, in a similar fashion as alternative services.</p>
    <p>But why would we? There's already an entire infrastructure out there in the form of websites that host their own keys (plaintext or web key directory) or dedicated "HTTP Key Protocol" or HKP servers, designed specifically for public key hosting. Why reinvent the wheel?</p>

    <h3 id="how-is-this-privacy-friendly-and-secure"><a href="#how-is-this-privacy-friendly-and-secure">#</a> How is this privacy friendly and secure?</h3>
    <p>You can't make an account on <a href="/">Keyoxide</a> because for basic cryptographic operations, we don't need your data or your keys. By not knowing anything about you or using any trackers, this is as privacy-friendly as it gets.</p>
    <p>As for secure, <a href="/">Keyoxide</a> does all the cryptographic processing on your device and never sends data to the server. It also doesn't use private keys for any operation (so make sure to never upload those anywhere).</p>

    <h3 id="how-can-i-make-an-account"><a href="#how-can-i-make-an-account">#</a> How can I make an account?</h3>
    <p>Well, you can't and that is the whole point of <a href="/">Keyoxide</a>. We don't wan't your data or your keys. Uploading your keys and/or data to our servers is required for any of the operations provided by <a href="/">Keyoxide</a>.</p>

    <h3 id="can-i-get-a-sweet-profile-page"><a href="#can-i-get-a-sweet-profile-page">#</a> Can I get a sweet profile page?</h3>
    <p>That, we can help you with! Just append your fingerprint to the domain (like so: <a href="https://keyoxide.org/9F0048AC0B23301E1F77E994909F6BD6F80F485D">https://keyoxide.org/9F0048AC0B23301E1F77E994909F6BD6F80F485D</a>) to generate a profile page.</p>

    <h3 id="where-is-the-app"><a href="#where-is-the-app">#</a> Where is the app?</h3>
    <p>There's no app. Why would you want yet another app for what is essentially just a form with a big blue button?</p>

    <h3 id="where-do-i-put-my-private-key"><a href="#where-do-i-put-my-private-key">#</a> Where do I put my private key?</h3>
    <p><strong>DON'T</strong>! We don't want it!</p>
    <p>Alternative services may ask you for your private keys so that they can offer additional functionality. Please understand that your private key is yours and ONLY yours. You should never upload it to any online service, in fact it should never leave your computer.</p>

    <h3 id="what-is-the-use-if-i-can't-decrypt-or-sign-messages"><a href="#what-is-the-use-if-i-can't-decrypt-or-sign-messages">#</a> What is the use if I can't decrypt or sign messages?</h3>
    <p>If you want to be on the receiving end of securely encrypted messages, you should either learn the basics of modern cryptography and know your way around your computer's command line or switch to end-to-end encrypted instant messaging providers.</p>
    <p>Simply put, if you have private keys, you probably won't be using <a href="/">Keyoxide</a>. You will benefit from using command line tools or GUIs like <a href="https://www.openpgp.org/software/kleopatra/">Kleopatra</a>.</p>
    <p><a href="/">Keyoxide</a> is designed for those without extensive knowledge about cryptography and who wish to encrypt messages to, or verify the authenticity of messages coming from the people with that extensive knowledge.</p>

    <h3 id="but-other-services-provide-a-social-network-function"><a href="#but-other-services-provide-a-social-network-function">#</a> But other services provide a social network function!</h3>
    <p>It doesn't need to be centralized to have a "social network" function. <a href="/">Keyoxide</a> simply uses the already existing "social network" of websites hosting their own keys and servers dedicated to hosting large amounts of keys.</p>

    <h3 id="pgp-must-die"><a href="#pgp-must-die">#</a> PGP must die!</h3>
    <p>Not a question but we get your point. While there are <a href="https://restoreprivacy.com/let-pgp-die/">legitimate reasons PGP should cease to exist</a>, it is still widely used and without any clear sign of imminent extinction, it needs proper tooling.</p>
    <p>It should be noted that while PGP can indeed be harmful when applied to email encryption, there are other legitimate ways of leveraging PGP to encrypt and/or sign messages.</p>
    <p>That being said, <a href="/">Keyoxide</a> aims to integrate different cryptographic technologies and therefore ease the transition away from PGP.</p>

    <h3 id="what-is-on-the-roadmap"><a href="#what-is-on-the-roadmap">#</a> What is on the roadmap?</h3>
    <ul>
        <li>Support more decentralized proofs</li>
        <li>Write more guides</li>
        <li>Integrate other encryption programs</li>
    </ul>
</div>
