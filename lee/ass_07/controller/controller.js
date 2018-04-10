var express = require('express')
var app = express()
var mysql = require('mysql');
const bodyParser = require('body-parser');
var dbPool = require('../settings/dbconfig');
const moment = require('moment');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: '../uploads/'});
var crypto = require('crypto');
var http = require('http');
var cookieParser = require('cookie-parser');

var storage = multer.diskStorage({
    destination: function(req, file, cb){ // 서버에 저장할 폴더
        cb(null, '../uploads/');
    },
    filename: function(req, file, cb){ // 서버에 저장할 폴더명
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storage});

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

class Controller{}

// 회원가입
Controller.joinMain = function(req, res){
    let current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var post  = { PASSWORD: req.body.password, ID: req.body.id, EMAIL: req.body.email, created_at: current_datetime };
    
    sql = 'INSERT INTO jiwon.user SET ?'
    dbPool.getConnection(function(err, conn){
        conn.query(sql, post, function(err, result){
            console.log(result);
            res.send(result);
        });
    });
}

// 로그인 화면
Controller.loginMain = function(req, res){
    res.sendFile(path.join(__dirname, '../login.html'));
}

// 로그인 체크
// 로그인 되는지 확인
// 이름이 있으면 로그인 가능. 없으면 불가
// 이름으로 로그인 가능여부
// 비밀번호가 틀리면 불가 기능 구현 못함
Controller.loginCheck = function(req, res){
    var id = req.body.id;
    var password = req.body.passowrd;

    let current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    var cipher = crypto.createCipher('aes256', 'password');
    cipher.update(req.body.id+'/'+req.body.password+'/'+current_datetime, 'ascii', 'hex');
    var cipherd = cipher.final('hex');
    
    sql_post = 'UPDATE jiwon.user SET auth_token = ?, login_at = ? WHERE id = ?'
    sql = 'SELECT * FROM jiwon.user WHERE ID = ?';

    dbPool.getConnection(function(req, conn){
        conn.query(sql, id, function(err, result){
            if(err){
                throw err;
            }
            else{
                if (result.length === 0) { 
                    res.send({success: false, msg: '해당 유저가 존재하지 않습니다.'})
                } /*else { // 아직 구현 못함 // 비밀번호가 다를 때
                    if (result === password) {
                        res.send({success: false, msg: '비밀번호가 일치하지 않습니다.'});
                    } */ else {
                        dbPool.getConnection(function(req, conn){
                            conn.query(sql_post, [cipherd, current_datetime, id], function(err, result){
                                console.log('user login success!');
                            });
                        });
                        res.cookie('cookie', cipherd);
                        console.log('cookie : ' + cipherd);
                        res.send({success: true, msg: 'login!!'});
                    }
                //}
            }
        });
    });
}

// 사용자 정보 확인
Controller.userCheck = function(req, res){
    var id = req.query.id;
    console.log(id);
    sql = 'SELECT * FROM jiwon.user WHERE ID = ?';
    dbPool.getConnection(function(err, conn){
        conn.query(sql, id, function(err, result){
             if (result.length === 0) {
                res.send({success: false, msg: '해당 유저가 존재하지 않습니다.'})
            } else{
                console.log(result);
                res.send(result);
            }
        });
    });
}

// 파일 업로드 화면
Controller.uploadMain = function(req, res){

    var login_cookie = req.cookies.cookie;
    
    //로그인을 해서 쿠키 확인이 되어야 화면 업로드
    sql = 'SELECT * FROM jiwon.user WHERE auth_token = ?';
    dbPool.getConnection(function(err, conn){
        conn.query(sql, login_cookie, function(err, result){
            if (result.length === 0) {
                res.send({success: false, msg: '로그인을 해주세요.'})
            } else{
                console.log('upload page~');
                res.sendFile(path.join(__dirname, '../upload.html'));
            }
        });
    });
}

/*
Controller.uploadPage = function(req, res){
    upload.single('userfile');
    res.send('upload success!!'+ req.file.filename);
    console.log(req.file);
}
*/
app.use('/users', express.static('uploads'));

module.exports = Controller;