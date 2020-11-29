const express = require('express');
const router = express.Router();

const db = require('../../models');

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



// var check_login = "로그인";

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        async function (req, username, password, done) {
            let user;
            try {
                user = await db.User.findOne({ //find user via username
                    where: { username }
                });
            } catch (err) {
                return done(err, false);
            }

            if (!user) { //user exist?
                return done(false, null, {
                    message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'        //message: 'user not exist'
                });
            }

            console.log(user);

            let compareResult = bcrypt.compareSync(password, user.password);
            if (compareResult) { //passowrd correct?
                return done(null, {
                    id: user.id,
                    username: user.username,
                    isMan: user.isMan
                }); //if user is not blocked, return true
            } else
                return done(false, null, {
                    message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.' //message: 'password error'
                });
        }));

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(async function (user, done) {
    let _user;
    try {
        _user = await db.User.findOne({ //find user via id
            where: { id: user.id }
        });
    } catch (err) {
        return done(false, null);
    }

    if (!_user) { return done(false, null); } //if user is null, return fail
    done(null, _user);
});

router.get('/logout', function (req, res) { //logout..
    req.logout();
    res.redirect('/');
}
);

router.post('/signin',
    passport.authenticate( //local authenticate...
        'local',
        {   successRedirect: '/',
            failureRedirect: '/auth/login' ,
            failureFlash: true} //if falid, redirect login page
    ), function (req, res) {
        res.redirect('/');
    }
);

router.get('/check/username/:username', async function (req, res) {
    try {
        let username = req.params.username;
        let user = await db.User.findOne({ //find user via username
            where: { username }
        });

        if (user) //user exist?
            res.sendStatus(218);
        else
            res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

router.post('/signup', async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let birth = req.body.birth;
    let isMan = req.body.isMan;

    if (!username) { res.sendStatus(400); return; }
    if (!password) { res.sendStatus(400); return; }
    if (!name) { res.sendStatus(400); return; }
    if (!birth) { res.sendStatus(400); return; }
    if (!isMan) { res.sendStatus(400); return; }
    //check field is valid

    let usernameCheck;
    try { //find newbie is overlap?
        console.log("check");
        usernameCheck = await db.User.findOne({
            where: { username }
        });
    } catch (err) {
        return res.sendStatus(500);
    }

    if (usernameCheck) { //if is overlap...
        return res.sendStatus(403);;
    }
    console.log(username, password, name, birth, isMan);

    try { //make user database
        let saltRounds = 7;
        let cryptedPassword = bcrypt.hashSync(password, saltRounds); //encrypt user password

        console.log('여기까진 됨');
        await db.User.create({
            username,
            password: cryptedPassword,
            name,
            birth,
            isMan
        });

        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
