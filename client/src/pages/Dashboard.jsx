import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Fab,
  IconButton,
  Badge,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material'
import {
  DirectionsBus,
  LocationOn,
  Schedule,
  Notifications,
  Chat,
  TrendingUp,
  People,
  Wallet,
  Add,
  ChevronRight,
  Brightness4,
  Brightness7,
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { selectTheme, toggleTheme } from '../features/uiSlice'
import { selectUser } from '../features/authSlice'
import { selectUnreadCount } from '../features/notificationSlice'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import LiveMap from '../components/LiveMap'
import LottieLoader from '../components/LottieLoader'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))
  
  const theme = useSelector(selectTheme)
  const user = useSelector(selectUser)
  const unreadCount = useSelector(selectUnreadCount)
  const { isAuthenticated, logout } = useAuth()
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [notifications, setNotifications] = useState([])
  const [activeRides, setActiveRides] = useState([])
  const [stats, setStats] = useState({ totalRides: 0, thisMonth: 0, saved: 0, co2Saved: 0 })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    
    // Set mock data for demonstration
    setNotifications([
      {
        id: 1,
        title: 'Welcome to KBD-Havya!',
        message: 'Your account has been successfully created.',
        icon: DirectionsBus,
        time: '2 min ago'
      },
      {
        id: 2,
        title: 'First Ride Bonus',
        message: 'Get 20% off on your first ride booking.',
        icon: Wallet,
        time: '1 hour ago'
      },
      {
        id: 3,
        title: 'Route Update',
        message: 'New shuttle route added to your area.',
        icon: LocationOn,
        time: '3 hours ago'
      }
    ])
    
    setStats({
      totalRides: 12,
      thisMonth: 8,
      saved: 24,
      co2Saved: 45
    })
    
    setActiveRides([
      {
        id: 1,
        from: 'Home',
        to: 'Business Park A',
        time: '8:30 AM',
        status: 'scheduled'
      },
      {
        id: 2,
        from: 'Business Park A',
        to: 'Home',
        time: '6:00 PM',
        status: 'scheduled'
      }
    ])
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Logged out successfully')
  }

  const quickActions = [
    { label: 'Book a Ride', icon: DirectionsBus, path: '/book', color: '#00B4B4' },
    { label: 'My Rides', icon: Schedule, path: '/rides', color: '#FFB6C1' },
    { label: 'Profile', icon: People, path: '/profile', color: '#C2185B' },
  ]

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', 
      color: '#fff', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 180, 180, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            KBD-Havya Dashboard
          </h1>
          <p style={{ fontSize: '20px', color: '#a0a0a0', marginBottom: '10px' }}>
            Your Smart Commute Management System
          </p>
        </div>
        
        {/* Welcome Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 180, 180, 0.2)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '60px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>👋</div>
          <h2 style={{ 
            color: '#fff', 
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '15px'
          }}>
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p style={{ color: '#a0a0a0', fontSize: '18px', marginBottom: '10px' }}>
            Ready for your next smart commute?
          </p>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 180, 180, 0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              background: '#00B4B4', 
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Quick Actions
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px'
          }}>
            <button style={{ 
              background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)', 
              color: '#fff', 
              border: 'none', 
              padding: '24px', 
              fontSize: '18px', 
              fontWeight: '600',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 180, 180, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }} 
            onClick={() => window.location.href = '/book'}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '24px' }}>🚌</span>
              Book a Ride
            </button>
            <button style={{ 
              background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)', 
              color: '#fff', 
              border: 'none', 
              padding: '24px', 
              fontSize: '18px', 
              fontWeight: '600',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(255, 182, 193, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }} 
            onClick={() => window.location.href = '/rides'}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '24px' }}>📅</span>
              My Rides
            </button>
            <button style={{ 
              background: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)', 
              color: '#fff', 
              border: 'none', 
              padding: '24px', 
              fontSize: '18px', 
              fontWeight: '600',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(156, 39, 176, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }} 
            onClick={() => window.location.href = '/profile'}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '24px' }}>👤</span>
              Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Your Commute Statistics
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(0, 180, 180, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 180, 180, 0.2)',
              padding: '32px',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚌</div>
              <h4 style={{ color: '#00B4B4', fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>
                {stats.totalRides}
              </h4>
              <p style={{ color: '#a0a0a0', fontSize: '16px', margin: 0 }}>Total Rides</p>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 182, 193, 0.2)',
              padding: '32px',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
              <h4 style={{ color: '#FFB6C1', fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>
                {stats.thisMonth}
              </h4>
              <p style={{ color: '#a0a0a0', fontSize: '16px', margin: 0 }}>This Month</p>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(76, 175, 80, 0.2)',
              padding: '32px',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏰</div>
              <h4 style={{ color: '#4CAF50', fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>
                {stats.saved}h
              </h4>
              <p style={{ color: '#a0a0a0', fontSize: '16px', margin: 0 }}>Time Saved</p>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
              padding: '32px',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
              <h4 style={{ color: '#FF9800', fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>
                {stats.co2Saved}kg
              </h4>
              <p style={{ color: '#a0a0a0', fontSize: '16px', margin: 0 }}>CO2 Reduced</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Recent Notifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map((notif, index) => (
              <div key={index} style={{ 
                background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 180, 180, 0.2)', 
                padding: '24px', 
                borderRadius: '16px', 
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ 
                  fontSize: '32px',
                  background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  minWidth: '40px',
                  textAlign: 'center'
                }}>📢</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                    {notif.title}
                  </h4>
                  <p style={{ color: '#a0a0a0', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
                    {notif.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Live Map
          </h3>
          <LiveMap />
        </div>
      </div>

      {/* Floating Action Button */}
      <div style={{ 
        position: 'fixed', 
        bottom: '32px', 
        right: '32px',
        background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '28px',
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: '0 10px 30px rgba(0, 180, 180, 0.4)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }} 
      onClick={() => window.location.href = '/book'}
      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        +
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default Dashboard