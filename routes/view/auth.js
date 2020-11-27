const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/login', async function(req, res) {
    res.render('sign.ejs');
});


module.exports = router;