const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError');
const adminRepo = require('../../repository/admin.repo');
const { hashPassword } = require('../../helpers/bcrypt');

/**
 * get Admin user by email
 * @param {string} email
 * @returns {Promise<Admin>}
 */
const getAminByEmail = (email) => {
  return adminRepo.getAdminByEmail(email);
};

const getAdminById = (id) => {
  return adminRepo.getAdminById(id);
};

const isEmailExists = async (email) => {
  return !!(await getAminByEmail(email));
};

const validateIfEmailExist = async (email) => {
  if (await isEmailExists(email)) throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
};

const createAdmin = async ({ name, email, password }) => {
  // check if email  already existed
  await validateIfEmailExist(email);
  // hash password
  const hashedPassword = await hashPassword(password);
  // create Admin in DB
  return adminRepo.createAdmin({ name, email, password: hashedPassword });
};

module.exports = { createAdmin, validateIfEmailExist, isEmailExists, getAdminById, getAminByEmail };
