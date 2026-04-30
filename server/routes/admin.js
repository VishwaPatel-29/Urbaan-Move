const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/stats', authMiddleware, roleMiddleware('admin'), adminController.getStats)
router.get('/users', authMiddleware, roleMiddleware('admin'), adminController.getUsers)
router.post('/users', authMiddleware, roleMiddleware('admin'), adminController.createUser)
router.get('/users/:id', authMiddleware, roleMiddleware('admin'), adminController.getUser)
router.put('/users/:id', authMiddleware, roleMiddleware('admin'), adminController.updateUser)
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), adminController.deleteUser)

module.exports = router