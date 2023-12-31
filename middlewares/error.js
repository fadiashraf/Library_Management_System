const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger')
const ApiError = require('../helpers/ApiError')
const { DBError } = require('objection');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
    const message = error instanceof DBError ? 'Internal Error' : error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  // can add config.env === 'production'  to handle this only in production
  if (!err.isOperational) { 
    logger.error(err)
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    code: statusCode,
    message,
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
