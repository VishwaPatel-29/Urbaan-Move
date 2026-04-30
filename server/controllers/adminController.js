const User = require('../models/User')
const Ride = require('../models/Ride')
const Vehicle = require('../models/Vehicle')

const getStats = async (req, res) => {
  try {
    const [totalUsers, totalRides, activeVehicles, todayRides] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      Ride.countDocuments(),
      Vehicle.countDocuments({ status: 'active' }),
      Ride.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      }),
    ])
    
    res.json({
      status: 'success',
      data: {
        totalUsers,
        totalRides,
        activeVehicles,
        todayRides,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get stats',
    })
  }
}

const getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query
    const query = {}
    
    if (role) {
      query.role = role
    }
    
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
    
    const total = await User.countDocuments(query)
    
    res.json({
      status: 'success',
      data: { users, total, page: parseInt(page), pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get users',
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
    }
    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user',
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, email, role, status, company } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status, company },
      { new: true, runValidators: true }
    )
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
    }
    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update user',
    })
  }
}

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, company, employeeId, role } = req.body
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered',
      })
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      company,
      employeeId,
      role: role || 'employee',
    })
    
    res.status(201).json({
      status: 'success',
      data: user,
      message: 'User created successfully',
    })
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create user',
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
    }
    res.json({
      status: 'success',
      message: 'User deleted',
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete user',
    })
  }
}

module.exports = {
  getStats,
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
}