const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/', async function(req, res) {
    res.render('index.ejs');
});

router.get('/board', async function(req, res) {
    let document;

    try {
        document = await db.Document.findAll({
            order: [
                ['id', 'DESC']
            ]
        });

        console.log(document);

        res.render('board.ejs', documents=document);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/board/write', async function(req, res) {
    res.render('board_w.ejs');
});

router.post('/board/write', async function(req, res) {
    let title = req.body.title;
    let content = req.body.contents;

    if (!req.user)
        return res.status(404).send('로그인을 해 주십시오');

    let userId = req.user.id;

    try {
        await db.Document.create({
            title,
            content,
            userId
        });

        res.redirect('/board');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;