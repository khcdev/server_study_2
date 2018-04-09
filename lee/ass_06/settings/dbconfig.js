const mysql = require('mysql');

const dbConfig = {
   host : 'jwrds.c0ktahl7u4nh.ap-northeast-2.rds.amazonaws.com',
	user : 'jiwon',
	password : 'dbwotjrdlek1595',
	port : 3306,
	database : 'jiwon',
    connectionLimit:10,
    waitForConnections:false
};

const dbPool = mysql.createPool(dbConfig);

module.exports = dbPool;