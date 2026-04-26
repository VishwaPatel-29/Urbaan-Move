const Vehicle = require('../models/Vehicle')

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
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