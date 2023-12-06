const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const config = require('../config/config');

class TokenService {
  // Create a new token for a user
  async generateToken(userId, options = {}) {
    options.expiresIn = config.jwt.accessExpirationMinutes + 'm';
    const claims = this.createJwtPayload(userId);
    return jwt.sign(claims, config.jwt.secret, options);
  }

  verifyToken(token) {
    return jwt.verify(token, config.jwt.secret);
  }

  // create claims that will be used to sign/create token
  createJwtPayload(userId) {
    return {
      sub: userId,
      iat: moment().unix(),
      type: 'admin',
      jti: uuidv4(),
      iss: config.jwt.issuer,
    };
  }
}

module.exports = new TokenService();
