const express = require('express');
const dbPool = require('./dbConfig');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('success');
});

app.post('/login', (req, res) => {
    res.send('Login Page');

    dbPool.getConnection((err, conn) => {
        if (err) {
            console.log('err connection : ', err);
            conn.release();
            return res.status(400).send('conn err');
        }
        let id = req.body.id;
        let password = req.body.password;

        getLoginSql = 'SELECT * FROM setest1 WHERE id = ?';

        conn.query(getLoginSql, id, (err, query_result) => {
            if (err) {
                console.log('query error : ', err);
                conn.release();
                return res.status(400).send('conn error');
            }
            let data = query_result[0];
            
            conn.release();
            if (data.password == password)
                console.log('vaild');
        });

    });

});


app.post('/join', (req, res) => {
    if (!req.body) {
        res.status(400).send('join info invalid');
    }

    dbPool.getConnection((err, conn) => {
        if (err) {
            console.log('error connecting : ', err);
            conn.release();
            return res.status(400).send('conn error');
        }
        let id = req.body.id;
        let password = req.body.password;
        let email = req.body.email;

        getEmailSql =
            'select * ' +
            'from user ' +
            'where email = ?;';
        insertAccountSql =
            'insert user value ' +
            '(null, ?, ?, ?, null, ?,null);';

        conn.query(getEmailSql, email, (err, result) => {
            if (err) {
                conn.release();
                return res.status(400).send('conn error');
            }
        });

    });

});
app.listen(3000);
