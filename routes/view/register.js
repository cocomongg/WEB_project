const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/register', async function(req, res) {
    res.render('signup.ejs', {page: 'head_login'});
});


module.exports = router;