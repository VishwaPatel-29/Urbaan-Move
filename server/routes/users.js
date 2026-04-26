const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { upload } = require('../services/uploadService')

router.get('/profile', authMiddleware, userController.getProfile)
router.put('/profile', authMiddleware, userController.updateProfile)
router.put('/change-password', authMiddleware, userController.changePassword)
router.post('/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar)

module.exports = router