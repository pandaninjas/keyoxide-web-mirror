<p>Now that we have proofs on our OpenPGP keys, lets list them.</p>

<h3>Listing notations in GnuPG</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>List detailed prefs:</p>
<code>showpref</code>

<p>You should now see your key details, uid, and proofs assigned to your keys</p>
<code>
[ultimate] (1). Your Name <your@email>
     Cipher: AES256, AES192, AES, 3DES
     Digest: SHA512, SHA384, SHA256, SHA1
     Compression: ZLIB, BZIP2, ZIP, Uncompressed
     Features: MDC, Keyserver no-modify
     Notations: proof@metacode.biz=https://gist.github.com/youruser/somehash
                proof@metacode.biz=dns:yourdomain.org?type=TXT
</code>

<p>Exit gpg</p>
<code>quit</code>
