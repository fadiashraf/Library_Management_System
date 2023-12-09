const express = require('express');
const router = express.Router();
const { catchAsync } = require('../../helpers/catchAsync');
const userController = require('../../controllers/user.controller');
const { validateRequest } = require('../../middlewares/validateSchema');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../../data/schemaValidations/user.schema');

router.get('/', validateRequest(getUserSchema, 'query'), catchAsync(userController.getUsers));
router.get('/:id', catchAsync(userController.getOneById));
router.post('/', validateRequest(createUserSchema), catchAsync(userController.createOne));
router.patch('/:id', validateRequest(updateUserSchema), catchAsync(userController.updateOne));
router.delete('/:id', catchAsync(userController.deleteOneById));

module.exports = router;
