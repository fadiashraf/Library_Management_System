const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const config = require('../config/config');

const generateToken = async (userId, options = {}) => {
  options.expiresIn = config.jwt.accessExpirationMinutes + 'm';
  const claims = createJwtPayload(userId);
  return jwt.sign(claims, config.jwt.secret, options);
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

const createJwtPayload = (userId) => {
  return {
    sub: userId,
    iat: moment().unix(),
    type: 'admin',
    jti: uuidv4(),
    iss: config.jwt.issuer,
  };
};

module.exports = {
  generateToken,
  verifyToken,
  createJwtPayload,
};
