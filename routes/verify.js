/*
Copyright (C) 2021 Yarmo Mackenbach

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
*/
const router = require('express').Router();

router.get('/', function(req, res) {
    res.render('verify', { mode: "auto" })
});

router.get('/wkd', function(req, res) {
    res.render('verify', { mode: "wkd" })
});
router.get('/wkd/:input', function(req, res) {
    res.render('verify', { mode: "wkd", input: req.params.input })
});

router.get('/hkp', function(req, res) {
    res.render('verify', { mode: "hkp" })
});
router.get('/hkp/:input', function(req, res) {
    res.render('verify', { mode: "hkp", input: req.params.input })
});

router.get('/plaintext', function(req, res) {
    res.render('verify', { mode: "plaintext" })
});

router.get('/keybase', function(req, res) {
    res.render('verify', { mode: "keybase" })
});
router.get('/keybase/:username', function(req, res) {
    res.render('verify', { mode: "keybase", username: req.params.username })
});
router.get('/keybase/:username/:fingerprint', function(req, res) {
    res.render('verify', { mode: "keybase", username: req.params.username, fingerprint: req.params.fingerprint })
});

router.get('/:input', function(req, res) {
    res.render('verify', { mode: "auto", input: req.params.input })
});

module.exports = router;
