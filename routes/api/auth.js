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
    let password2 = req.body.password2;
    let name = req.body.name;
    let birth = req.body.birth;
    let isMan = req.body.isMan;

    if(password !== password2) {return res.send("<script>alert('입력한 패스워드가 틀립니다'); location.href='/register'</script>");}

    if (!username){return res.send("<script>alert('모든 정보를 입력해주세요'); location.href='/register'</script>");}

    if (!password) {return res.send("<script>alert('모든 정보를 입력해주세요'); location.href='/register'</script>");}
    if (!password2) {return res.send("<script>alert('모든 정보를 입력해주세요'); location.href='/register'</script>");}
    if (!name) {return res.send("<script>alert('모든 정보를 입력해주세요'); location.href='/register'</script>");}
    if (!birth) {return res.send("<script>alert('모든 정보를 입력해주세요'); location.href='/register'</script>");}
    if (!isMan) {return res.send("<script>alert('모든 정보를 입력해주세요'); location.href='/register'</script>");}
    //check field is valid


    let usernameCheck;
    try { //find newbie is overlap?
        console.log("check");
        usernameCheck = await db.User.findOne({
            where: { username }
        });
    } catch (err) {
        return res.send("<script>alert('정보를 다시 입력해주세요'); location.href='/register'</script>");
    }

    if (usernameCheck) { //if is overlap...
        return res.send("<script>alert('이미 존재하는 아이디 입니다'); location.href='/register'</script>");
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

        // res.sendStatus(201);
        return res.send("<script>alert('회원가입을 축하드립니다!'); location.href='/'</script>");
    } catch (err) {
        return res.send("<script>alert('정보를 다시 입력해주세요'); location.href='/register'</script>");
    }
});

module.exports = router;
