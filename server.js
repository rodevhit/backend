require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require("cors");

/* Load Swagger configuration file */
const SwaggerConfigOption = require('./config/swaggerConfig');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Load the routes */
const AppRoute = require('./Routes/App.route');

/* use the route */
app.use('/app', AppRoute);

// console.log(SwaggerConfigOption);
/* swagger declaration */
const specs = swaggerJsdoc(SwaggerConfigOption);
const swaggerUi = require('swagger-ui-express');
app.use('/backend-api-doc', swaggerUi.serve, swaggerUi.setup(specs));
/* swagger declaration */

app.get('/', async(req, res, next) => {
    res.send('Looking for default route.');
});

/* Error Handler */
app.use(async(req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: err.status || 500,
        message: err.message
    });
});
/* Error Handler */

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

module.exports = app