const { connection } = require('../services/mySQLController')
const client = require('../services/cache')


const sql = {
    dbInsert: "INSERT INTO cities (name, temperature, weather, country) VALUES (?, ?, ?, ?)",
    query: "SELECT * FROM `cities` WHERE `name` = ?",
}

const caching = async function (data, method) {
    let result
    if (method === 'post') {
        const key = data.name
        result = await client.set(key, JSON.stringify(data), 'EX', 10)
        console.log('Data inserted into cache')
        return result
    }

    else if (method === 'get') {
        result = await client.get(data)
        if (result !== null) {
            console.log('Data retrieved from cache', result)
            return JSON.parse(result)
        } else {
            return null
        }
    }
}

exports.add =  function (info) {
    // Adding in Database
    connection.promise().query(sql.dbInsert, [info.name, info.temperature, info.weather, info.country])
        .then( result => {
            if (result) {
                // Adding to cache
                caching(info, 'post')
            }
        }) .catch( error => {
            if (error) throw error
        })
}

exports.getData = async function (name) {
    console.log('Checking...')
    // Searching in cache
     const cache = await caching(name, 'get')
    console.log(cache)
    if (cache !== null) {
        return cache
    } else {

        // Searching in Database
        const query = await connection.promise().query(sql.query, [name]).then( result => {
            if (result[0].length > 0 )  return result[0]
            else {
                return null
            }
        }).catch(e => {
            throw e
        })
        if (query !== null) {
            console.log('Data retrieved from Database')
            return query
        } else return null
    }
}
