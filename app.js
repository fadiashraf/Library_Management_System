const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const httpStatus = require('http-status');
require('dotenv').config();
const morgan = require('./config/morgan');
const { rateLimit } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error.js');
const ApiError = require('./helpers/ApiError');
const config = require('./config/config.js');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// parses cookies attached to the client's request and makes them available in the `req.cookies` object.
app.use(cookieParser());

// limit repeated failed requests to auth endpoints

app.use('/v1/auth', rateLimit());

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// const pagination = require('./middlewares/pagination');

module.exports = app;
