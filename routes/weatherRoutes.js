const router = require('express').Router()

const Weather = require('../modules/weather')
const {add, getData} = require('../controller/weatherController')

router.route('/weather').post(async (req, res) => {
    const cityName = req.body.cityName
    let result

    // 1) Checks if req.body has data
    if (!req.body.cityName) {
         res.json({
             status: 400,
             success: false,
             message: 'Please provide the city name'
         })
    }

    // 2) Check Cache and Database
    const queryDB = await getData(cityName)
    // console.log(queryDB)
    if (queryDB !== null) {
       result = queryDB
    }
    // 3) Call Weather API
    else {
        console.log('Calling API')
        const weather = new Weather()
        weather.cityName = req.body.cityName
        const coordinates = await weather.getCoordinates()
        const lat = coordinates.map(e => e.lat)
        const lon = coordinates.map(e => e.lon)
        const information = await weather.getWeather(lat[0], lon[0])
        result = {
            name: information.name,
            temperature: Math.round(parseFloat(information.main.temp )- 273.15), // Kelvin -> Celsius
            weather: information.weather.map(e => e.main),
            country: information.sys.country
        }
        // 3.a) Save it to DB and Cache it
        console.log('Saving date into database')
        await add(result)

    }

    // 4) Return the result
    res.status(200).json({
        success: true,
        result
    })
})

module.exports = router