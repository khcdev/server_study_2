var express = require('express')
var app = express()
var path = require('path')
var mysql = require('mysql')
const bodyParser = require('body-parser');
var dbPool = require('./settings/dbconfig');
const moment = require('moment');
var multer = require('multer');
var upload = multer({dest: 'uploads/'}); // 입력한 파일이 uploads/ 폴더에 저장
const router = require('./routes/router');

var storage = multer.diskStorage({
    destination: function(req, file, cb){ // 서버에 저장할 폴더
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){ // 서버에 저장할 폴더명
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storage});

app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, () => {
    console.log('Starting app...');
});

app.use(router);

// 회원가입 화면
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'join.html'))
});

 // 회원가입
 /*
app.post('/join', function(req, res){
    let current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    
    var post  = { PASSWORD: req.body.password, ID: req.body.id, EMAIL: req.body.email, created_at: current_datetime };
    sql = 'INSERT INTO jiwon.user SET ?'
    dbPool.getConnection(function(err, conn){
        conn.query(sql, post, function(err, result){
            console.log(result);
            res.send(result);
        });
    });

});
*/

// 로그인 화면
/*
app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, 'login.html'));
});
*/

// 로그인 되는지 확인
// 이름이 있으면 로그인 가능. 없으면 불가
// 이름으로 로그인 가능여부
// 비밀번호가 틀리면 불가 기능 구현 못함
/*
app.post('/login', function(req, res){
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
                    } */ /*else {
                    res.send({success: true, msg: 'login!!'});
                    }
                //}
            }
        });
    });
});
*/

// 데이터 불러오기
/*
app.get('/user', function(req, res){
    var id = req.query.id
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
});
*/
// 파일 업로드 할 페이지
/*
app.get('/upload', function(req, res){
    res.sendFile(path.join(__dirname, 'upload.html'));
});
*/

// 파일을 업로드 함
app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('upload success!!'+ req.file.filename);
    console.log(req.file);
});

app.use('/users', express.static('uploads'));