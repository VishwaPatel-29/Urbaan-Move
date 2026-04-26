import React from 'react'
import { Box, Typography } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'

const LottieSuccess = () => {
  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box
        component={CheckCircle}
        sx={{ fontSize: 80, color: '#00B4B4' }}
      />
      <Typography variant="h5" sx={{ color: '#00B4B4', fontWeight: 600 }}>
        Success!
      </Typography>
    </Box>
  )
}

export default LottieSuccess