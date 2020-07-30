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
<p>If you have:</p>

<ul>
    <li>a website that allows users to create accounts</li>
    <li>a messaging platform</li>
    <li>any other type of service that may require users to prove their online identity</li>
</ul>

<p>Then you may be interested in supporting decentralized identity proofs as they allow your users to securely prove their identity across services. Take a look at this [example](guides/service-provider) to find out how two persons can gain more confidence in knowing they are talking to and interacting with the right person in an online world where impersonating is all too easy.</p>

<p>The internet could be a slightly safer place if your service allowed your users to prove their identity. All the service needs to do is make a JSON file available with basic details about the user and set the correct CORS headers.</p>

<p>The <a href="https://github.com/wiktor-k/openpgp-proofs#for-service-providers">documentation</a> on what is precisely required is provided by the original creator of decentralized OpenPGP identity proofs.</p>
