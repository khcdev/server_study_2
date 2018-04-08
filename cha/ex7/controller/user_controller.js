const moment = require('moment');
const { getDBConnection } = require('../common_logic/utils');
const crypto = require('crypto');

const key = 'Twjfid2491Qjdgtje@5fjdiy_rqw=='

function current_datetime(){
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
}
exports.userLogin = async (req, res, next) => {
    const conn = await getDBConnection();
    
    getLoginInfoSql = 
    'select * ' +
    'from user ' +
    'where email = ?;';
    
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)
    resultUserInfo = (conn, getLoginInfoSql, email, password) => {
        return new Promise((resolve, reject) => {
            conn.query(getLoginInfoSql, email, (err, query_result) => {
                if (err) {
                    return reject(err);
                }
                resolve(query_result)
            });
        });
    }
    data = await resultUserInfo(conn, getLoginInfoSql, email, password)
    
    if (data[0].password == password){
        console.log('valid');
        let rawUserInfo = email + '/' + password + '/' + data[0].id + '/' + Date.now();
        lastLoginDate = new Date(Date.now())
        let cipher = crypto.createCipher('aes-128-cbc', key);
        let encrypted_info = cipher.update(rawUserInfo,'utf8', 'hex');
        encrypted_info += cipher.final('hex'); 
        console.log(encrypted_info);
        updateUserInfo = (conn, uId, lastLoginDate, encrypted_info) => {
            return new Promise((resolve, reject) => {
                conn.query('update user set auth_token = ?, last_login = ? where id = ?',
                    [encrypted_info, lastLoginDate, uId],
                    (err, query_result) => {
                        if (err) return reject(err);
                        resolve(query_result);
                });
            });
        }
        await updateUserInfo(conn, data[0].id, lastLoginDate, encrypted_info)
        res.cookie('TestCookie', encrypted_info, {maxAge: 900000, httpOnly: true});
        let decipher = crypto.createDecipher('aes-128-cbc', key);
        let descrypted_info = decipher.update(encrypted_info, 'hex', 'utf8');
        descrypted_info += decipher.final('utf8');
        console.log(descrypted_info);
        //let cookie =  
    } 
    responseObjenct = {
        "msg": "success",
        "last_login": data.last_login
    }
    console.log(res);
    res.status(200).send(responseObjenct)
}

exports.newUser = async (req, res, next) => {
    conn = await getDBConnection();
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
}