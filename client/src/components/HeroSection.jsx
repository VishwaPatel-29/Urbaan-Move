import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import { useAuth } from '../hooks/useAuth'

const HeroSection = () => {
  const theme = useSelector(selectTheme)
  const { isAuthenticated } = useAuth()

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: theme === 'dark' 
          ? 'radial-gradient(ellipse at center, #0a0a0a 0%, #000 100%)' 
          : 'radial-gradient(ellipse at center, #fff 0%, #f0f0f0 100%)',
        pt: { xs: 10, md: 0 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 180, 180, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '30vw',
          height: '30vw',
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194, 24, 91, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '25vw',
          height: '25vw',
          maxWidth: 350,
          maxHeight: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 182, 193, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
                    <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              color: theme === 'dark' ? '#fff' : '#1a1a1a',
            }}
          >
            Smart Commutes.{' '}
            <Box
              component="span"
              sx={{
                display: 'block',
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Real-Time Routes.
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 400,
              color: theme === 'dark' ? '#a0a0a0' : '#666',
              lineHeight: 1.6,
            }}
          >
            On-demand corporate shuttle and van-pooling platform that dynamically
            routes vehicles based on real-time passenger requests. Say goodbye
            to fixed schedules and hello to smart commuting.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          sx={{ 
            display: 'flex', 
            gap: 2.5, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            alignItems: 'center',
            mx: { xs: 2, sm: 0 }
          }}
        >
          <Button
            component={RouterLink}
            to={isAuthenticated ? '/dashboard' : '/register'}
            variant="contained"
            size="large"
            sx={{
              px: { xs: 4, sm: 5, md: 6 },
              py: 1.5,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 600,
              minWidth: { xs: '140px', sm: '160px' },
              height: { xs: '48px', sm: '52px' },
              borderRadius: 2,
              background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
              boxShadow: '0 4px 15px rgba(0, 180, 180, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)',
                boxShadow: '0 6px 20px rgba(255, 182, 193, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </Button>
          <Button
            component={RouterLink}
            to="/#how-it-works"
            variant="outlined"
            size="large"
            sx={{
              px: { xs: 4, sm: 5, md: 6 },
              py: 1.5,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 600,
              minWidth: { xs: '140px', sm: '160px' },
              height: { xs: '48px', sm: '52px' },
              borderRadius: 2,
              borderColor: '#00B4B4',
              color: '#00B4B4',
              borderWidth: 2,
              boxShadow: '0 2px 10px rgba(0, 180, 180, 0.2)',
              transition: 'all 0.3s ease',
              ml: 2.5,
              '&:hover': {
                borderColor: '#FFB6C1',
                color: '#FFB6C1',
                borderWidth: 2,
                boxShadow: '0 4px 15px rgba(255, 182, 193, 0.3)',
                transform: 'translateY(-2px)',
                background: 'rgba(255, 182, 193, 0.05)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            Learn More
          </Button>
        </motion.div>

        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              px: 2,
              py: 2,
              borderRadius: 2,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(0, 180, 180, 0.05) 0%, rgba(255, 182, 193, 0.02) 100%)',
              border: `1px solid ${theme === 'dark' ? 'rgba(0, 180, 180, 0.2)' : 'rgba(0, 180, 180, 0.1)'}`,
              minWidth: '150px'
            }}
          >
            <Typography
              sx={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              10K+
            </Typography>
            <Typography
              sx={{
                color: theme === 'dark' ? '#a0a0a0' : '#666',
                fontSize: '0.8rem'
              }}
            >
              Active Users
            </Typography>
          </Box>
          
          <Box
            sx={{
              textAlign: 'center',
              px: 2,
              py: 2,
              borderRadius: 2,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(0, 180, 180, 0.05) 0%, rgba(255, 182, 193, 0.02) 100%)',
              border: `1px solid ${theme === 'dark' ? 'rgba(0, 180, 180, 0.2)' : 'rgba(0, 180, 180, 0.1)'}`,
              minWidth: '150px'
            }}
          >
            <Typography
              sx={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              50+
            </Typography>
            <Typography
              sx={{
                color: theme === 'dark' ? '#a0a0a0' : '#666',
                fontSize: '0.8rem'
              }}
            >
              Business Parks
            </Typography>
          </Box>
          
          <Box
            sx={{
              textAlign: 'center',
              px: 2,
              py: 2,
              borderRadius: 2,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(0, 180, 180, 0.05) 0%, rgba(255, 182, 193, 0.02) 100%)',
              border: `1px solid ${theme === 'dark' ? 'rgba(0, 180, 180, 0.2)' : 'rgba(0, 180, 180, 0.1)'}`,
              minWidth: '150px'
            }}
          >
            <Typography
              sx={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              99.9%
            </Typography>
            <Typography
              sx={{
                color: theme === 'dark' ? '#a0a0a0' : '#666',
                fontSize: '0.8rem'
              }}
            >
              Uptime
            </Typography>
          </Box>
        </Box>
      </Box>

          </Box>
  )
}

export default HeroSection