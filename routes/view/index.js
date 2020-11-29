const express = require('express');
const router = express.Router();

const mainView = require('./main');
const boardView = require('./board');
const authView = require('./auth');
const regView = require('./register');
const dietView = require('./diet');
const cardioView = require('./cardio');
const weightView = require('./weight');
const mypageView = require('./mypage');

router.use('/', mainView);
router.use('/', boardView);
router.use('/auth', authView);
// router.use('/auth', regView);
router.use('/', regView);
router.use('/', dietView);
router.use('/', cardioView);
router.use('/', weightView);
router.use('/', mypageView);

module.exports = router;