const httpStatus = require('http-status');
const responseHandler = require('../helpers/ResponseHandler');
const userService = require('../services/internal/user.service');

const createOne = async (req, res) => {
  const userObject = req.body;
  const user = await userService.createUser(userObject);
  responseHandler.sendResponse({ res, data: user, code: httpStatus.CREATED });
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  responseHandler.sendResponse({ res, data: user, code: httpStatus.OK });
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await userService.updateOne(id, updates);
  responseHandler.sendResponse({ res, data: user, code: httpStatus.OK });
};

const deleteOneById = async (req, res) => {
  const { id } = req.params;
  await userService.deleteOneById(id);
  responseHandler.sendResponse({ res, code: httpStatus.NO_CONTENT });
};

const getUsers = async (req, res) => {
  const { name, email, page, limit } = req.query;
  const users = await userService.getUsers({ name, email, page, limit });
  responseHandler.sendResponse({ res, data: users });
};

module.exports = {
  createOne,
  getOneById,
  updateOne,
  deleteOneById,
  getUsers,
};
