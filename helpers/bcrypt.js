const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return bcrypt.hash(password, 8);
};

const isPasswordMatch = (givenPassword, hashedPassword) => {
  return bcrypt.compare(givenPassword, hashedPassword);
};

module.exports = { isPasswordMatch, hashPassword };
