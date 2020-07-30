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
<h3>Decentralized OpenPGP identity proofs</h3>

<p>Decentralized OpenPGP identity proofs are the brainchild of Wiktor who wrote the original guide on <a href="https://metacode.biz/openpgp/proofs">his website</a> (a suggested read to get first-hand information).</p>

<p>Unlike proofs provided by for example <a href="https://keybase.io">Keybase</a>, OpenPGP proofs are stored inside the PGP keys themselves instead of being mere signatures. Since this operation requires keys with "certify" capabilities and not simply "sign" capabilities, these OpenPGP proofs could be considered more secure.</p>

<h3>Example</h3>

<ul>
    <li>Alice and Bob have been talking for years on service A. Alice already has an account on service B. Bob wants to move to service B as well. A simple decentralized proof confirms that the person who is known as Alice on service A is also known as Alice on service B. Bob can safely move to service B and talk to Alice without having to meet in person to confirm their accounts.</li>
    <li>Alice has received a friend request from Bob29 on service C. Is this the same Bob from service A or not? A simple decentralized proof confirms that the person who is known as Bob on platform A is also known as Bob29 on service C. Turns out 28 Bobs were already using service C.</li>
    <li>Bob has been invited by an account named Alyce to create an account on an unknown server. Is this a legit request? A simple decentralized proof tells Bob that Alice does not have such an account. Bob knows something is up and does not click the link possibly sent by an imposter.</li>
</ul>

<h3>What an OpenPGP proof looks like</h3>

<p>Every OpenPGP identity proof is stored in the PGP key as a notation that looks like this:</p>
<code>proof@metacode.biz=https://twitter.com/USERNAME/status/1234567891234567891</code>

<p>This particular proof is for a Twitter account (read more in the <a href="/guides/twitter">Twitter guide</a>). Let's analyse the notation:</p>

<ul>
    <li><strong>proof</strong> means the current notation is for an identity proof.</li>
    <li><strong>@metacode.biz</strong> is the domain of the person who came up with OpenPGP proofs and serves as a namespace for the notation. The domain is included and used for all proofs to comply with the <a href="https://tools.ietf.org/html/rfc4880#section-5.2.3.16">OpenPGP Message Format standard (RFC 4880)</a>.</li>
    <li><strong>https://twitter.com/USERNAME/status/1234567891234567891</strong> is the value of the notation. It is a link to the piece of online content that contains a pre-defined message which must always include the fingerprint of the PGP key that will hold the proof.</li>
</ul>

<p>The proof should always link to a document that can be parsed as JSON to make the verification easy and feasible by the browser. Sometimes however, due to CORS restrictions or API requirements (as is the case for Twitter), no such link is provided by the platform. In these rare exceptional cases, the verification process is delegated to the Keyoxide server which will communicate directly with the platform's servers to get the content of the post.</p>

<h3>Your turn</h3>

<p>If you'd like to add decentralized OpenPGP identity proofs to your key, go to the <a href="/guides">guides</a> and find the right one for your platform of choice. You may find the process to be remarkably easy.</p>

<p>If your platform is not in the list of <a href="/guides">guides</a>, it's not supported yet. See the <a href="/guides/contributing">contributing guide</a> for more information on how to get that platform supported.</p>
