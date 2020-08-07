var router = require('express').Router();

router.get('/wkd/:input', function(req, res) {
    res.render('profile', { mode: "wkd", uid: req.params.input })
});

router.get('/hkp/:input', function(req, res) {
    res.render('profile', { mode: "hkp", uid: req.params.input })
});

router.get('/keybase/:username/:fingerprint', function(req, res) {
    res.render('profile', { mode: "keybase", uid: `${req.params.username}/${req.params.fingerprint}` })
});

router.get('/:input', function(req, res) {
    res.render('profile', { mode: "auto", uid: req.params.input })
});

module.exports = router;
