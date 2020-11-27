var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mysql = require('mysql');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'test1'
});
conn.connect();


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'asdlfkl!@$SD!@fsdqwe',
    resave: false,
    saveUninitialized: true,
    store:new MySQLStore({
        host:'localhost',
        port: 3306,
        user:'root',
        password:'12345',
        database:'test1'
    })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var check_login = "로그인";

//==================passport 로그인 구현=====================
passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.authId);
  });

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    var sql = 'SELECT * FROM users WHERE authId=?';
    conn.query(sql, [id], function(err, results){
        if(err){
            console.log(err);
            done('There is no user.');
        } else {
            done(null, results[0]);
        }
    });
});
passport.use(new LocalStrategy(
    function( username, password, done){
      var uname = username;
      var pwd = password;
      var sql = 'SELECT * FROM users WHERE authId=?';
      conn.query(sql, [uname], function(err, results){
        if(err){
          return done(null, false, {message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
        }
        if(!results.length){
            console.log('invalid id, pw');
            return done(null, false, {message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
        }
            
        var user = results[0];
        console.log(results[0]);
        if(results[0].authId === uname && results[0].password === pwd){
            check_login = "로그아웃";
            console.log('login success', user);
            done(null, user);
        }
        else
            done(null, false, {message: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
      });
    }
));

//   -------------------메인페이지--------------------
app.get('/', function(req, res){
    var url_ = '';
    if(check_login === "로그아웃")
        url_ = '/auth/logout';
    else
        url_ = 'auth/login';
    var output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>
    <body>
        <!-- title -->
        <div class="jumbotron text-center" style="margin-bottom:0">
        <a href="/">
            <h1>Health Gallery</h1>
        </a>
            <p>This website helps your fitness</p>
        
        </div>
    
        <!-- menu -->
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark"><!--justify-content-center-->
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">자유게시판</a>
                    </li>
                    <li class="nav-item dropdown col-sm-5" >
                        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            운 동
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">다이어트</a>
                            <a class="dropdown-item" href="#">웨이트</a>
                            <a class="dropdown-item" href="#">유산소</a>
                        </div>
                    </li>
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href=${url_}>${check_login}</a>
                    </li>
        
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">회원가입</a>
                    </li>
        
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">마이페이지</a>
                    </li>
                </ul>
            </div>
        </nav> 
    </body>
    </html>
    `;
    res.send(output);
  });

//-----------------로그인 기능--------------
app.post('/act_login', passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true
    }
  )
);



// -------------------로그인--------------------
app.get('/auth/login', function(req, res){
    var fmsg = req.flash();
    var feedback = '';
    if(fmsg.error){
        feedback = fmsg.error[0];
    }
    var output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>
    <body>
        <!-- title -->
        <div class="jumbotron text-center" style="margin-bottom:0">
        <a href="/">
            <h1>Health Gallery</h1>
        </a>
            <p>This website helps your fitness</p> 
        </div>
    
        <!-- menu -->
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark"><!--justify-content-center-->
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">자유게시판</a>
                    </li>
                    <li class="nav-item dropdown col-sm-5" >
                        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            운 동
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">다이어트</a>
                            <a class="dropdown-item" href="#">웨이트</a>
                            <a class="dropdown-item" href="#">유산소</a>
                        </div>
                    </li>
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">로그인</a>
                    </li>
        
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">회원가입</a>
                    </li>
        
                    <li class="nav-item col-sm-5">
                        <a class="nav-link" href="#">마이페이지</a>
                    </li>
                </ul>
            </div>
        </nav>
          
        <!-- content -->
        <div class="container" style="margin-top:5%">
            <div class="container"  style="display: inline-block;text-align: center">
            <h3>Login</h3>
            <form action="/act_login" method="POST">
                <div class="col"style="width: 45%; text-align:center; margin-left:27.5%">
                    <input type="text" class="form-control form-control-lg" placeholder="아 이 디" name="username" >
                </div>
                <br>
                <div class="col"style="width: 45%; text-align:center; margin-left:27.5%">
                    <input type="password" class="form-control form-control-lg" placeholder="비밀번호" name="password">
                </div>
                <br>
                <div>
                    <p style="color:red;">${feedback}</p>
                </div>
                <div class="col"style="width: 45%; text-align:center; margin-left:27.5%">
                    <button class="btn btn-primary btn-block btn-lg">로그인</button>
                </div>
                
            </form>
        </div>
        </div>
    
        
    </body>
    </html>
    `;
    res.send(output);
  });

//   -------------------로그아웃--------------------
app.get('/auth/logout', function(req, res){
    check_login = "로그인";
    req.logout();
    req.session.save(function(){
      res.redirect('/');
    });
  });

  

  app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
  });




