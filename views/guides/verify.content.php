<p>Let's see how to verify an OpenPGP signature.</p>

<h3>Obtain a signature</h3>

<p>If you already have a signature you would like to verify, great! If not, let's use the following signature for the guide:</p>
<code>-----BEGIN PGP SIGNED MESSAGE-----
<br>Hash: SHA256
<br>
<br>I like pineapple.
<br>-----BEGIN PGP SIGNATURE-----
<br>
<br>iQJDBAEBCAAtFiEEog/Pt4tEmnyVrrtlNzZ/SvQIetEFAl70mVUPHHlhcm1vQHlh
cm1vLmV1AAoJEDc2f0r0CHrRQXIP/08uza9zOtmZXv5K+uPGVzDKwkgPgZJEezX7
6iQ358f1pjSRvYfQ5aB13k2epUHoqCKArMYu1zPqxhvLvvAvp8uOHABnr9NGL3El
u7UUgaeUNHkr0gxCKEq3p81abrrbbWveP8OBP4RyxmaFx13Xcj7mfDluiBHmjVvv
WU09EdH9VPlJ7WfZ+2G2ZZDHuE5XiaeP7ocugTxXXLkp33zwpDX0+ZuCIXM6fQGe
OccSffglFPdNBnfasuuxDWxTQPsEbWGOPJV+CAPmBDeApX+TBF9bovO3hw4Uozk2
VT7EAy8Hb0SOrUb3UNGxzoKv++5676IxyB4JXX0Tr9O4ZxhO8o9pEEHwirtn/J1+
MWven4gVlWM/6bMeUqx6ydyNc2nqF5059yfRmwGMlp09x82G4x1bcf6aDZ+5njDG
fS5T2OpXRIkZHJx8BhmZjsxiDR0KV44zwHpt06+96ef3EDWB0BcP6M+a5Rtc33zf
irRmQd2M6RLyXCYtdGIiiAFRuomw802U4F0P4LwVrZdbGA6ObqBv1k8BUFCMbMz8
Ab4hF7kO4z0Vh3JaKzcHey0pOzdNCPpAHZ51sAoAnFDM4PdMBgQxxVweCMu4KYMZ
FN8sNn42oY/b7gDmwCelVhgD+rvUn/a8+B7CDmCp+wIquyrjrTt00voATcb+ZPMJ
<br>pTXJ/NcM
<br>=rqTX
<br>-----END PGP SIGNATURE-----
</code>

<p>Copy the above signature.</p>

<h3>Verify the signature</h3>

<p>Open the <a href="/verify" target="_blank">keyoxide.org/verify</a> page and paste the signature in the corresponding field. Scroll down and press the <strong>VERIFY SIGNATURE</strong> button.</p>
<p>Keyoxide lets you know the signature was verified and signed by a certain person.</p>

<h3>Verify the signature against a specific public key</h3>

<p>Sometimes, you want to know if a specific person or public key was used to create a signature. In this case, let's figure out if the message was signed by Yarmo's public key or his friend Wiktor's public key.</p>

<p>Copy the following fingerprint:</p>
<code>653909A2F0E37C106F5FAF546C8857E0D8E8F074</code>
<p>Paste it in the <strong>Email / key id / fingerprint</strong> field under <strong>Public Key (3: HKP server)</strong> and press the big button again. It could not be verified. Guess it wasn't Wiktor who signed that message.</p>

<p>Now, copy the following fingerprint:</p>
<code>9f0048ac0b23301e1f77e994909f6bd6f80f485d</code>
<p>Paste it in the same field and press the big button again. It did verify! It was Yarmo all along.</p>

<h3>Going further</h3>

<p>You could try using different mechanisms of fetching keys, such as <strong>web key directory</strong> or copy-pasting a plaintext public key.</p>

<p>If you'd like to sign messages using PGP, you must first learn the fundamentals of PGP and how to generate and handle your own keypair.</p>