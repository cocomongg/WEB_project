const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/weight', async function(req, res) {
    let head = '';
    if(req.user === undefined)
        head = 'head_login';
    else
        head = 'head_logout';
    res.render('weight.ejs', {page: head});
});


module.exports = router;