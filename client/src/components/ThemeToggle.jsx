import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Tooltip,
  useTheme as useMuiTheme
} from '@mui/material'

import { toggleTheme, selectTheme } from '../features/uiSlice'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const currentTheme = useSelector(selectTheme)
  const muiTheme = useMuiTheme()

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null && newTheme !== currentTheme) {
      dispatch(toggleTheme())
    }
  }

  const isDark = muiTheme.palette.mode === 'dark'

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip 
        title="Theme preference"
        placement="bottom"
        arrow
      >
        <ToggleButtonGroup
          value={currentTheme}
          exclusive
          onChange={handleThemeChange}
          aria-label="Theme selection"
          sx={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            borderRadius: '30px',
            padding: '4px',
            display: 'flex',
            gap: '4px',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            '& .MuiToggleButtonGroup-grouped': {
              border: 'none !important',
              borderRadius: '24px !important',
              margin: '0',
            },
            '& .MuiToggleButton-root': {
              padding: '6px 16px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&.Mui-selected': {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#ffffff',
                boxShadow: isDark 
                  ? '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
                transform: 'scale(1)',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#ffffff',
                }
              },
              '&:not(.Mui-selected)': {
                opacity: 0.5,
                transform: 'scale(0.9)',
                '&:hover': {
                  opacity: 0.8,
                  backgroundColor: 'transparent',
                  transform: 'scale(0.95)',
                }
              }
            }
          }}
        >
          <ToggleButton 
            value="light" 
            aria-label="Light mode"
            sx={{ fontSize: '1.15rem' }}
          >
            ☀️
          </ToggleButton>
          <ToggleButton 
            value="dark" 
            aria-label="Dark mode"
            sx={{ fontSize: '1.15rem' }}
          >
            🌙
          </ToggleButton>
        </ToggleButtonGroup>
      </Tooltip>
    </Box>
  )
}

export default ThemeToggle
