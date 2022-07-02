const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  // skipSuccessfulRequests: true,
  standardHeaders: true,
	// legacyHeaders: false,
});

module.exports = {
  authLimiter,
};
