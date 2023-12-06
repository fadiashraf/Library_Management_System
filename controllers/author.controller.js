const httpStatus = require('http-status');
const responseHandler = require('../helpers/ResponseHandler');
const authorService = require('../services/internal/author.service');
const ApiError = require('../helpers/ApiError');

class AuthorController {
  async createOne(req, res) {
    const { name } = req.body;
    const author = await authorService.createOne({ name });
    return responseHandler.sendResponse({ res, data: author, code: httpStatus.CREATED });
  }

  async getOneById(req, res) {
    const { id } = req.params;
    const author = await authorService.getOneById(id);
    if (!author) throw new ApiError(httpStatus.NOT_FOUND, 'NOT FOUND');
    return responseHandler.sendResponse({ res, data: author });
  }
}

module.exports = new AuthorController();
