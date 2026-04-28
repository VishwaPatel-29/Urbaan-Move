import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import {
  DirectionsBus,
  AccessTime,
  LocationOn,
  Verified,
  Security,
  Support,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'

const features = [
  {
    icon: DirectionsBus,
    title: 'On-Demand Rides',
    description: 'Request a shuttle anytime. No more waiting for fixed schedules. Our AI-powered system matches you with the nearest available vehicle.',
  },
  {
    icon: AccessTime,
    title: 'Real-Time Tracking',
    description: 'Know exactly where your shuttle is. Live GPS tracking shows you the ETA and driver location in real-time.',
  },
  {
    icon: LocationOn,
    title: 'Smart Routing',
    description: 'Our routing engine optimizes routes dynamically, reducing commute time by up to 40% compared to traditional shuttles.',
  },
  {
    icon: Verified,
    title: 'Verified Drivers',
    description: 'All drivers are background-checked, trained, and verified. Your safety is our top priority.',
  },
  {
    icon: Security,
    title: 'Corporate Security',
    description: 'Enterprise-grade security with SSO integration, audit logs, and compliance reporting.',
  },
  {
    icon: Support,
    title: '24/7 Support',
    description: 'Round-the-clock support via in-app chat, WhatsApp, and phone. We are always here to help.',
  },
]

const FeaturesSection = () => {
  const theme = useSelector(selectTheme)

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        background: theme === 'dark' ? 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)' : 'linear-gradient(180deg, #f5f5f5 0%, #fff 100%)',
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
            Why Choose{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              UrbanMove
            </Box>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              color: theme === 'dark' ? '#a0a0a0' : '#666',
            }}
          >
            Experience the future of corporate commuting with features designed for the modern workforce.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: theme === 'dark' ? '#1a1a1a' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00B4B4',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0, 180, 180, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <feature.icon
                      sx={{
                        fontSize: 48,
                        color: '#00B4B4',
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: theme === 'dark' ? '#fff' : '#1a1a1a',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme === 'dark' ? '#a0a0a0' : '#666',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default FeaturesSection