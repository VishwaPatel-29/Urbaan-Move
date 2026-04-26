const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', authMiddleware, vehicleController.getVehicles)
router.get('/:id', authMiddleware, vehicleController.getVehicle)
router.post('/', authMiddleware, roleMiddleware('admin'), vehicleController.createVehicle)
router.put('/:id', authMiddleware, roleMiddleware('admin'), vehicleController.updateVehicle)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), vehicleController.deleteVehicle)

module.exports = router