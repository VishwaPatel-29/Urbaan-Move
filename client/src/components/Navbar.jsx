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
    <Box sx={{ width: 280, py: 2 }}>
      <Box sx={{ px: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
          UrbanMove
        </Typography>
        <Typography variant="body2" sx={{ color: '#ccc' }}>
          Corporate Shuttle Platform
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 180, 180, 0.2)',
                  color: '#00B4B4',
                  '& .MuiListItemIcon-root': {
                    color: '#00B4B4',
                  },
                },
                mx: 1,
                borderRadius: 1,
                color: '#fff',
              }}
            >
              <ListItemIcon sx={{ color: '#ccc' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 180, 180, 0.2)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuToggle}
              edge="start"
              sx={{ mr: 2, color: '#fff' }}
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
            }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="UrbanMove"
              sx={{
                height: 60,
                width: 'auto',
              }}
            />
          </Box>

          {/* Right Side Navigation Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Quick Actions - Desktop */}
            {!isMobile && (
              <>
                <Button
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    color: location.pathname === '/dashboard' ? '#00B4B4' : 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 180, 180, 0.1)',
                      color: '#00B4B4',
                    },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/rides')}
                  sx={{
                    color: location.pathname === '/rides' ? '#00B4B4' : 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 180, 180, 0.1)',
                      color: '#00B4B4',
                    },
                  }}
                >
                  My Rides
                </Button>
                <Button
                  onClick={() => navigate('/book')}
                  variant="contained"
                  sx={{
                    backgroundColor: '#00B4B4',
                    color: 'white',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#008080',
                    },
                  }}
                >
                  Book a Ride
                </Button>
              </>
            )}

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                onClick={() => navigate('/notifications')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 180, 180, 0.1)',
                    color: '#00B4B4',
                  },
                }}
              >
                <Badge badgeContent={unreadCount} color="error">
                  🔔
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Settings */}
            <Tooltip title="Settings">
              <IconButton
                color="inherit"
                onClick={() => navigate('/settings')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 180, 180, 0.1)',
                    color: '#00B4B4',
                  },
                }}
              >
                ⚙️
              </IconButton>
            </Tooltip>

            {/* Login Button */}
            {!isAuthenticated && (
              <Button
                onClick={() => navigate('/login')}
                variant="outlined"
                sx={{
                  borderColor: '#00B4B4',
                  color: '#00B4B4',
                  fontWeight: 500,
                  textTransform: 'none',
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
                      ml: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 180, 180, 0.1)',
                      },
                    }}
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      sx={{ width: 36, height: 36 }}
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
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      backgroundColor: 'rgba(0, 0, 0, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 180, 180, 0.2)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }
                  }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#fff' }}>
                      {user?.name || 'User'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ccc', fontSize: '0.875rem' }}>
                      {user?.email || 'user@example.com'}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                  <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }} sx={{ color: '#fff' }}>
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/settings'); handleProfileMenuClose(); }} sx={{ color: '#fff' }}>
                    <Settings sx={{ mr: 1 }} /> Settings
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <MenuItem onClick={() => { navigate('/admin'); handleProfileMenuClose(); }} sx={{ color: '#fff' }}>
                      <AdminPanelSettings sx={{ mr: 1 }} /> Admin Panel
                    </MenuItem>
                  )}
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                  <MenuItem onClick={handleLogout} sx={{ color: '#fff' }}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            )}

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
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(0, 180, 180, 0.2)',
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
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 320,
              maxWidth: 400,
              maxHeight: 400,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 180, 180, 0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#fff' }}>
              Notifications
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
          <MenuItem onClick={handleNotificationClose} sx={{ color: '#fff' }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                No new notifications
              </Typography>
              <Typography variant="caption" sx={{ color: '#ccc' }}>
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
