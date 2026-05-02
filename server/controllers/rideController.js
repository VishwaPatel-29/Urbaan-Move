const Ride = require('../models/Ride')

const getRides = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query
    const query = { user: req.userId }
    
    if (status) {
      query.status = status
    }
    
    let rides = await Ride.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
    
    let total = await Ride.countDocuments(query)

    // Fallback dummy data for presentation
    if (rides.length === 0) {
      rides = [
        {
          _id: 'dummy-ride-1',
          pickup: 'Corporate Office A',
          destination: 'Sector 62 Metro',
          status: 'completed',
          scheduledTime: new Date(),
          passengers: 2,
          notes: 'Regular commute'
        },
        {
          _id: 'dummy-ride-2',
          pickup: 'Downtown Hub',
          destination: 'Business Park',
          status: 'pending',
          scheduledTime: new Date(Date.now() + 3600000),
          passengers: 1,
          notes: 'Urgent meeting'
        }
      ]
      total = 2
    }
    
    res.json({
      status: 'success',
      data: { rides, total, page: parseInt(page), pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get rides',
    })
  }
}

const getRide = async (req, res) => {
  try {
    const ride = await Ride.findOne({ _id: req.params.id, user: req.userId })
    
    if (!ride) {
      return res.status(404).json({
        status: 'error',
        message: 'Ride not found',
      })
    }
    
    res.json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get ride',
    })
  }
}

const createRide = async (req, res) => {
  try {
    const { pickup, destination, scheduledTime, scheduled, passengers, notes } = req.body
    
    const ride = await Ride.create({
      user: req.userId,
      pickup,
      destination,
      scheduledTime,
      scheduled,
      passengers,
      notes,
      status: 'pending',
    })
    
    if (req.io) {
      req.io.emit('ride:requested', { ride })
    }
    
    res.status(201).json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create ride',
    })
  }
}

const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!ride) {
      return res.status(404).json({
        status: 'error',
        message: 'Ride not found',
      })
    }
    
    res.json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update ride',
    })
  }
}

const cancelRide = async (req, res) => {
  try {
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params.id, user: req.userId, status: 'pending' },
      { status: 'cancelled' },
      { new: true }
    )
    
    if (!ride) {
      return res.status(404).json({
        status: 'error',
        message: 'Ride not found or cannot be cancelled',
      })
    }
    
    res.json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel ride',
    })
  }
}

const acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      {
        status: 'accepted',
        driver: req.userId,
      },
      { new: true }
    )
    
    if (req.io) {
      req.io.to(ride.user.toString()).emit('ride:accepted', { ride })
    }
    
    res.json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to accept ride',
    })
  }
}

const startRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: 'en-route' },
      { new: true }
    )
    
    if (req.io) {
      req.io.to(ride.user.toString()).emit('ride:started', { ride })
    }
    
    res.json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to start ride',
    })
  }
}

const completeRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    )
    
    if (req.io) {
      req.io.to(ride.user.toString()).emit('ride:completed', { ride })
    }
    
    res.json({
      status: 'success',
      data: ride,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to complete ride',
    })
  }
}

module.exports = {
  getRides,
  getRide,
  createRide,
  updateRide,
  cancelRide,
  acceptRide,
  startRide,
  completeRide,
}