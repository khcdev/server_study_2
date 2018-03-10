const express = require('express');
const mysql = require('mysql');
const app = express();
const dbconfig={
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'serverTest'
};
let con = mysql.createConnection(dbconfig);

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});

app.get('/login',(req, res) => {
    res.send('<h1>Log in Page</h1>');
});

app.post('/join', (req, res) => {
    let user = {
        'userid' : req.body.userid,
        'userpw' : req.body.userpw,
        'username' : req.body.username
    };

    var qury = con.query('INSERT INTO SETEST1 SET ?', user, (err, result) => {
        if(err){
            console.error(err);
            throw err;
        }
        console.log(qury);
        res.send(200, 'success');
    });

});

app.listen(3000);

