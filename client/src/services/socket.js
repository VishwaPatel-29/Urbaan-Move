import { io } from 'socket.io-client'
import { getItem } from '../utils/storage'

let socket = null
const listeners = new Map()

export const initializeSocket = () => {
  if (socket) return socket

  const token = getItem('kbd-havya-token')
  if (!token) {
    console.warn('No auth token found, skipping socket initialization')
    return null
  }

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
  })

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason)
  })

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message)
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    return initializeSocket()
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    listeners.clear()
  }
}

export const emit = (event, data) => {
  const sock = getSocket()
  if (sock) {
    sock.emit(event, data)
  }
}

export const on = (event, callback) => {
  const sock = getSocket()
  if (sock) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
      sock.on(event, (data) => {
        const callbacks = listeners.get(event)
        callbacks.forEach(cb => cb(data))
      })
    }
    listeners.get(event).add(callback)
  }
}

export const off = (event, callback) => {
  if (listeners.has(event) && callback) {
    listeners.get(event).delete(callback)
  } else if (listeners.has(event) && !callback) {
    listeners.delete(event)
  }
}

export const socketEvents = {
  RIDE_REQUESTED: 'ride:requested',
  RIDE_ACCEPTED: 'ride:accepted',
  RIDE_REJECTED: 'ride:rejected',
  RIDE_CANCELLED: 'ride:cancelled',
  RIDE_STARTED: 'ride:started',
  RIDE_COMPLETED: 'ride:completed',
  VEHICLE_LOCATION_UPDATE: 'vehicle:locationUpdate',
  RIDE_STATUS_CHANGE: 'ride:statusChange',
  NEW_NOTIFICATION: 'notification:new',
  DRIVER_LOCATION_UPDATE: 'driver:locationUpdate',
  PASSENGER_PICKED_UP: 'passenger:pickedUp',
  ROUTE_UPDATED: 'route:updated',
}

export const emitRideRequested = (rideData) => {
  emit(socketEvents.RIDE_REQUESTED, rideData)
}

export const emitRideAccepted = (data) => {
  emit(socketEvents.RIDE_ACCEPTED, data)
}

export const emitVehicleLocation = (data) => {
  emit(socketEvents.VEHICLE_LOCATION_UPDATE, data)
}

export const emitRideStatusChange = (data) => {
  emit(socketEvents.RIDE_STATUS_CHANGE, data)
}

export const onRideRequested = (callback) => {
  on(socketEvents.RIDE_REQUESTED, callback)
}

export const onRideAccepted = (callback) => {
  on(socketEvents.RIDE_ACCEPTED, callback)
}

export const onVehicleLocationUpdate = (callback) => {
  on(socketEvents.VEHICLE_LOCATION_UPDATE, callback)
}

export const onRideStatusChange = (callback) => {
  on(socketEvents.RIDE_STATUS_CHANGE, callback)
}

export const onNewNotification = (callback) => {
  on(socketEvents.NEW_NOTIFICATION, callback)
}

export const offRideRequested = (callback) => {
  off(socketEvents.RIDE_REQUESTED, callback)
}

export const offRideAccepted = (callback) => {
  off(socketEvents.RIDE_ACCEPTED, callback)
}

export const offVehicleLocationUpdate = (callback) => {
  off(socketEvents.VEHICLE_LOCATION_UPDATE, callback)
}

export const offRideStatusChange = (callback) => {
  off(socketEvents.RIDE_STATUS_CHANGE, callback)
}

export const offNewNotification = (callback) => {
  off(socketEvents.NEW_NOTIFICATION, callback)
}

export default {
  initializeSocket,
  getSocket,
  disconnectSocket,
  emit,
  on,
  off,
  emitRideRequested,
  emitRideAccepted,
  emitVehicleLocation,
  emitRideStatusChange,
  onRideRequested,
  onRideAccepted,
  onVehicleLocationUpdate,
  onRideStatusChange,
  onNewNotification,
  offRideRequested,
  offRideAccepted,
  offVehicleLocationUpdate,
  offRideStatusChange,
  offNewNotification,
}