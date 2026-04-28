import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Container, Grid, IconButton, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import { 
  Facebook, 
  Twitter, 
  LinkedIn, 
  Instagram, 
  Email, 
  Phone, 
  LocationOn,
  DirectionsCar,
  Payment,
  Security,
  Help,
  People,
  AccessTime,
  TrendingUp
} from '@mui/icons-material'

const Footer = () => {
  const theme = useSelector(selectTheme)

  const linkStyle = {
    color: theme === 'dark' ? '#888' : '#666',
    textDecoration: 'none',
    fontSize: '0.875rem',
  }

  const linkHoverStyle = {
    color: '#008080',
    textDecoration: 'none',
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        background: theme === 'dark' ? '#0A0A0A' : '#F8F9FA',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Grid - 5 columns, 2 rows */}
        <Grid container spacing={4}>
          {/* Row 1 - Company Info & Navigation */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: theme === 'dark' ? '#008080' : '#006666', mb: 1, fontWeight: 700 }}>
                UrbanMove
              </Typography>
              <Typography variant="body2" sx={{ color: theme === 'dark' ? '#888' : '#666', mb: 2 }}>
                Smart Commutes. Real-Time Routes.
              </Typography>
              
              {/* Social Media Icons */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <IconButton
                  size="small"
                  sx={{ 
                    color: theme === 'dark' ? '#888' : '#666',
                    '&:hover': { color: '#008080' }
                  }}
                  href="https://facebook.com"
                  target="_blank"
                >
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ 
                    color: theme === 'dark' ? '#888' : '#666',
                    '&:hover': { color: '#008080' }
                  }}
                  href="https://twitter.com"
                  target="_blank"
                >
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ 
                    color: theme === 'dark' ? '#888' : '#666',
                    '&:hover': { color: '#008080' }
                  }}
                  href="https://linkedin.com"
                  target="_blank"
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ 
                    color: theme === 'dark' ? '#888' : '#666',
                    '&:hover': { color: '#008080' }
                  }}
                  href="https://instagram.com"
                  target="_blank"
                >
                  <Instagram fontSize="small" />
                </IconButton>
              </Box>

              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: '#008080' }} />
                  <Typography variant="caption" sx={{ color: theme === 'dark' ? '#888' : '#666' }}>
                    support@urbanmove.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: '#008080' }} />
                  <Typography variant="caption" sx={{ color: theme === 'dark' ? '#888' : '#666' }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: '#008080' }} />
                  <Typography variant="caption" sx={{ color: theme === 'dark' ? '#888' : '#666' }}>
                    San Francisco, CA
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: theme === 'dark' ? '#fff' : '#333', mb: 2, fontWeight: 600 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/" style={linkStyle}>
                  Home
                </Link>
                <Link to="/about" style={linkStyle}>
                  About Us
                </Link>
                <Link to="/dashboard" style={linkStyle}>
                  Dashboard
                </Link>
                <Link to="/booking" style={linkStyle}>
                  Book Ride
                </Link>
                <Link to="/rides" style={linkStyle}>
                  My Rides
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: theme === 'dark' ? '#fff' : '#333', mb: 2, fontWeight: 600 }}>
                Services
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/find-ride" style={linkStyle}>
                  Find Ride
                </Link>
                <Link to="/schedule-ride" style={linkStyle}>
                  Schedule Ride
                </Link>
                <Link to="/ride-tracking" style={linkStyle}>
                  Live Tracking
                </Link>
                <Link to="/payment-methods" style={linkStyle}>
                  Payment
                </Link>
                <Link to="/wallet" style={linkStyle}>
                  Wallet
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: theme === 'dark' ? '#fff' : '#333', mb: 2, fontWeight: 600 }}>
                Support & Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/help" style={linkStyle}>
                  Help Center
                </Link>
                <Link to="/faq" style={linkStyle}>
                  FAQ
                </Link>
                <Link to="/contact" style={linkStyle}>
                  Contact Us
                </Link>
                <Link to="/terms" style={linkStyle}>
                  Terms of Service
                </Link>
                <Link to="/privacy" style={linkStyle}>
                  Privacy Policy
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: theme === 'dark' ? '#fff' : '#333', mb: 2, fontWeight: 600 }}>
                Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/profile" style={linkStyle}>
                  Profile
                </Link>
                <Link to="/settings" style={linkStyle}>
                  Settings
                </Link>
                <Link to="/notifications" style={linkStyle}>
                  Notifications
                </Link>
                <Link to="/messages" style={linkStyle}>
                  Messages
                </Link>
                <Link to="/map-view" style={linkStyle}>
                  Map View
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Row 2 - Bottom Footer */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 3, borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }} />
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2 
            }}>
              <Box>
                <Typography variant="body2" sx={{ color: theme === 'dark' ? '#888' : '#666' }}>
                  © 2024 UrbanMove. All rights reserved.
                </Typography>
                <Typography variant="caption" sx={{ color: theme === 'dark' ? '#666' : '#999', display: 'block' }}>
                  Smart Commutes. Real-Time Routes. Making corporate travel efficient.
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Link to="/privacy" style={linkStyle}>
                  Cookie Policy
                </Link>
                <Link to="/billing" style={linkStyle}>
                  Billing
                </Link>
                <Link to="/analytics" style={linkStyle}>
                  Analytics
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
