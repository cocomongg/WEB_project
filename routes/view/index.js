const express = require('express');
const router = express.Router();

const mainView = require('./main');
const boardView = require('./board');
const authView = require('./auth');

router.use('/', mainView);
router.use('/', boardView);
router.use('/auth', authView);

module.exports = router;