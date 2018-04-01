const moment = require('moment');
const { getDBConnection } = require('../common_logic/utils');
const crypto = require('crypto');

const key = 'Twjfid2491Qjdgtje@5fjdiy_rqw=='

exports.userLogin = async (req, res, next) => {
    const conn = await getDBConnection();
    
    getLoginInfoSql = 
    'select * ' +
    'from user ' +
    'where email = ?;';
    
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)
    q_result = (conn, getLoginInfoSql, email, password) => {
        return new Promise((resolve, reject) => {
            conn.query(getLoginInfoSql, email, (err, query_result) => {
                if (err) {
                    return reject(err);
                }
                resolve(query_result)
            });
        });
    }
    data = await q_result(conn, getLoginInfoSql, email, password)
    
    if (data[0].password == password){
        
        console.log('valid');
        let rawUserInfo = email + '/' + password + '/' + data[0].id + '/' + Date.now();
        let cipher = crypto.createCipher('aes-128-cbc', key);
        let encrypted_info = cipher.update(rawUserInfo,'utf8', 'hex');
        encrypted_info += cipher.final('hex'); 
        console.log(encrypted_info);

        let decipher = crypto.createDecipher('aes-128-cbc', key);
        console.log(1);
        let descrypted_info = decipher.update(encrypted_info, 'hex', 'utf8');
        console.log(1);
        descrypted_info += decipher.final('utf8');
        console.log(descrypted_info);
        //let cookie =  

    } 
    responseObjenct = {
        "msg": "success",
        "last_login": data.last_login
    }

    res.status(200).send(responseObjenct)
}