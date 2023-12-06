const _ = require('lodash');
const convertSnakeToCamelCase = (data, skipNotSnake = false, skipFields = []) => {
  if (_.isArray(data)) {
    return _.map(data, (data) => convertSnakeToCamelCase(data, skipNotSnake, skipFields));
  }

  if (_.isObject(data) && !(data instanceof Date)) {
    return _(data)
      .mapKeys((v, k) => {
        if ((skipNotSnake && !k.includes('_')) || skipFields.includes(k)) {
          return k;
        }
        return _.camelCase(k);
      })
      .mapValues((v, k) => convertSnakeToCamelCase(v, skipNotSnake, skipFields))
      .value();
  }

  return data;
};

module.exports = convertSnakeToCamelCase;
