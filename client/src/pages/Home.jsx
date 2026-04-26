import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Typography, Button, Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  const theme = useSelector(selectTheme)

  return (
    <>
      <Helmet>
        <title>Home | KBD-Havya</title>
        <meta name="description" content="Welcome to KBD-Havya - Your Smart Commute Dashboard" />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          background: theme === 'dark' ? '#000' : '#f5f5f5',
        }}
      >
        <Navbar />

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Welcome Home
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme === 'dark' ? '#a0a0a0' : '#666',
                mb: 4,
              }}
            >
              Your Smart Commute Dashboard
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  component={Link}
                  to="/dashboard"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)',
                    },
                  }}
                >
                  🚌 Go to Dashboard
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/book"
                  size="large"
                  sx={{
                    borderColor: '#00B4B4',
                    color: '#00B4B4',
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: '#FFB6C1',
                      color: '#FFB6C1',
                    },
                  }}
                >
                  Book a Ride
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(0, 180, 180, 0.05) 100%)',
                  borderRadius: 3,
                  border: '2px solid rgba(0, 180, 180, 0.3)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0, 180, 180, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(0, 180, 180, 0.2)',
                  }}
                />
                <Typography variant="h3" sx={{ color: '#00B4B4', mb: 2, fontWeight: 800 }}>
                  🚀
                </Typography>
                <Typography variant="h5" sx={{ color: '#00B4B4', mb: 2, fontWeight: 600 }}>
                  Smart Routing
                </Typography>
                <Typography sx={{ color: theme === 'dark' ? '#a0a0a0' : '#666', mb: 3 }}>
                  AI-powered route optimization reduces commute time by 40%
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/dashboard"
                  sx={{
                    borderColor: '#00B4B4',
                    color: '#00B4B4',
                    '&:hover': {
                      background: 'rgba(0, 180, 180, 0.1)',
                    },
                  }}
                >
                  Explore Routes
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%)',
                  borderRadius: 3,
                  border: '2px solid rgba(255, 182, 193, 0.3)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(255, 182, 193, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(255, 182, 193, 0.2)',
                  }}
                />
                <Typography variant="h3" sx={{ color: '#FFB6C1', mb: 2, fontWeight: 800 }}>
                  📍
                </Typography>
                <Typography variant="h5" sx={{ color: '#FFB6C1', mb: 2, fontWeight: 600 }}>
                  Live Tracking
                </Typography>
                <Typography sx={{ color: theme === 'dark' ? '#a0a0a0' : '#666', mb: 3 }}>
                  Real-time GPS tracking shows your shuttle's exact location
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/rides"
                  sx={{
                    borderColor: '#FFB6C1',
                    color: '#FFB6C1',
                    '&:hover': {
                      background: 'rgba(255, 182, 193, 0.1)',
                    },
                  }}
                >
                  Track Now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
                  borderRadius: 3,
                  border: '2px solid rgba(76, 175, 80, 0.3)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(76, 175, 80, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(76, 175, 80, 0.2)',
                  }}
                />
                <Typography variant="h3" sx={{ color: '#4CAF50', mb: 2, fontWeight: 800 }}>
                  💎
                </Typography>
                <Typography variant="h5" sx={{ color: '#4CAF50', mb: 2, fontWeight: 600 }}>
                  Premium Comfort
                </Typography>
                <Typography sx={{ color: theme === 'dark' ? '#a0a0a0' : '#666', mb: 3 }}>
                  Luxury vehicles with WiFi, AC, and comfortable seating
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/book"
                  sx={{
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                      background: 'rgba(76, 175, 80, 0.1)',
                    },
                  }}
                >
                  Book Premium
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </Box>
    </>
  )
}

export default Home