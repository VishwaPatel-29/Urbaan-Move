const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null,
  },
  pickup: {
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  destination: {
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'en-route', 'arrived', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  scheduledTime: {
    type: Date,
    default: null,
  },
  scheduled: {
    type: Boolean,
    default: false,
  },
  passengers: {
    type: Number,
    default: 1,
    min: 1,
    max: 6,
  },
  notes: {
    type: String,
    trim: true,
  },
  eta: {
    type: Number,
    default: null,
  },
  distance: {
    type: Number,
    default: null,
  },
  duration: {
    type: Number,
    default: null,
  },
  price: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  feedback: {
    type: String,
    trim: true,
  },
  events: [{
    event: String,
    timestamp: { type: Date, default: Date.now },
    details: String,
  }],
}, {
  timestamps: true,
})

rideSchema.index({ 'pickup.location': '2dsphere' })
rideSchema.index({ 'destination.location': '2dsphere' })
rideSchema.index({ status: 1, createdAt: -1 })

rideSchema.pre(/^find/, function(next) {
  this.populate('user', 'name email phone')
    .populate('driver', 'name phone')
    .populate('vehicle')
  next()
})

module.exports = mongoose.model('Ride', rideSchema)