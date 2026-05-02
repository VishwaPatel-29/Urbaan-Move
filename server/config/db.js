const mongoose = require('mongoose')

const connectDB = async () => {
  console.log('🚀 Running in MOCK DATABASE MODE (No real MongoDB required)')
  return true
}

module.exports = { connectDB }