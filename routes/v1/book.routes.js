const express = require('express');
const router = express.Router();
const { catchAsync } = require('../../helpers/catchAsync');
const bookController = require('../../controllers/book.controller');
const { validateRequest } = require('../../middlewares/validateSchema');
const { createBookSchema, updateBookSchema, getBooksSchema } = require('../../data/schemaValidations/book.schema');
const { rateLimit } = require('../../middlewares/rateLimiter');

router.get('/', validateRequest(getBooksSchema, 'query'), catchAsync(bookController.getBooks));
router.get('/:id', catchAsync(bookController.getOneById));
router.delete('/:id', rateLimit(15 * 60 * 1000, 2), catchAsync(bookController.deleteOneById));
router.post('/', validateRequest(createBookSchema), catchAsync(bookController.createOne));
router.patch('/:id', validateRequest(updateBookSchema), catchAsync(bookController.updateOne));

module.exports = router;
