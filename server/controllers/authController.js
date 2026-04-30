const User = require('../models/User')
const { generateToken, generateRefreshToken } = require('../utils/jwtUtils')

const demoUsers = {
  employee: {
    email: 'demo@urbanmove.com',
    password: 'Demo1234',
    name: 'Demo Employee',
    role: 'employee',
    company: 'TechCorp Inc.',
    employeeId: 'EMP001',
    phone: '+1 234 567 8901',
  },
  driver: {
    email: 'driver@urbanmove.com',
    password: 'Driver1234',
    name: 'Demo Driver',
    role: 'driver',
    company: 'UrbanMove Shuttle',
    phone: '+1 234 567 8902',
  },
  admin: {
    email: 'admin@urbanmove.com',
    password: 'Admin1234',
    name: 'Admin User',
    role: 'admin',
    company: 'UrbanMove HQ',
    phone: '+1 234 567 8903',
  },
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (email === demoUsers.employee.email && password === demoUsers.employee.password) {
      const user = { ...demoUsers.employee, _id: 'demo-employee-id', status: 'active' }
      delete user.password
      const token = generateToken(user._id, user.role)
      return res.json({
        status: 'success',
        data: { user, token },
      })
    }
    
    if (email === demoUsers.driver.email && password === demoUsers.driver.password) {
      const user = { ...demoUsers.driver, _id: 'demo-driver-id', status: 'active' }
      delete user.password
      const token = generateToken(user._id, user.role)
      return res.json({
        status: 'success',
        data: { user, token },
      })
    }
    
    if (email === demoUsers.admin.email && password === demoUsers.admin.password) {
      const user = { ...demoUsers.admin, _id: 'demo-admin-id', status: 'active' }
      delete user.password
      const token = generateToken(user._id, user.role)
      return res.json({
        status: 'success',
        data: { user, token },
      })
    }
    
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      })
    }
    
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      })
    }
    
    user.lastLogin = new Date()
    await user.save()
    
    const token = generateToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)
    
    res.json({
      status: 'success',
      data: {
        user,
        token,
        refreshToken,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
    })
  }
}



const logout = async (req, res) => {
  res.json({
    status: 'success',
    message: 'Logged out successfully',
  })
}

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body
    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token required',
      })
    }
    
    const { verifyToken } = require('../utils/jwtUtils')
    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token',
      })
    }
    
    const newToken = generateToken(user._id, user.role)
    
    res.json({
      status: 'success',
      data: { token: newToken },
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid refresh token',
    })
  }
}

const forgotPassword = async (req, res) => {
  res.json({
    status: 'success',
    message: 'Password reset link sent to email',
  })
}

const resetPassword = async (req, res) => {
  res.json({
    status: 'success',
    message: 'Password reset successfully',
  })
}

module.exports = {
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
}