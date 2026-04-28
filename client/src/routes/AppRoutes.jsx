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
import ErrorTest from '../pages/ErrorTest.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

import Settings from '../pages/Settings.jsx'
import ChangePassword from '../pages/ChangePassword.jsx'
import ForgotPassword from '../pages/ForgotPassword.jsx'
import EmailVerification from '../pages/EmailVerification.jsx'

import RideHistory from '../pages/RideHistory.jsx'
import RideDetails from '../pages/RideDetails.jsx'
import FindRide from '../pages/FindRide.jsx'
import ScheduleRide from '../pages/ScheduleRide.jsx'
import RideTracking from '../pages/RideTracking.jsx'

import PaymentMethods from '../pages/PaymentMethods.jsx'
import PaymentHistory from '../pages/PaymentHistory.jsx'
import Wallet from '../pages/Wallet.jsx'
import Billing from '../pages/Billing.jsx'

import HelpPage from '../pages/Help.jsx'
import FAQ from '../pages/FAQ.jsx'
import Contact from '../pages/Contact.jsx'
import About from '../pages/About.jsx'
import Terms from '../pages/Terms.jsx'
import Privacy from '../pages/Privacy.jsx'

import UserManagement from '../pages/UserManagement.jsx'
import RideManagement from '../pages/RideManagement.jsx'
import Analytics from '../pages/Analytics.jsx'
import Reports from '../pages/Reports.jsx'

import NotificationsPage from '../pages/Notifications.jsx'
import Messages from '../pages/Messages.jsx'
import MapView from '../pages/MapView.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/error-test" element={<ErrorTest />} />
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

      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />

      <Route path="/change-password" element={
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      } />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/email-verification" element={<EmailVerification />} />

      <Route path="/ride-history" element={
        <ProtectedRoute>
          <RideHistory />
        </ProtectedRoute>
      } />

      <Route path="/ride-details/:id" element={
        <ProtectedRoute>
          <RideDetails />
        </ProtectedRoute>
      } />

      <Route path="/find-ride" element={
        <ProtectedRoute>
          <FindRide />
        </ProtectedRoute>
      } />

      <Route path="/schedule-ride" element={
        <ProtectedRoute>
          <ScheduleRide />
        </ProtectedRoute>
      } />

      <Route path="/ride-tracking/:id" element={
        <ProtectedRoute>
          <RideTracking />
        </ProtectedRoute>
      } />

      <Route path="/payment-methods" element={
        <ProtectedRoute>
          <PaymentMethods />
        </ProtectedRoute>
      } />

      <Route path="/payment-history" element={
        <ProtectedRoute>
          <PaymentHistory />
        </ProtectedRoute>
      } />

      <Route path="/wallet" element={
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      } />

      <Route path="/billing" element={
        <ProtectedRoute>
          <Billing />
        </ProtectedRoute>
      } />

      <Route path="/help" element={<HelpPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route path="/user-management" element={
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      } />

      <Route path="/ride-management" element={
        <ProtectedRoute>
          <RideManagement />
        </ProtectedRoute>
      } />

      <Route path="/analytics" element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      } />

      <Route path="/reports" element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      } />

      <Route path="/messages" element={
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      } />

      <Route path="/map-view" element={
        <ProtectedRoute>
          <MapView />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes