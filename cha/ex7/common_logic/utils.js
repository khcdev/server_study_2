const dbPool = require('../settings/dbconfig');

exports.getDBConnection = () => {
    return new Promise( ( resolve, reject) => {
        dbPool.getConnection( (err,conn) => {
            if (err) return reject(err);
            resolve(conn);
    });
});
}
/*

*/