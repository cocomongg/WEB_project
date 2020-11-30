const express = require('express');
const router = express.Router();

const db = require("../../models");

router.get('/', async function(req, res) {
    res.render('index.ejs');
});

router.get('/board', async function(req, res) {
    let document;
    let head;
    if(req.user === undefined)
        head = 'head_login';
    else
        head = 'head_logout';
    try {
        document = await db.Document.findAll({
            include: db.User,
            order: [
                ['id', 'DESC']
            ]
        });

        // res.render('board.ejs', documents=document, {page: head});
        res.render('board.ejs', {page: head, documents: document});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/board/write', async function(req, res) {
    let head;
    if(req.user === undefined) {
        head = 'head_login';
        return res.send('<script>alert("로그인이 필요합니다.");location.href="/auth/login";</script>');
    }       
    else
        head = 'head_logout';
    res.render('board_w.ejs', {page: head});
});

router.post('/board/write', async function(req, res) {
    let title = req.body.title;
    let content = req.body.contents;

    if (!req.user)
        return res.send('<script>alert("로그인이 필요합니다.");location.href="/auth/login";</script>');;

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
    let head;
    if(req.user === undefined)
        head = 'head_login';
    else
        head = 'head_logout';

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
            res.render('document.ejs', {page: head, document: doc});
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = router;