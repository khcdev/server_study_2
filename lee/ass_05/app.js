var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var multer = require('multer');
var upload = multer({dest: 'uploads/'}); // 입력한 파일이 uploads/ 폴더에 저장

app.listen(3000, () =>{
    console.log('Starting app...');
});

app.get('/upload', function(req, res){
    res.sendFile(path.join(__dirname, 'upload.html'));
});

app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('upload success!!'+ req.file);
    console.log(req.file);
});