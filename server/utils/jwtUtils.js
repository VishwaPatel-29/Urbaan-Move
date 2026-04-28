const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'urbanmove-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d'

const generateToken = (userId, role = 'employee') => {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  )
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  JWT_SECRET,
}