const express = require('express');
const dbPool = require('./setting/dbConfig');
const bodyParser = require('body-parser');
const moment = require('moment');
const multer = require('multer');

const app = express();

//destination -> file이 어디에 저장이 될지 정해주는 key값
//filename -> destination에서 지정한 폴더에 저장할 때에 file의 이름을 정해주는 key값
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'uploads/');
    },
    filename: (req, file, callback)=>{
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage});
//const upload = multer({dest: 'uploads/'});  
//upload한 file을 폴더에서 uploads 폴더에 저장하도록 지정해주는 것이다.

app.set('views', './view');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandle);

current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

app.get('/', (req, res) => {
    console.log('connecting Server~~~ port:3000');
    res.render('moveLogin');
});

app.get('/nidlogin', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
    console.log('success login');

    dbPool.getConnection((err, conn) => {
        if (err) {
            console.log('err connection ', err);
            conn.release();
            return next(err);
        }


        let id = req.body.id;
        let password = req.body.password;

        selectQuery = 'SELECT * FROM setest1 WHERE id = ?;';

        conn.query(selectQuery, id, (err, qurey_result) => {
            if (err) {
                conn.release();
                console.log('err query : ', err);
                return next(err);
            }

            let data = qurey_result[0];

            conn.release();

            if (data.password == password) {
                console.log('vaild');

                responseObject = {
                    'id': data.id,
                    'password': data.password,
                    'email': data.email,
                    'name': data.name,
                    'joindate': data.joindate
                }

                res.status(200);
                res.send(responseObject);

            }

        });
    });

});

app.get('/join', (req, res) => {
    res.render('join');
});

app.post('/initjoin', (req, res, next) => {
    console.log('start join Membership');

    dbPool.getConnection((err, conn) => {
        if (err) {
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

        conn.query(selectQuery, id, (err, qurey_result) => {
            if (err) {
                console.log('err qurey : ', err);
                conn.release();
                return next(err);
            }
            
            //length가 0이 아니면 이미 존재하는 회원이다.
            if (qurey_result.length != 0) {
                conn.release();
                return res.send(id + ' already exists');
            } else {
                conn.query(insertQuery, [id, password, email, name, current_datetime], (err, result) => {
                    if (err) {
                        console.log('err insertQurey : ', err);
                        return next(err);
                    }

                    conn.release();
                    responseObject = {
                        "msg": "success",
                        "id": id,
                        "password": password,
                        "email": email,
                        "name": name,
                        "joinDate": current_datetime
                    }
                    console.log('success join membership');
                    res.status(200);
                    res.send(responseObject);
                });
            }

        });
    });
});

//upload.single('avatar') -> middleare : req.file proprety를 암시해준다.
//avartar -> file을 받는 변수 명   
app.post('/profile', upload.single('avatar'), (req, res, next) => {

    console.log('success upload file '+ req.file.filename);
    res.send(req.file.filename);
});

app.listen(3000);

function errorHandle(err, req, res, next) {
    res.status(500);
    res.send('Error occuer');
};