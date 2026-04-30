import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LottieLoader from '../components/LottieLoader'

// Lazy load pages
const Landing = lazy(() => import('../pages/Landing.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))
const DriverDashboard = lazy(() => import('../pages/DriverDashboard.jsx'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard.jsx'))
const Booking = lazy(() => import('../pages/Booking.jsx'))
const Rides = lazy(() => import('../pages/Rides.jsx'))
const Profile = lazy(() => import('../pages/Profile.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))
const Settings = lazy(() => import('../pages/Settings.jsx'))
const ChangePassword = lazy(() => import('../pages/ChangePassword.jsx'))
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.jsx'))
const RideHistory = lazy(() => import('../pages/RideHistory.jsx'))
const RideDetails = lazy(() => import('../pages/RideDetails.jsx'))
const FindRide = lazy(() => import('../pages/FindRide.jsx'))
const ScheduleRide = lazy(() => import('../pages/ScheduleRide.jsx'))
const RideTracking = lazy(() => import('../pages/RideTracking.jsx'))
const PaymentMethods = lazy(() => import('../pages/PaymentMethods.jsx'))
const PaymentHistory = lazy(() => import('../pages/PaymentHistory.jsx'))
const Wallet = lazy(() => import('../pages/Wallet.jsx'))
const Billing = lazy(() => import('../pages/Billing.jsx'))
const HelpPage = lazy(() => import('../pages/Help.jsx'))
const FAQ = lazy(() => import('../pages/FAQ.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const Terms = lazy(() => import('../pages/Terms.jsx'))
const Privacy = lazy(() => import('../pages/Privacy.jsx'))
const UserManagement = lazy(() => import('../pages/UserManagement.jsx'))
const RideManagement = lazy(() => import('../pages/RideManagement.jsx'))
const Analytics = lazy(() => import('../pages/Analytics.jsx'))
const Reports = lazy(() => import('../pages/Reports.jsx'))
const NotificationsPage = lazy(() => import('../pages/Notifications.jsx'))
const Messages = lazy(() => import('../pages/Messages.jsx'))
const MapView = lazy(() => import('../pages/MapView.jsx'))

import ProtectedRoute from '../components/ProtectedRoute.jsx'

function AppRoutes() {
  return (
    <Suspense fallback={<LottieLoader fullScreen />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rides"
          element={
            <ProtectedRoute>
              <Rides />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/ride-history"
          element={
            <ProtectedRoute>
              <RideHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ride-details/:id"
          element={
            <ProtectedRoute>
              <RideDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/find-ride"
          element={
            <ProtectedRoute>
              <FindRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule-ride"
          element={
            <ProtectedRoute>
              <ScheduleRide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ride-tracking/:id"
          element={
            <ProtectedRoute>
              <RideTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-methods"
          element={
            <ProtectedRoute>
              <PaymentMethods />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-history"
          element={
            <ProtectedRoute>
              <PaymentHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        <Route path="/help" element={<HelpPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ride-management"
          element={
            <ProtectedRoute>
              <RideManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map-view"
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes