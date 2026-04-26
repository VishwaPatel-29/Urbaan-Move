const socketService = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('authenticate', (data) => {
      const { userId } = data
      socket.join(`user:${userId}`)
      socket.emit('authenticated', { success: true })
    })

    socket.on('ride:locationUpdate', (data) => {
      const { rideId, location } = data
      io.to(`ride:${rideId}`).emit('vehicle:locationUpdate', location)
    })

    socket.on('ride:join', (data) => {
      const { rideId } = data
      socket.join(`ride:${rideId}`)
    })

    socket.on('ride:leave', (data) => {
      const { rideId } = data
      socket.leave(`ride:${rideId}`)
    })

    socket.on('driver:location', (data) => {
      const { location } = data
      socket.broadcast.emit('driver:locationUpdate', location)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
}

module.exports = socketService