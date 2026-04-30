import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'

const steps = [
  {
    number: '01',
    title: 'Login',
    description: 'Login with your corporate email. Access your profile with commute preferences.',
  },
  {
    number: '02',
    title: 'Book a Ride',
    description: 'Request an on-demand shuttle with a few taps. Choose pickup location and destination.',
  },
  {
    number: '03',
    title: 'Track Live',
    description: 'Watch your driver arrive in real-time. Get updates at every step of the journey.',
  },
  {
    number: '04',
    title: 'Arrive On Time',
    description: 'Reach your destination without the stress. Rate your experience and repeat!',
  },
]

const HowItWorks = () => {
  const theme = useSelector(selectTheme)

  return (
    <Box
      id="how-it-works"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        background: theme === 'dark' ? '#0a0a0a' : '#fff',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: theme === 'dark' ? '#fff' : '#1a1a1a',
            }}
          >
            How It{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Works
            </Box>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 8,
              maxWidth: 600,
              mx: 'auto',
              color: theme === 'dark' ? '#a0a0a0' : '#666',
            }}
          >
            Get started with UrbanMove in four simple steps.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={step.number}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px dashed #00B4B4',
                        animation: 'spin 20s linear infinite',
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {step.number}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: theme === 'dark' ? '#fff' : '#1a1a1a',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme === 'dark' ? '#a0a0a0' : '#666',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </Box>
    </Box>
  )
}

export default HowItWorks