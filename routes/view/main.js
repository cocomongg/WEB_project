const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    let head = '';
    if(req.user === undefined)
        head = 'head_login';
    else
        head = 'head_logout';
    res.render('index', {page: head});
});

module.exports = router;