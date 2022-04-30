const mysql = require('mysql2')
// Database
exports.connection = mysql.createPool({
    host: your_host,
    user: your_db_username,
    password: your_db_pass,
    database: 'weather'
})
