import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentRide: null,
  rideHistory: [],
  nearbyVehicles: [],
  bookingStep: 1,
  bookingData: {
    pickupLocation: null,
    destination: null,
    pickupTime: null,
    passengers: 1,
    notes: '',
  },
  activeRides: [],
  completedRides: [],
  pendingRequests: [],
  loading: false,
  error: null,
}

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setCurrentRide: (state, action) => {
      state.currentRide = action.payload
    },
    setRideHistory: (state, action) => {
      state.rideHistory = action.payload
    },
    addToHistory: (state, action) => {
      state.rideHistory.unshift(action.payload)
    },
    setNearbyVehicles: (state, action) => {
      state.nearbyVehicles = action.payload
    },
    setBookingStep: (state, action) => {
      state.bookingStep = action.payload
    },
    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload }
    },
    resetBooking: (state) => {
      state.bookingStep = 1
      state.bookingData = initialState.bookingData
    },
    setActiveRides: (state, action) => {
      state.activeRides = action.payload
    },
    setCompletedRides: (state, action) => {
      state.completedRides = action.payload
    },
    setPendingRequests: (state, action) => {
      state.pendingRequests = action.payload
    },
    addPendingRequest: (state, action) => {
      state.pendingRequests.unshift(action.payload)
    },
    removePendingRequest: (state, action) => {
      state.pendingRequests = state.pendingRequests.filter(r => r._id !== action.payload)
    },
    updateRideStatus: (state, action) => {
      const { rideId, status } = action.payload
      const ride = state.activeRides.find(r => r._id === rideId)
      if (ride) ride.status = status
      if (state.currentRide?._id === rideId) state.currentRide.status = status
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setCurrentRide,
  setRideHistory,
  addToHistory,
  setNearbyVehicles,
  setBookingStep,
  setBookingData,
  resetBooking,
  setActiveRides,
  setCompletedRides,
  setPendingRequests,
  addPendingRequest,
  removePendingRequest,
  updateRideStatus,
  setLoading,
  setError,
  clearError,
} = rideSlice.actions

export const selectCurrentRide = (state) => state.ride.currentRide
export const selectRideHistory = (state) => state.ride.rideHistory
export const selectNearbyVehicles = (state) => state.ride.nearbyVehicles
export const selectBookingStep = (state) => state.ride.bookingStep
export const selectBookingData = (state) => state.ride.bookingData
export const selectActiveRides = (state) => state.ride.activeRides
export const selectCompletedRides = (state) => state.ride.completedRides
export const selectPendingRequests = (state) => state.ride.pendingRequests
export const selectRideLoading = (state) => state.ride.loading
export const selectRideError = (state) => state.ride.error

export default rideSlice.reducer