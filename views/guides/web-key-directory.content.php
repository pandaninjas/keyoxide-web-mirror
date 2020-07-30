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
<h3>Web key directory</h3>

<p><a href="https://datatracker.ietf.org/doc/draft-koch-openpgp-webkey-service/">Web key directory</a> or WKD refers to the method of uploading one's public key to their website in a specific location to make it easily accessible by other services supporting WKD. The key will be discoverable using an identifier similar to an email address: <strong>username@domain.org</strong>.</p>

<p>The benefit of WKD is having full control over the key while still having it widely available. It does however require a domain and some form of file hosting. Luckily, <a href="https://keys.openpgp.org/about/usage#wkd-as-a-service">openpgp.org</a> have made a WKD-as-a-service. Read more at the end of the guide.</p>

<p>It exists in two variants: the Direct setup and the Advanced setup. Despite their names, both require roughly the same steps.</p>

<h3>The Direct setup</h3>

<p>To make your keys available via WKD using the Direct setup, you'll need two paths on your server:</p>

<p><strong>https://domain.org/.well-known/openpgpkey/policy</strong>: this is an empty file</p>
<p><strong>https://domain.org/.well-known/openpgpkey/hu/LOCALPART</strong>: this is the binary public key (so NOT ASCII armored)</p>

<p>The LOCALPART above is actually the username hashed using the SHA-1 algorithm and encoded using the Z-Base-32 method. As it's not humanly possible to compute this by ourselves, Keyoxide provides a <a href="/util/wkd">small utility to do this for you</a>.</p>

<p>So if you wish to make your key available as <strong>jimothy@dm.com</strong>, according to the <a href="/util/wkd">small utility</a>, the URL would become:</p>
<code>https://dm.com/.well-known/openpgpkey/hu/n9utc41qty791upt63rm5xtiudabmw6m</code>

<h3>The Advanced setup</h3>

<p>While not necessary if the Direct setup works, there is a second setup to make WKD work: the Advanced setup. The paths needed are:</p>

<p><strong>https://openpgpkey.domain.org/.well-known/openpgpkey/domain.org/policy</strong>: this is an empty file</p>
<p><strong>https://openpgpkey.domain.org/.well-known/openpgpkey/domain.org/hu/LOCALPART</strong>: this is the binary public key (so NOT ASCII armored)</p>

<p>Indeed, quite similar to the Direct setup, except for the <strong>openpgpkey</strong> subdomain and the additional <strong>domain.org</strong> in the path of the public key.</p>

<p>The public key for <strong>jimothy@dm.com</strong> would be available at:</p>
<code>https://openpgpkey.dm.com/.well-known/openpgpkey/hu/dm.com/n9utc41qty791upt63rm5xtiudabmw6m</code>

<h3>WKD-as-a-service</h3>

<p>In case hosting is problem, Openpgp.org has a handy <a href="https://keys.openpgp.org/about/usage#wkd-as-a-service">WKD-as-a-service</a>.</p>
