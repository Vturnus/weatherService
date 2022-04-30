const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const swagger = require('swagger-ui-express')

const swaggerDoc = require('./util/swagger.json')
const weatherRoutes = require('./routes/weatherRoutes')

//Starting the app
const app = express()

// Implements CORS
app.use(cors());
// Access-Control-Allow-Origin (*)
app.options('*', cors());
//Set security HTTP headers
app.use(helmet());
// Body parser, reading data from the body into req.body
app.use(
    express.json({
        limit: '100kb'
    })
);

app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc))
app.use('/api', weatherRoutes)

module.exports = app