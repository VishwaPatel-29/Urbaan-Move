import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { ErrorOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const EmptyState = ({
  icon: Icon = ErrorOutline,
  title = 'No data found',
  description = 'There are no items to display at the moment.',
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 10,
        px: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
      </motion.div>
      
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
        {title}
      </Typography>
      
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mb: 4 }}>
        {description}
      </Typography>
      
      {(actionText && (actionLink || onAction)) && (
        <Button
          component={actionLink ? Link : 'button'}
          to={actionLink}
          onClick={onAction}
          variant="contained"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
            boxShadow: '0 4px 14px 0 rgba(0, 180, 180, 0.39)',
            '&:hover': {
              background: 'linear-gradient(135deg, #008080 0%, #006666 100%)',
            },
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  )
}

export default EmptyState
