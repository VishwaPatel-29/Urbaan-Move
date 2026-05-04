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

const setCookies = (res, token, refreshToken = null) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
  res.cookie('token', token, cookieOptions)
  
  if (refreshToken) {
    const refreshOptions = {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
    res.cookie('refreshToken', refreshToken, refreshOptions)
  }
}

const login = async (req, res) => {
  try {
    console.log('Login attempt received:', req.body)
    const { email, password } = req.body
    
    if (email === demoUsers.employee.email && password === demoUsers.employee.password) {
      const user = { ...demoUsers.employee, _id: 'demo-employee-id', status: 'active' }
      delete user.password
      const token = generateToken(user._id, user.role)
      setCookies(res, token)
      return res.json({
        status: 'success',
        data: { user },
      })
    }
    
    if (email === demoUsers.driver.email && password === demoUsers.driver.password) {
      const user = { ...demoUsers.driver, _id: 'demo-driver-id', status: 'active' }
      delete user.password
      const token = generateToken(user._id, user.role)
      setCookies(res, token)
      return res.json({
        status: 'success',
        data: { user },
      })
    }
    
    if (email === demoUsers.admin.email && password === demoUsers.admin.password) {
      const user = { ...demoUsers.admin, _id: 'demo-admin-id', status: 'active' }
      delete user.password
      const token = generateToken(user._id, user.role)
      setCookies(res, token)
      return res.json({
        status: 'success',
        data: { user },
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
    
    user.refreshToken = refreshToken
    await user.save()
    
    setCookies(res, token, refreshToken)
    
    res.json({
      status: 'success',
      data: {
        user,
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
  res.clearCookie('token')
  res.clearCookie('refreshToken')
  
  if (req.userId && !req.userId.startsWith('demo-')) {
    try {
      await User.findByIdAndUpdate(req.userId, { $unset: { refreshToken: 1 } })
    } catch (err) {
      console.error('Error clearing refresh token on logout:', err)
    }
  }

  res.json({
    status: 'success',
    message: 'Logged out successfully',
  })
}

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken
    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Refresh token required',
      })
    }
    
    const { verifyToken } = require('../utils/jwtUtils')
    const decoded = verifyToken(token)
    const user = await User.findOne({ _id: decoded.userId, refreshToken: token })
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid refresh token',
      })
    }
    
    const newToken = generateToken(user._id, user.role)
    setCookies(res, newToken, token)
    
    res.json({
      status: 'success',
      data: { user },
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