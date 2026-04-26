const { verifyToken } = require('../utils/jwtUtils')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided',
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found',
      })
    }
    
    if (user.status !== 'active') {
      return res.status(403).json({
        status: 'error',
        message: 'Account is not active',
      })
    }
    
    req.user = user
    req.userId = user._id
    req.userRole = user.role
    
    next()
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
    })
  }
}

module.exports = authMiddleware