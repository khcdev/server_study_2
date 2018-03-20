var mysql = require('mysql');
var express = require('express');
var app = express();
var routes = require('routes');
var moment = require('moment');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'nuri2387',
  port : 3306,
  database : 'memberinfo'
});

app.use(bodyParser.urlencoded({extended: false}));

current_datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

var server = app.listen(3000);

connection.connect(function(err){
  if(err){
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

//connection.query('INSERT ')

//login
app.post('/login', function(req,res){
  if(!req.body){
    res.status(400).send('plz insert login info!');
  }
  let email = req.body.email;
  let password = req.body.password;

  //let query = connection.query('SELECT * FROM USERS WHERE USER_EMAIL = ?;', email, function(err,result){


  let query = 'SELECT * '+'FROM USERS '+'WHERE USER_EMAIL = ?;';
  console.log('original is.. '+query);
  console.log('email is.. '+email);
  console.log('password is.. '+password);
  connection.query(query, email, function(err,result){
    if(err){
      console.error(err);
      throw err;
    }
    console.log('query is : '+query);
    console.log('result is : '+result);
    let data = result[0];


    //check_point

    console.log('check_point_1');

    if(data.USER_PASSWORD == password){
      console.log('valid password');
      /*var responseObject = {
        "msg" : "success",
        "last_login" : data.LAST_LOGIN_DATETIME
      }*/
      var query = connection.query('UPDATE USERS SET LAST_LOGIN_DATETIME = ? WHERE USER_EMAIL=?', [current_datetime,email],function(err,result){
        if(err){
          console.log('update error : '+err);
          throw err;
        }
        console.log('update login datetime info..!!');
      });

      //return res.status(200).send(responseObject);
    }
    var responseObject = {
      "msg" : "success",
      "last_login" : data.LAST_LOGIN_DATETIME
    }
    return res.status(200).send(responseObject);




  });
});

//joinMember
app.post('/joinMember', function(req,res){
  if(!req.body){
    return res.status(400).send('plz insert info!');
  }
/*  var users = {
    'userid':req.body.userid,
    'email':req.body.email,
    'password':req.body.password
  };*/
  let userid = req.body.userid;
  let email = req.body.email;
  let password = req.body.password;

  var query = connection.query('INSERT INTO USERS (USER_ID, USER_EMAIL, USER_PASSWORD, JOIN_DATETIME) VALUES(?, ?, ?, ?)', [userid, email, password, current_datetime], function(err,result){
    if(err){
      console.error(err);
      throw err;
    }
    console.log(query);

    let responseObject = {
      "msg" : "success",
      "email" : email,
      "password" : password,
      "id" : userid
    }
    return res.send(200, responseObject);

  });
});
