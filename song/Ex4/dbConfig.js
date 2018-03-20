const mysql = require('mysql');

const dbconfig={
    host : 'localhost',
    user : 'root',
    password : '1234',
	port : 3306,
    database : 'serverTest',
    connectionLimit:10,
    waitForConnections:false
};

const dbPool = mysql.createPool(dbconfig);

module.exports = dbPool;