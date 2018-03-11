const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbPool = require('./settings/dbconfig');
const moment = require('moment');

app.use(bodyParser.urlencoded({extended: false}));

current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
app.listen(3000, () => {
    console.log('server is running .. port : 3000')
});

app.get('/', (req,res) => {
    return {msg: hi};
});

app.post('/login', (req,res) =>{
    if (!req.body){
        res.status(400).send('login info invalid');
    }

    dbPool.getConnection(function(err, conn) {
        if (err) {
            console.log('error connecting : ', err);
            conn.release();
            return res.status(400).send('conn error');
        }
        let email = req.body.email;
        let password = req.body.password;

        getLoginInfoSql = 
        'select * ' +
        'from user ' +
        'where email = ?;';

        conn.query(getLoginInfoSql, email, function(err, query_result){
            if (err) {
                console.log('query error : ', err);
                conn.release();
                return res.status(400).send('conn error');
            }
            let data = query_result[0];

            conn.release();
            if (data.password == password) console.log('valid');
            
            responseObjenct = {
                "msg": "success",
                "last_login": data.last_login
            }
            res.status(200).send(responseObjenct)
        });
    });

});

app.post('/account', (req,res) =>{
    if (!req.body){
        res.status(400).send('login info invalid');
    }

    dbPool.getConnection(function(err, conn){
        if (err) {
            console.log('error connecting : ', err);
            conn.release();
            return res.status(400).send('conn error');
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
                [email, password, name, current_datetime],
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
                return res.status(400).send('email already exist');
            }
            
        });
        
        
    });
});