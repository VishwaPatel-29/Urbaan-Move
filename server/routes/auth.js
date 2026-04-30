const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { authRateLimiter } = require('../middleware/rateLimiter')


router.post('/login', authRateLimiter, authController.login)
router.post('/logout', authController.logout)
router.post('/refresh-token', authController.refreshToken)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

module.exports = router