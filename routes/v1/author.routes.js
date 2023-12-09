const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/author.controller');
const { catchAsync } = require('../../helpers/catchAsync');
const { validateRequest } = require('../../middlewares/validateSchema');
const { createAuthorSchema, getAuthorsSchema, updateAuthorSchema } = require('../../data/schemaValidations/author.schema');

router.get('/', validateRequest(getAuthorsSchema, 'query'), catchAsync(authorController.getAuthors));
router.get('/:id', catchAsync(authorController.getOneById));
router.post('/', validateRequest(createAuthorSchema), catchAsync(authorController.createOne));
router.patch('/:authorId', validateRequest(updateAuthorSchema), catchAsync(authorController.updateOne));

module.exports = router;
