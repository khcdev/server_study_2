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

class Controller{}

Controller.joinMain = function(req, res){
    let current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    
    
    var cipher = crypto.createCipher('aes256', 'password');
    cipher.update(req.body.id+req.body.password+current_datetime, 'ascii', 'hex');
    var cipherd = cipher.final('hex');


    var post  = { PASSWORD: req.body.password, ID: req.body.id, EMAIL: req.body.email, created_at: current_datetime, auth_token:cipherd };
    
    sql = 'INSERT INTO jiwon.user SET ?'
    dbPool.getConnection(function(err, conn){
        conn.query(sql, post, function(err, result){
            console.log(result);
            res.send(result);
            res.send({mag: ''});
        });
    });
}

Controller.loginMain = function(req, res){
    res.sendFile(path.join(__dirname, '../login.html'));
}

Controller.loginCheck = function(req, res){
    var id = req.body.id;
    var password = req.body.passowrd;

    
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
                    } */else {
                    res.send({success: true, msg: 'login!!'});
                    }
                //}
            }
        });
    });
}

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

Controller.uploadMain = function(req, res){
    res.sendFile(path.join(__dirname, '../upload.html'));
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