const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/login', async function(req, res) {
    let fmsg = req.flash();
    let feedback = '';
    if(fmsg.error){
        feedback = fmsg.error[0];
    }
    res.render('sign.ejs', {page: 'head_login', msg: feedback});
});


module.exports = router;