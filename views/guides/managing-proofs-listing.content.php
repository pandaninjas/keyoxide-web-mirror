<!--
Copyright (C) 2020 Yarmo Mackenbach

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
 -->
<p>Let's list the identity proofs stored in our OpenPGP keys.</p>

<h3>Listing notations in GnuPG</h3>

<p>First, edit the key (make sure to replace FINGERPRINT):</p>
<code>gpg --edit-key FINGERPRINT</code>

<p>List detailed preferences:</p>
<code>showpref</code>

<p>You should now see your key details, uid, and proofs assigned to your keys:</p>
<code>
[ultimate] (1). Your Name <your@email>
     Cipher: AES256, AES192, AES, 3DES
     Digest: SHA512, SHA384, SHA256, SHA1
     Compression: ZLIB, BZIP2, ZIP, Uncompressed
     Features: MDC, Keyserver no-modify
     Notations: proof@metacode.biz=https://gist.github.com/youruser/somehash
                proof@metacode.biz=dns:yourdomain.org?type=TXT
</code>

<p>Exit gpg:</p>
<code>quit</code>
