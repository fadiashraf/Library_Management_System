const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const authorRoutes = require('./author.routes');
const authenticate = require('../../middlewares/authenticate');
const ResponseHandler = require('../../helpers/ResponseHandler')
const { catchAsync } = require('../../helpers/catchAsync');

router.get(
  '/health',
  authenticate,
  catchAsync(async (req, res) => res.status(200).send('OK'))
);
router.use('/auth', authRoutes);
router.use('/author', authorRoutes);

module.exports = router;
