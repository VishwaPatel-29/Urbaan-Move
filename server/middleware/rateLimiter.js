const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 'error',
    message: 'Too many requests. Please try again later.',
  },
})

const authRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    status: 'error',
    message: 'Too many login attempts. Please try again later.',
  },
})

module.exports = { rateLimiter, authRateLimiter }