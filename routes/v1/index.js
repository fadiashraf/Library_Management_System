const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const authorRoutes = require('./author.routes');
const bookRoutes = require('./book.routes');
const userRoutes = require('./user.routes');
const borrowingRoutes = require('./borrowing.routes');
const authenticate = require('../../middlewares/authenticate');
const { catchAsync } = require('../../helpers/catchAsync');

router.get(
  '/health',
  catchAsync(async (req, res) => res.status(200).send('OK'))
);

router.use('/auth', authRoutes);
router.use('/author', authenticate ,authorRoutes);
router.use('/book', authenticate, bookRoutes);
router.use('/user', authenticate,userRoutes);
router.use('/borrowing',authenticate, borrowingRoutes);

module.exports = router;
