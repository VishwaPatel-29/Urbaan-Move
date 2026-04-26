const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  plate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  capacity: {
    type: Number,
    default: 6,
    min: 4,
    max: 12,
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active',
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  model: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
    min: 2000,
    max: new Date().getFullYear() + 1,
  },
  color: {
    type: String,
    trim: true,
  },
  documents: {
    registration: String,
    insurance: String,
    permit: String,
  },
  lastService: {
    type: Date,
  },
  nextService: {
    type: Date,
  },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  lastLocationUpdate: {
    type: Date,
  },
}, {
  timestamps: true,
})

vehicleSchema.index({ currentLocation: '2dsphere' })

module.exports = mongoose.model('Vehicle', vehicleSchema)