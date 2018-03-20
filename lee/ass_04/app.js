var express = require('express')
var app = express()
var path = require('path')
var mysql = require('mysql')
const bodyParser = require('body-parser');
var dbPool = require('./settings/dbconfig');
const moment = require('moment');

app.use(bodyParser.urlencoded({extended: false}));

let current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

app.listen(3000, () => {
    console.log('Starting app...');
});

// 회원가입 화면
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'join.html'))
});

 //데이터 입력
app.post('/join', function(req, res){
    var post  = { PASSWORD: req.body.password, NAME: req.body.name, EMAIL: req.body.email, DATE: current_datetime };
    sql = 'INSERT INTO jiwon.user SET ?'
    dbPool.getConnection(function(err, conn){
        conn.query(sql, post, function(err, result){
            console.log(result);
            res.send(result);
        });
    });

});


// 로그인 화면
app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 로그인 되는지 확인
// 이름이 있으면 로그인 가능. 없으면 불가
// 이름으로 로그인 가능여부
// 비밀번호가 틀리면 불가 기능 구현 못함
app.post('/login', function(req, res){
    var name = req.body.name;
    var password = req.body.passowrd;

    sql = 'SELECT * FROM jiwon.user WHERE NAME = ?';
    dbPool.getConnection(function(req, conn){
        conn.query(sql, name, function(err, result){
            if(err){
                throw err;
            }
            else{
                if (result.length === 0) {
                    res.send({success: false, msg: '해당 유저가 존재하지 않습니다.'})
                } /*else { // 아직 구현 못함 // 비밀번호가 다를 때
                    if (password != result) {
                        res.send({success: false, msg: '비밀번호가 일치하지 않습니다.'});
                    } */else {
                    res.send({success: true, msg: 'login!!'});
                    }
                //}
            }
        });
    });
});


// 데이터 불러오기
app.get('/user', function(req, res){
    var name = req.query.name
    console.log(name);
    sql = 'SELECT * FROM jiwon.user WHERE NAME = ?';
    dbPool.getConnection(function(err, conn){
        conn.query(sql, name, function(err, result){
            console.log(result);
            res.send(result);
        });
    });
});