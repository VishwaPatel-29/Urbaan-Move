import React from 'react'
import { Button, Box } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ sx = {}, ...props }) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          color: 'text.secondary',
          borderRadius: '8px',
          px: 2,
          py: 0.5,
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            borderColor: '#00B4B4',
            color: '#00B4B4',
            transform: 'translateX(-4px)',
          },
          ...sx
        }}
        {...props}
      >
        Back
      </Button>
    </Box>
  )
}

export default BackButton
