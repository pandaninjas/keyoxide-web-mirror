const router = require('express').Router();
const { check, query, validationResult } = require('express-validator');
const proofVerification = require('../server/proofVerification');

router.get('/verify/proxy', [
  query('url').isURL().exists(),
  query('fingerprint').isHexadecimal().exists(),
  query('checkClaim').escape(),
  query('checkClaimFormat').escape(),
  query('checkRelation').escape().exists(),
  query('checkPath').escape().exists()
], async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    let params = {
        url: req.query.url,
        fingerprint: req.query.fingerprint,
        checkClaim: req.query.checkClaim ? req.query.checkClaim : null,
        checkClaimFormat: req.query.checkClaimFormat ? req.query.checkClaimFormat : "uri",
        checkRelation: req.query.checkRelation,
        checkPath: req.query.checkPath.split(',')
    }

    try {
        const proofResult = await proofVerification.Proxy(params);
        res.status(200).send(proofResult);
    } catch (e) {
        console.log(e);
        res.status(400).send({ success: false, errors: e });
    }
});

router.get('/verify/twitter', [
  query('tweetId').isInt().exists(),
  query('fingerprint').isHexadecimal().exists()
], async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    let params = {
        tweetId: req.query.tweetId,
        fingerprint: req.query.fingerprint
    }

    try {
        const proofResult = await proofVerification.Twitter(params);
        res.status(200).send(proofResult);
    } catch (e) {
        console.log(e);
        res.status(400).send({ success: false, errors: e });
    }
});

module.exports = router;
