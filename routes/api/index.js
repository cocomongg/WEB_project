const express = require('express');
const router = express.Router();

const DocumentAPI = require('./document');
const AuthAPI = require('./auth');

router.use('/doc', DocumentAPI);
router.use('/auth', AuthAPI);

module.exports = router;