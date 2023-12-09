const httpStatus = require('http-status');
const tokenService = require('../token.service');
const adminService = require('./admin.service');
const ApiError = require('../../helpers/ApiError');
const { isPasswordMatch } = require('../../helpers/bcrypt');

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Admin>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const admin = await adminService.getAminByEmail(email);
  if (!admin || !(await isPasswordMatch(password, admin?.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const token = await tokenService.generateToken(admin.id);
  return {
    admin,
    token,
  };
};

const isAdminActive = (admin) => {
  return !admin?.deactivated_at;
};

const signUp = async ({ name, email, password }) => {
  const admin = await adminService.createAdmin({ name, email, password });
  const token = await tokenService.generateToken(admin.id);
  delete admin.password;
  return { token, ...admin };
};

module.exports = { signUp, isAdminActive, loginUserWithEmailAndPassword };
