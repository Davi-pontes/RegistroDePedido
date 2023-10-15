const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Davi8693',
    database: 'db_delivery'
})

module.exports = connection