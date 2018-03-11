const mysql = require('mysql');

const dbConfig = {
    host : 'whodb.c55re1mfyfxb.ap-northeast-2.rds.amazonaws.com',
	user : 'user',
	password : 'rhkdgns2',
	port : 3306,
	database : 'server_study',
    connectionLimit:10,
    waitForConnections:false
};

const dbPool = mysql.createPool(dbConfig);

module.exports = dbPool;