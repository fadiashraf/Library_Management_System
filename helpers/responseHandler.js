const { DBError } = require('objection');
const convertSnakeToCamelCase = require('./convertToCamelCase');

class ResponseHandler {
  constructor() {}
  sendResponse({ res, data = null, message = '', code = 200, shouldConvertToCamelCase = true }) {
    res.status(code);
    res.json(this._prepareResponse({ message, data, shouldConvertToCamelCase }));
  }

  _prepareResponse({ message, data, shouldConvertToCamelCase }) {
    const response = {
      success: true,
    };
    response['err'] = null;
    if (message) {
      response.message = message;
    }
    if (data) {
      response.data = shouldConvertToCamelCase ? convertSnakeToCamelCase(data) : data;
    }
    return response;
  }
}

module.exports = new ResponseHandler();
