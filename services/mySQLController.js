const mysql = require('mysql2')
// Database
exports.connection = mysql.createPool({
    host: 'localhost',
    user: 'vturnus',
    password: '@Amir#985264',
    database: 'weather'
})