const httpStatus = require('http-status');
const responseHandler = require('../helpers/ResponseHandler');
const authService = require('../services/internal/auth.service');

const loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  const admin = await authService.loginUserWithEmailAndPassword(email, password);
  responseHandler.sendResponse({ res, data: admin });
};

const signUpAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await authService.signUp({ name, email, password });
  responseHandler.sendResponse({ res, data: admin, code: httpStatus.CREATED });
};

module.exports = {
  loginWithEmail,
  signUpAdmin,
};
