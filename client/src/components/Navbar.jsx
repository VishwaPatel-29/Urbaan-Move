import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Tooltip,
  Divider,
  ListItemButton,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Home,
  Person,
  Logout,
  Settings,
  Search,
  Dashboard,
  CalendarMonth,
  DirectionsBus,
  AdminPanelSettings,
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectIsAuthenticated, logout } from '../features/authSlice'
import { selectUnreadCount } from '../features/notificationSlice'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [profileAnchor, setProfileAnchor] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationAnchor, setNotificationAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const unreadCount = useSelector(selectUnreadCount)

  const handleProfileMenuOpen = (event) => {
    setProfileAnchor(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileAnchor(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    handleProfileMenuClose()
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setNotificationAnchor(null)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Book Ride', icon: <CalendarMonth />, path: '/book' },
    { text: 'My Rides', icon: <DirectionsBus />, path: '/rides' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
  ]

  const drawer = (
    <Box sx={{ width: 280, py: 3 }}>
      <Box sx={{ px: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, letterSpacing: '-0.5px' }}>
          UrbanMove
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Corporate Shuttle Platform
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  handleMobileMenuToggle();
                }}
                selected={isActive}
                sx={{
                  borderRadius: '12px',
                  color: isActive ? '#00B4B4' : theme.palette.text.primary,
                  backgroundColor: isActive ? (isDark ? 'rgba(0, 180, 180, 0.15)' : 'rgba(0, 180, 180, 0.1)') : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: isActive ? (isDark ? 'rgba(0, 180, 180, 0.2)' : 'rgba(0, 180, 180, 0.15)') : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                  },
                  '&.Mui-selected': {
                    backgroundColor: isDark ? 'rgba(0, 180, 180, 0.15)' : 'rgba(0, 180, 180, 0.1)',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(0, 180, 180, 0.2)' : 'rgba(0, 180, 180, 0.15)',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#00B4B4' : theme.palette.text.secondary, minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  const getNavButtonStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? '#00B4B4' : theme.palette.text.secondary,
      fontWeight: isActive ? 600 : 500,
      textTransform: 'none',
      px: 2.5,
      py: 1,
      borderRadius: '20px',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? (isDark ? 'rgba(0, 180, 180, 0.15)' : 'rgba(0, 180, 180, 0.1)') : 'transparent',
      '&:hover': {
        backgroundColor: isActive 
          ? (isDark ? 'rgba(0, 180, 180, 0.25)' : 'rgba(0, 180, 180, 0.15)') 
          : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
        color: isActive ? '#00B4B4' : theme.palette.text.primary,
      },
    }
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          boxShadow: isDark ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.03)',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, px: { xs: 2, md: 4 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuToggle}
              edge="start"
              sx={{ mr: 2, color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: 'auto',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.8 }
            }}
          >
            <Box
              component="img"
              src={import.meta.env.BASE_URL + "logo.svg"}
              alt="UrbanMove"
              sx={{
                height: 48,
                width: 'auto',
                filter: isDark ? 'brightness(1.2)' : 'none',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: theme.palette.text.primary,
                display: 'none',
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.2rem', sm: '1.4rem' }
              }}
            >
              UrbanMove
            </Typography>
          </Box>

          {/* Right Side Navigation Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
            {/* Quick Actions - Desktop */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
                <Button onClick={() => navigate('/dashboard')} sx={getNavButtonStyle('/dashboard')}>
                  Dashboard
                </Button>
                <Button onClick={() => navigate('/rides')} sx={getNavButtonStyle('/rides')}>
                  My Rides
                </Button>
                <Button
                  onClick={() => navigate('/book')}
                  variant="contained"
                  sx={{
                    backgroundColor: '#00B4B4',
                    color: '#ffffff',
                    fontWeight: 600,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    ml: 1,
                    borderRadius: '24px',
                    boxShadow: '0 4px 14px rgba(0, 180, 180, 0.3)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: '#009090',
                      boxShadow: '0 6px 20px rgba(0, 180, 180, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                      boxShadow: '0 2px 10px rgba(0, 180, 180, 0.3)',
                    }
                  }}
                >
                  Book a Ride
                </Button>
              </Box>
            )}

            {/* Notifications */}
            {isAuthenticated && (
              <Tooltip title="Notifications">
                <IconButton
                  onClick={handleNotificationOpen}
                  sx={{
                    color: theme.palette.text.secondary,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      color: theme.palette.text.primary,
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Badge 
                    badgeContent={unreadCount} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        boxShadow: `0 0 0 2px ${isDark ? '#000' : '#fff'}`,
                      }
                    }}
                  >
                    <Notifications fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* Settings */}
            {isAuthenticated && (
              <Tooltip title="Settings">
                <IconButton
                  onClick={() => navigate('/settings')}
                  sx={{
                    color: theme.palette.text.secondary,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      color: theme.palette.text.primary,
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Settings fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {/* Login Button */}
            {!isAuthenticated && (
              <Button
                onClick={() => navigate('/login')}
                variant="outlined"
                sx={{
                  borderColor: isDark ? 'rgba(0, 180, 180, 0.5)' : '#00B4B4',
                  color: '#00B4B4',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '20px',
                  px: 3,
                  '&:hover': {
                      backgroundColor: 'rgba(0, 180, 180, 0.1)',
                      borderColor: '#00B4B4',
                  },
                }}
              >
                Login
              </Button>
            )}

            {/* User Profile */}
            {isAuthenticated && (
              <>
                <Tooltip title="Profile">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      ml: 0.5,
                      p: 0.5,
                      border: '2px solid transparent',
                      transition: 'border-color 0.2s',
                      ...(Boolean(profileAnchor) && {
                        borderColor: '#00B4B4',
                      }),
                      '&:hover': {
                        borderColor: 'rgba(0, 180, 180, 0.5)',
                      },
                    }}
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      sx={{ 
                        width: 36, 
                        height: 36,
                        backgroundColor: '#00B4B4',
                        fontWeight: 600,
                      }}
                    >
                      {user?.name?.charAt(0) || <AccountCircle />}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                {/* Profile Menu */}
                <Menu
                  anchorEl={profileAnchor}
                  open={Boolean(profileAnchor)}
                  onClose={handleProfileMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      minWidth: 240,
                      backgroundColor: isDark ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                      boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.5)' : '0 12px 40px rgba(0,0,0,0.1)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      '& .MuiMenuItem-root': {
                        mx: 1,
                        my: 0.5,
                        borderRadius: '8px',
                        color: theme.palette.text.primary,
                        fontSize: '0.95rem',
                        '&:hover': {
                          backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        }
                      }
                    }
                  }}
                >
                  <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={user?.avatar}
                      sx={{ width: 56, height: 56, mb: 1, backgroundColor: '#00B4B4', fontSize: '1.5rem' }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      {user?.name || 'User'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {user?.email || 'user@example.com'}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', my: 1 }} />
                  <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                    <Person sx={{ mr: 1.5, color: theme.palette.text.secondary, fontSize: 20 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}>
                    <Settings sx={{ mr: 1.5, color: theme.palette.text.secondary, fontSize: 20 }} /> Settings
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <MenuItem onClick={() => { navigate('/admin'); handleProfileMenuClose(); }}>
                      <AdminPanelSettings sx={{ mr: 1.5, color: '#00B4B4', fontSize: 20 }} /> Admin Panel
                    </MenuItem>
                  )}
                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', my: 1 }} />
                  <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f !important' }}>
                    <Logout sx={{ mr: 1.5, fontSize: 20 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* Divider between profile and theme toggle */}
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />

            {/* Theme Toggle - Always at the end */}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            backgroundColor: isDark ? 'rgba(15, 15, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            boxShadow: isDark ? '4px 0 24px rgba(0,0,0,0.5)' : '4px 0 24px rgba(0,0,0,0.05)',
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Notifications Popover */}
      {isAuthenticated && (
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 320,
              maxWidth: 400,
              maxHeight: 400,
              backgroundColor: isDark ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.5)' : '0 12px 40px rgba(0,0,0,0.1)',
              borderRadius: '16px',
            }
          }}
        >
          <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }} />
            )}
          </Box>
          <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
          <MenuItem onClick={handleNotificationClose} sx={{ py: 3, display: 'flex', justifyContent: 'center', '&:hover': { backgroundColor: 'transparent' } }}>
            <Box sx={{ textAlign: 'center' }}>
              <Notifications sx={{ fontSize: 40, color: theme.palette.text.disabled, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                No new notifications
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                You're all caught up!
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default Navbar
