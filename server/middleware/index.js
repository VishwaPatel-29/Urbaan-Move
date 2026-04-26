const authMiddleware = require('./authMiddleware')
const roleMiddleware = require('./roleMiddleware')
const errorHandler = require('./errorHandler')
const rateLimiter = require('./rateLimiter')

module.exports = {
  authMiddleware,
  roleMiddleware,
  errorHandler,
  rateLimiter,
}