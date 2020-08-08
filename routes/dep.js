const router = require('express').Router();

router.get('/openpgp.min.js', function(req, res) {
    res.sendFile(`node_modules/openpgp/dist/openpgp.min.js`, { root: `${__dirname}/../` })
});

module.exports = router;
