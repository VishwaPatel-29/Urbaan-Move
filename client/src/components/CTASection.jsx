import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import { useAuth } from '../hooks/useAuth'

const CTASection = () => {
  const theme = useSelector(selectTheme)
  const { isAuthenticated } = useAuth()

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' 
          : 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: 'auto',
            textAlign: 'center',
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' 
              : 'linear-gradient(135deg, #008080 0%, #00B4B4 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              animation: 'pulse 4s ease-in-out infinite',
            },
          }}
        >
          <style>
            {`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 0.3; }
              }
            `}
          </style>

          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#fff',
              position: 'relative',
            }}
          >
            Ready to Transform Your Commute?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.9)',
              position: 'relative',
            }}
          >
            Join thousands of employees who have already upgraded to smarter,
            faster, and more reliable corporate transportation.
          </Typography>
          <Button
            component={RouterLink}
            to={isAuthenticated ? '/dashboard' : '/login'}
            variant="contained"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              background: '#fff',
              color: '#008080',
              position: 'relative',
              '&:hover': {
                background: '#FFB6C1',
                color: '#fff',
              },
            }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
          </Button>
        </Box>
      </motion.div>
    </Box>
  )
}

export default CTASection