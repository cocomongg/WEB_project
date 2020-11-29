const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/cardio', async function(req, res) {
    let head = '';
    if(req.user === undefined)
        head = 'head_login';
    else
        head = 'head_logout';
    res.render('cardio.ejs', {page: head});
});


module.exports = router;