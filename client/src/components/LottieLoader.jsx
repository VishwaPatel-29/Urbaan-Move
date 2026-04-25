import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import DirectionsBus from '@mui/icons-material/DirectionsBus'

const LottieLoader = ({ height = 100, width = 100 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        width,
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: '#00B4B4' }} />
      <Typography variant="body2" sx={{ color: '#666' }}>
        Loading...
      </Typography>
    </Box>
  )
}

export default LottieLoader