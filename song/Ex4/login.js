const express = require('express');
const dbPool = require('./dbconfig');
const bodyParser = require('body-parser');
const moment = require('moment');
const multer = require('multer');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('views', './view_file');
app.set('view engine', 'jade');
current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
});

console.log('2');
const upload = multer({dest: 'uploads/',storage: storage});

app.get('/', (req, res) =>{
    res.send('success');
});

app.post('/login', (req, res, next)=>{
    console.log('login page');

    dbPool.getConnection((err, conn)=>{
        if(err){
            console.log('err connection : ', err);
            conn.release();
            return next(err);
        }

        let id = req.body.id;
        let password = req.body.password;

        selectQuery = 'SELECT * FROM setest1 WHERE id = ?;';

        conn.query(selectQuery, id, (err, query_result)=>{
            if(err){
                console.log('err qurey : ', err);
                conn.release();
                return next(err);
            }

            let data = query_result[0];
           
            conn.release();

            if(data.password == password){
                console.log('vaild');

                responseObject={
                    "id" : data.id,
                    "password" : data.password,
                    "email" : data.email
                }

                res.status(200);
                res.send(responseObject);
            }

        });

    });
});

app.post('/join', (req, res, next) => {
    console.log('join page');

    dbPool.getConnection((err, conn)=>{
        if(err){
            console.log('err connection : ', err);
            conn.release();
            return next(err);
        }

        let id = req.body.id;
        let password = req.body.password;
        let name = req.body.name;
        let email = req.body.email;

        selectQuery = 'SELECT * FROM setest1 WHERE id = ?;';
        insertQuery = 'INSERT setest1 VALUE (?, ?, ?, ?, ?);';

        conn.query(selectQuery, id ,(err, query_result) => {
            if(err){
                console.log('err query : ', err);
                conn.release();
                return next(err);
            }

            if(query_result.length != 0){
                conn.release();
                res.send(id + ' already exists');
            }

            conn.query(insertQuery, [id, password, email, name, current_datetime], (err, result)=>{
                if(err){
                    console.log('err insertQuery : ', err);
                    return next(err);
                }
                conn.release();
                responseObject = {
                    "msg" : "success",
                    "id" : id,
                    "password" : password,
                    "email": email,
                    "name" : name,
                    "joinDate" : current_datetime
                }
                res.status(200);
                res.send(responseObject);
            });
        });
        
    });

});

app.use(errHandle);

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('img'), (req, res) => {
    console.log('1');
    res.send('upload : ' + req.file);
    console.log(req.file);
});

app.listen(3000, (req, res) =>{
    console.log('Server running... port : 3000');
});

function errHandle(err,req, res, next){
    res.status(500);
    res.send('Error occuer');
}