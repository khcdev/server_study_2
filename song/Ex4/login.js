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

app.get('/login/:id', (req, res) => {
    var url = req.url;
    var id = url.split('/')[2];

    con.query('SELECT * FROM setest1 WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;

        console.log('The soultion is: ', rows);
        res.send(rows);
    });
});

app.post('/join', (req, res) => {
        var userid = req.body.userid;
        var userpw = req.body.userpw;
        var username = req.body.username;

        var user={
            userId : userid,
            userPw : userpw,
            userName : username
        };


    var sql = "INSERT INTO setest1 SET ?";
    con.query(sql, user, (err, result) => {
        if(err){
            err.code = 500;
            res.send(err);
        }
        res.send({msg : 'success'});
    });

});

app.listen(3000);

