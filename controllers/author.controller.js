const httpStatus = require('http-status');
const responseHandler = require('../helpers/ResponseHandler');
const authorService = require('../services/internal/author.service');

const createOne = async (req, res) => {
  const { name } = req.body;
  const author = await authorService.createOne({ name });
  return responseHandler.sendResponse({ res, data: author, code: httpStatus.CREATED });
};

const updateOne = async (req, res) => {
  const { authorId } = req.params;
  const { name } = req.body;
  const author = await authorService.updateOneById(authorId, { name });
  return responseHandler.sendResponse({ res, data: author, code: httpStatus.OK });
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const author = await authorService.getOneById(id);
  return responseHandler.sendResponse({ res, data: author });
};

const getAuthors = async (req, res) => {
  const { name, page, limit } = req.query;
  const authors = await authorService.getAuthors({ name, page, limit });
  return responseHandler.sendResponse({ res, data: authors });
};

module.exports = {
  createOne,
  updateOne,
  getOneById,
  getAuthors,
};
