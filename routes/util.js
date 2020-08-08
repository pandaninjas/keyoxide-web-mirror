var router = require('express').Router();

router.get('/profile-url', function(req, res) {
    res.render('util/profile-url')
});
router.get('/profile-url/:input', function(req, res) {
    res.render('util/profile-url', { input: req.params.input })
});

router.get('/qr', function(req, res) {
    res.render('util/qr')
});
router.get('/qr/:input', function(req, res) {
    res.render('util/qr', { input: req.params.input })
});

router.get('/qrfp', function(req, res) {
    res.render('util/qrfp')
});
router.get('/qrfp/:input', function(req, res) {
    res.render('util/qrfp', { input: req.params.input })
});

router.get('/wkd', function(req, res) {
    res.render('util/wkd')
});
router.get('/wkd/:input', function(req, res) {
    res.render('util/wkd', { input: req.params.input })
});

module.exports = router;
