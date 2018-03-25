var mysql=require('mysql');
var express = require('express');
var app = express();

var server = app.listen(3000);

var inputId = 'qkrsnrl';
var inputEmail = 'qkrsnrl@naver.com';
var inputPassword = 'a123456789';


app.post('/user', joinMember);
app.post('/user', login);

var dbConfig={
  host  :'localhost',
  user  :'root',
  password  :'1234',
  database  :'MemberInfo',
  connectionLimit:10,
  waitForConnections:false
};

var dbPool = mysql.createPool(dbConfig);
module.exports = dbPool;

var pool = require('./dbconnection');
var connection = mysql.createConnection(daConfig);

pool.getConnection(function(err, connection){

  //connection and error
  if(err){
    console.erro('error connecting: '+err.stack);
    return;
  }
  if(!err){
    console.log('connected as id'+ connection.threadId);

  }





  //회원가입(INSERT) /joinMember

function joinMember(req,res,inputId,inputEmail,inputPassword){
    //var user

  var query = connection.query('INSERTINTO user (id, email, password) VALUES (?,?,?);',inputId,inputEmail,inputPassword,function(err,result){

  if(!err){

    var message = {
      msg: "success",
      email: "email",
      password: "password",
      id : "id"
    }
    res.send(message);
  }//success

  else{
    var message = {

        err: {
        msg : "fail to join"
        }
      }
    res.send(message);
    }//fail
    connection.release();
  }
}



function login(req,res,inputEmail,inputPassword){
  //로그인

  var query = connection.query('SELECT (email, password) FROM user;',function(err,result){
  if(inputEmail==email&&inputPassword==password){
    var message = {
      msg: "success",
      last_login:""

    }
    res.send(message);
  }//성공
    else {
      var message = {
        error : {
            msg : 'fail to login'
          }//실패

        }
        res.send(message);
      }
      //query write
      connection.release();
  })
}







pool.end();
