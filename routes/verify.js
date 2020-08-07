var router = require('express').Router();

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
