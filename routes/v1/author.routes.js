const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/author.controller')
const { catchAsync } = require('../../helpers/catchAsync');
const { validateRequest } = require('../../middlewares/validateSchema')
const { createAuthorSchema } = require('../../data/schemaValidations/author.schema')

router.post('/', validateRequest(createAuthorSchema), catchAsync(authorController.createOne));
router.get('/:id',  catchAsync(authorController.getOneById));

module.exports = router;
