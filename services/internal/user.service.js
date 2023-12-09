const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError');
const userRepo = require('../../repository/user.repo');
const pager = require('../../helpers/pager');

const getUserByEmail = (email) => {
  return userRepo.getByEmail(email);
};

const getUserById = (id) => {
  return userRepo.getById(id);
};

const isEmailExists = async (email) => {
  return !!(await getUserByEmail(email));
};

const createUser = async ({ name, email }) => {
  // check if email  already existed
  await _ensureEmailNotExists(email);
  return userRepo.createOne({ name, email });
};

const updateOne = async (id, updates) => {
  const user = await getUserById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, `this user is not found`);
  await _ensureEmailNotExists(updates.email, user);
  return userRepo.updateOne(id, updates);
};

const deleteOneById = async (id) => {
  // to avoid circular dependency
  const borrowingService = require('./borrowing.service');
  const user = await getUserById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, `this user is not found`);
  // const isUserExistInBorrowings = !!(await borrowingService.getOneBorrowingBy({ userId: id }))?.length;
  const isUserExistInBorrowings = await borrowingService.getOneBy({ userId: id });

  if (isUserExistInBorrowings) {
    throw new ApiError(httpStatus.CONFLICT, `this user can not be deleted as he borrowed before`);
  }
  await userRepo.deleteOne(id);
};

const _ensureEmailNotExists = async (newEmail, oldUser) => {
  if (newEmail) {
    const isEmailExisted = oldUser?.email == newEmail ? false : !!(await userRepo.getByEmail(newEmail));
    if (isEmailExisted) throw new ApiError(httpStatus.CONFLICT, `This Email is already taken`);
  }
};

const getUsers = async ({ name, email, page, limit }) => {
  const { results, total } = await userRepo.getUsers({ name, email, page, limit });
  return { users: results, ...pager(total, page, limit) };
};

module.exports = { getUsers, deleteOneById, updateOne, createUser, isEmailExists, getUserById, getUserByEmail };
