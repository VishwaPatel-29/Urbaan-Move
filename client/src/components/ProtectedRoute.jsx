import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectRole } from '../features/authSlice'

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const role = useSelector(selectRole)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole) {
    if (requiredRole === 'admin' && role !== 'admin') {
      return <Navigate to="/dashboard" replace />
    }
    if (requiredRole === 'driver' && role !== 'driver' && role !== 'admin') {
      return <Navigate to="/dashboard" replace />
    }
  }

  return children
}

export default ProtectedRoute