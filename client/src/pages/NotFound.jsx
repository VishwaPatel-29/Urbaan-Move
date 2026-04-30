import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import Lottie from 'lottie-react'

const notFoundAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  layers: [],
}

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', md: '10rem' },
          fontWeight: 800,
          background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, color: '#fff' }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: 400 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
        }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default NotFound