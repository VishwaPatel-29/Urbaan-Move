const Vehicle = require('../models/Vehicle')

const getVehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find()
    
    // Fallback dummy data
    if (vehicles.length === 0) {
      vehicles = [
        {
          _id: 'dummy-veh-1',
          name: 'Urban Shuttle 01',
          type: 'Van',
          capacity: 12,
          status: 'active',
          plateNumber: 'ABC-1234'
        },
        {
          _id: 'dummy-veh-2',
          name: 'Corporate Express',
          type: 'Bus',
          capacity: 30,
          status: 'active',
          plateNumber: 'XYZ-9876'
        }
      ]
    }

    res.json({
      status: 'success',
      data: vehicles,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get vehicles',
    })
  }
}

const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    if (!vehicle) {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found',
      })
    }
    res.json({
      status: 'success',
      data: vehicle,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get vehicle',
    })
  }
}

const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body)
    res.status(201).json({
      status: 'success',
      data: vehicle,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create vehicle',
    })
  }
}

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!vehicle) {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found',
      })
    }
    res.json({
      status: 'success',
      data: vehicle,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update vehicle',
    })
  }
}

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id)
    if (!vehicle) {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found',
      })
    }
    res.json({
      status: 'success',
      message: 'Vehicle deleted',
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete vehicle',
    })
  }
}

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
}