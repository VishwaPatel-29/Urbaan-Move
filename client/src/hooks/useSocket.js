import { useEffect, useCallback, useState } from 'react'
import { initializeSocket, disconnectSocket, on, off } from '../services/socket'

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = initializeSocket()
    
    if (socket) {
      socket.on('connect', () => setIsConnected(true))
      socket.on('disconnect', () => setIsConnected(false))
    }

    return () => {
      disconnectSocket()
    }
  }, [])

  const subscribe = useCallback((event, callback) => {
    on(event, callback)
    return () => off(event, callback)
  }, [])

  const unsubscribe = useCallback((event, callback) => {
    off(event, callback)
  }, [])

  return {
    isConnected,
    subscribe,
    unsubscribe,
  }
}

export default useSocket