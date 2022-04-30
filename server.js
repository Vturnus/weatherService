const dotenv = require('dotenv')
const app = require('./app')
const { connection } = require('./services/mySQLController')
const client = require('./services/cache')


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('uncaught exception :( shutting down...');
    process.exit(1);
})

dotenv.config({
    path: './.env'
})

// Check the table in database
connection.execute("SHOW TABLES LIKE 'cities'", function (err, result) {
    if (err) {
        throw err
    } else {
        if (result.length > 0) {
            console.log('Table exists')
        } else  {
            // If result is empty, then it creates a table
            console.log('creating the table')
            const mySQL = "CREATE TABLE cities (id INT PRIMARY KEY AUTO_INCREMENT," +
                "name VARCHAR(255) UNIQUE," +
                "temperature INT," +
                "weather VARCHAR(255)," +
                "country VARCHAR(255))";
            connection.query(mySQL, function (e, r) {
                if (e) throw e
                console.log('Table Created')
            })
        }
    }
})

// Flushes the cache
client.flushAll()

// Starting the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('unhandled Rejection :( shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

