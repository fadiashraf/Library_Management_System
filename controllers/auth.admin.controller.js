const responseHandler = require('../helpers/ResponseHandler');
const authService = require('../services/internal/auth.service');

class AuthController {
  async loginWithEmail(req, res) {
    const { email, password } = req.body;
    const admin = await authService.loginUserWithEmailAndPassword(email, password);
    responseHandler.sendResponse({ res, data: admin });
  }

  async signUpAdmin(req, res) {
    const { name, email, password } = req.body;
    const admin = await authService.signUp({ name, email, password });
    responseHandler.sendResponse({ res, data: admin });
  }
}

module.exports = new AuthController();
