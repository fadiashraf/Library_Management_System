const responseHandler = require('../helpers/ResponseHandler');

class BookController {
  async createBook(req, res) {
    const { title, authorId, ISBN, availableQuantity, shelfLocationId } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    responseHandler.sendResponse({ res, data: user });
  }

  async signUpAdmin(req, res) {
    const { name, email, password } = req.body;
    const user = await authService.signUp({ name, email, password });
    responseHandler.sendResponse({ res, data: user });
  }
}

module.exports = new BookController();
