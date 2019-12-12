const mysql = require('mysql');
const util = require('util');
const config = require('../config');

const pool = mysql.createPool({
    connectionLimit: config.mysqlConnectionLimit || 5,
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Wrong database credentials.');
        }
        return;
    }

    if (connection)
        connection.release();
    return;
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

pool.queryAsync = util.promisify(pool.query).bind(pool);

module.exports = pool;