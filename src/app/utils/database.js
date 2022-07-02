const mysql = require('mysql2');
const config = require('config');
const dbConfig = config.get("db")


const pool = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    port: dbConfig.PORT || 3306,
    database: dbConfig.DB_NAME,
    password: dbConfig.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
    // queueLimit: 0
});

module.exports = pool;