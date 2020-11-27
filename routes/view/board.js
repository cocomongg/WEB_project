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
            include: db.User,
            order: [
                ['id', 'DESC']
            ]
        });

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

router.get('/board/doc/:id', async function(req, res) {
    let docId = req.params.id;

    try {
        let doc = await db.Document.findOne({
            include: db.User,
            where: {
                id: docId
            }
        });

        if (!doc)
            return res.status(404).render('error/404.html');
        else
            res.render('document.ejs', document=doc);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = router;