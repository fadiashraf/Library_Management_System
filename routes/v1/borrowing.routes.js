const express = require('express');
const router = express.Router();
const { catchAsync } = require('../../helpers/catchAsync');
const borrowController = require('../../controllers/borrowing.controller');
const { validateRequest } = require('../../middlewares/validateSchema');
const {
  borrowSchema,
  returnBooksSchema,
  getBorrowingsSchema,
} = require('../../data/schemaValidations/borrowings.schema');

router.get('/', validateRequest(getBorrowingsSchema, 'query'), catchAsync(borrowController.getBorrows));
router.get('/export', validateRequest(getBorrowingsSchema, 'query'), catchAsync(borrowController.exportBorrowings));
router.post('/borrow', validateRequest(borrowSchema), catchAsync(borrowController.borrowBooks));
router.post('/return', validateRequest(returnBooksSchema), catchAsync(borrowController.returnBooksByIds));

module.exports = router;
