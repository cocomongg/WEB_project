const express = require('express');
const router = express.Router();

const mainView = require('./main');
const boardView = require('./board');

router.use('/', mainView);
router.use('/', boardView);

module.exports = router;