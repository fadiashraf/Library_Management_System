const httpStatus = require('http-status');
const responseHandler = require('../helpers/ResponseHandler');
const bookService = require('../services/internal/book.service');

const createOne = async (req, res) => {
  const bookObject = req.body;
  const book = await bookService.createOne(bookObject);
  responseHandler.sendResponse({ res, data: book, code: httpStatus.CREATED });
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const book = await bookService.getOneById(id);
  responseHandler.sendResponse({ res, data: book, code: httpStatus.OK });
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const book = await bookService.updateOne(id, updates);
  responseHandler.sendResponse({ res, data: book, code: httpStatus.OK });
};

const deleteOneById = async (req, res) => {
  const { id } = req.params;
  await bookService.deleteOneById(id);
  responseHandler.sendResponse({ res, code: httpStatus.NO_CONTENT });
};

const getBooks = async (req, res) => {
  const { title, authorId, author, ISBN, page, limit } = req.query;
  const books = await bookService.getBooks({ title, authorId, author, ISBN, page, limit });
  responseHandler.sendResponse({ res, data: books });
};

module.exports = {
  createOne,
  getOneById,
  updateOne,
  deleteOneById,
  getBooks,
};
