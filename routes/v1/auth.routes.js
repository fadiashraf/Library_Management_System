const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.admin.controller');
const { catchAsync } = require('../../helpers/catchAsync');
const { validateRequest } = require('../../middlewares/validateSchema')
const { loginWithEmailSchema, signUpSchema } = require('../../data/schemaValidations/auth.schema')

router.post('/signup', validateRequest(signUpSchema), catchAsync(authController.signUpAdmin));
router.post('/login', validateRequest(loginWithEmailSchema), catchAsync(authController.loginWithEmail));

module.exports = router;
