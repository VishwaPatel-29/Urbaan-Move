import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import DriverDashboard from '../pages/DriverDashboard.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import Booking from '../pages/Booking.jsx'
import Rides from '../pages/Rides.jsx'
import Profile from '../pages/Profile.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/driver-dashboard" element={
        <ProtectedRoute>
          <DriverDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin-dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/book" element={
        <ProtectedRoute>
          <Booking />
        </ProtectedRoute>
      } />
      <Route path="/rides" element={
        <ProtectedRoute>
          <Rides />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes