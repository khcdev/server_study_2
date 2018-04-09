const mysql = require('mysql');

const dbConfig = {
    host : 'localhost',
    user : 'root',
    password : '1234',
	port : 3306,
    database : 'serverTest',
    connectionLimit:10,
    waitForConnections:false
};

const dbPool = mysql.createPool(dbConfig);

module.exports = dbPool;