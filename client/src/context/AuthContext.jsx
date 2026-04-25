import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectIsAuthenticated, setUser, logout } from '../features/authSlice'

const AuthContext = createContext()

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

const AuthProvider = ({ children }) => {
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()

  const login = (userData) => {
    dispatch(setUser(userData))
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout: logoutUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }