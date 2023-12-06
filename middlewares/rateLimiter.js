const rateLimiter = require('express-rate-limit');

// default for rate limit is 5 attempts/15 mins 
exports.rateLimit = (windowMs = 15 * 60 * 1000, limit = 5) =>
  rateLimiter({
    windowMs,
    limit,
    message: 'Too many login attempts, please try again later.',
  });

  