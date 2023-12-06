const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError')

const validateRequest =
  (schema, target = 'body') =>
  async (req, res, next) => {
    try {
      req[target] = schema.validateSync(req[target]);
      next();
    } catch (err) {
      next(new ApiError(httpStatus.BAD_REQUEST, err.message));
    }
  };

module.exports = {
  validateRequest,
};
