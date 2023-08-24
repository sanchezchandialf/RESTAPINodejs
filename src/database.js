const mysql = require('mysql');
const { database } = require('./keys');
const util = require('util'); // Corrección: Cambiar 'promysify' por 'util'

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) {
        connection.release();
        console.log('DB is Connected');
    }
    return;
});

// promisify pool query
pool.query = util.promisify(pool.query); // Corrección: Usar 'util.promisify'

module.exports = pool;
