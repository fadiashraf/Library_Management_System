const httpStatus = require('http-status');
const adminService = require('../services/internal/admin.service');
const authService = require('../services/internal/auth.service');
const tokenService = require('../services/token.service');
const ApiError = require('../helpers/ApiError');

const authenticate = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    token = token?.replace('Bearer ', '');
    if (!token) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));

    const decoded = tokenService.verifyToken(token);

    let userId = parseInt(decoded.sub);
    // get admin from DB
    const admin = await adminService.getAdminById(userId);
    const { id, name, email } = admin;
    if (!admin || !authService.isAdminActive(admin)) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
    req.admin = { id, name, email };
    next();
  } catch (error) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
  }
};

module.exports = authenticate;
