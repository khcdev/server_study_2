var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var multer = require('multer');
var upload = multer({dest: 'uploads/'}); // 입력한 파일이 uploads/ 폴더에 저장

var storage = multer.diskStorage({
    destination: function(req, file, cb){ // 서버에 저장할 폴더
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){ // 서버에 저장할 폴더명
        cb(null, file.originalname);
    }
})

var upload = multer({storage:storage});

app.listen(3000, () =>{
    console.log('Starting app...');
});

// 파일 업로드 할 페이지
app.get('/upload', function(req, res){
    res.sendFile(path.join(__dirname, 'upload.html'));
});

// 파일을 업로드 함
app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('upload success!!'+ req.file.filename);
    console.log(req.file);
});

app.use('/users', express.static('uploads'));