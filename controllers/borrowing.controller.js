const httpStatus = require('http-status');
const responseHandler = require('../helpers/ResponseHandler');
const borrowingService = require('../services/internal/borrowing.service');

const borrowBooks = async (req, res) => {
  const { userId, books } = req.body;
  await borrowingService.borrowBooks(userId, books);
  responseHandler.sendResponse({ res, code: httpStatus.NO_CONTENT });
};

const returnBooksByIds = async (req, res) => {
  const { borrowingIds } = req.body;
  await borrowingService.returnBorrowings(borrowingIds);
  responseHandler.sendResponse({ res, code: httpStatus.NO_CONTENT });
};

const getBorrows = async (req, res) => {
  const filters = req.query;
  const borrows = await borrowingService.getBorrowings(filters);
  responseHandler.sendResponse({ res, data: borrows });
};

const exportBorrowings = async (req, res) => {
  const filters = req.query;
  const workbook = await borrowingService.exportBorrowings(filters);

  res
    .attachment('borrowings.xlsx')
    .setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  await workbook.xlsx.write(res);
  res.end();
};

module.exports = {
  borrowBooks,
  returnBooksByIds,
  getBorrows,
  exportBorrowings,
};
