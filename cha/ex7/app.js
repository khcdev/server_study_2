const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbPool = require('./settings/dbconfig');
const moment = require('moment');
const multer = require('multer');
const crypto = require('crypto');
const router = require('./router/router')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file ,callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    }
})

const imgUploader =  multer({dest:'uploads/', storage: storage, limits: {fileSize: 10 * 1024 * 1024}});

app.use('/login',bodyParser.urlencoded({extended: false}));
app.use('/account',bodyParser.urlencoded({extended: false}));
app.use('/logintest',bodyParser.urlencoded({extended: false}));
function current_datetime(){
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
} 
app.use(router)
app.post('/login', (req, res, next) =>{
    if (!req.body){
        res.status(400).send('login info invalid');
    }

    dbPool.getConnection((err, conn) => {
        if (err) return next(err);
        
        let email = req.body.email;
        let password = req.body.password;

        getLoginInfoSql = 
        'select * ' +
        'from user ' +
        'where email = ?;';

        conn.query(getLoginInfoSql, email, (err, query_result) => {
            if (err) {
                conn.release();
                return next(err);
            }
            let data = query_result[0];

            
            if (data.password == password){
                console.log('valid');
                //let cookie = 
            } 
            
            conn.release();
            responseObjenct = {
                "msg": "success",
                "last_login": data.last_login
            }
            res.status(200).send(responseObjenct)
        });
    });

});

app.post('/account', (req,res, next) =>{
    if (!req.body){
        res.status(400).send('login info invalid');
    }

    dbPool.getConnection(function(err, conn){
        if (err) {
            return next(err);
        }
        let email = req.body.email;
        let password =  req.body.password;
        let name = req.body.name;

        getEmailSql = 
            'select * ' +
            'from user ' +
            'where email = ?;';
        insertAccountSql = 
            'insert user value ' +
            '(null, ?, ?, ?, null, ?,null);';
        conn.query(getEmailSql, email ,function(err,result){
            if (err){
                conn.release();
                return res.status(400).send('conn error');
            }
            if (result.length == 0){
                conn.query(
                insertAccountSql,
                [email, password, name, current_datetime()],
                function(err,result){
                    if (err){
                        conn.release();
                        return res.status(400).send('conn error');
                    }
                    conn.release();
                    responseObjenct = {
                        "msg": "success",
                        "email": email,
                        "password": password,
                        "name": name
                    }
                    res.status(200).send(responseObjenct)
                });
            }
            else{
                conn.release();
                res.status(400).send('email already exist');
            }
            
        });
        
        
    });
});

app.post('/image', imgUploader.single('img'), (req,res) => {
    console.log(req.file);
    res.status(200).send('img')
});

app.use((err, req, res, next)=>{
    console.error(err)
    res.status(500).send('error occured');
});

app.listen(3000, () => {
    console.log('server is running .. port : 3000')
});