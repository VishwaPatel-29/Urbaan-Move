const express = require('express')
const router = express.Router()
const rideController = require('../controllers/rideController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', authMiddleware, rideController.getRides)
router.get('/:id', authMiddleware, rideController.getRide)
router.post('/', authMiddleware, rideController.createRide)
router.put('/:id', authMiddleware, rideController.updateRide)
router.put('/:id/cancel', authMiddleware, rideController.cancelRide)
router.post('/:id/accept', authMiddleware, roleMiddleware('driver', 'admin'), rideController.acceptRide)
router.post('/:id/start', authMiddleware, roleMiddleware('driver', 'admin'), rideController.startRide)
router.post('/:id/complete', authMiddleware, roleMiddleware('driver', 'admin'), rideController.completeRide)

module.exports = router