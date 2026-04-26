import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  DirectionsBus,
  Home,
  CalendarToday,
  Person,
  Logout,
  Settings,
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

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const unreadCount = useSelector(selectUnreadCount)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    handleMenuClose()
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/home' },
    { text: 'Dashboard', icon: <DirectionsBus />, path: '/dashboard' },
    { text: 'Book Ride', icon: <CalendarToday />, path: '/book' },
    { text: 'My Rides', icon: <CalendarToday />, path: '/rides' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
  ]

  const drawer = (
    <Box onClick={handleMobileMenuToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h6" sx={{ color: '#00B4B4', fontWeight: 700, mb: 2 }}>
        KBD-Havya
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 180, 180, 0.1)',
                borderLeft: '3px solid #00B4B4',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#00B4B4' : '#666' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: location.pathname === item.path ? '#00B4B4' : '#fff',
                },
              }}
            />
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
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#00B4B4',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            🚌 KBD-Havya
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    background: location.pathname === '/' 
                      ? 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' 
                      : 'transparent',
                    color: location.pathname === '/' ? '#fff' : '#00B4B4',
                    border: '2px solid #00B4B4',
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: location.pathname === '/' 
                        ? 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' 
                        : 'rgba(0, 180, 180, 0.1)',
                      borderColor: location.pathname === '/' ? '#FFB6C1' : '#FFB6C1',
                      color: location.pathname === '/' ? '#fff' : '#FFB6C1',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 180, 180, 0.3)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                  }}
                >
                  🏠 Home
                </Button>
                <Button
                  component={Link}
                  to="/rides"
                  sx={{
                    background: location.pathname === '/rides' 
                      ? 'linear-gradient(135deg, #FF6B6B 0%, #C2185B 100%)' 
                      : 'transparent',
                    color: location.pathname === '/rides' ? '#fff' : '#FF6B6B',
                    border: '2px solid #FF6B6B',
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: location.pathname === '/rides' 
                        ? 'linear-gradient(135deg, #FFB6C1 0%, #FF1493 100%)' 
                        : 'rgba(255, 107, 107, 0.1)',
                      borderColor: '#FFB6C1',
                      color: '#FFB6C1',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '0%',
                      height: '2px',
                      background: '#FFB6C1',
                      transition: 'width 0.3s',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  🚗 My Rides
                </Button>
                <Button
                  component={Link}
                  to="/book"
                  sx={{
                    background: location.pathname === '/book' 
                      ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)' 
                      : 'transparent',
                    color: location.pathname === '/book' ? '#fff' : '#4CAF50',
                    border: '2px solid #4CAF50',
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: location.pathname === '/book' 
                        ? 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)' 
                        : 'rgba(76, 175, 80, 0.1)',
                      borderColor: '#8BC34A',
                      color: '#8BC34A',
                      transform: 'translateY(-2px) rotateX(5deg)',
                      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.4s',
                    },
                    '&:hover::before': {
                      width: '100%',
                      height: '100%',
                    },
                  }}
                >
                  📅 Book Ride
                </Button>
              </>
            )}

            {isAuthenticated ? (
              <>
                <IconButton color="inherit" component={Link} to="/dashboard">
                  <Badge badgeContent={unreadCount} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#00B4B4',
                      fontSize: '0.875rem',
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      background: '#1a1a1a',
                      border: '1px solid rgba(0, 180, 180, 0.2)',
                      mt: 1,
                    },
                  }}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                    <ListItemIcon>
                      <Person sx={{ color: '#00B4B4' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      sx={{ '& .MuiListItemText-primary': { color: '#fff' } }}
                    />
                  </MenuItem>
                  <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                    <ListItemIcon>
                      <DirectionsBus sx={{ color: '#00B4B4' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      sx={{ '& .MuiListItemText-primary': { color: '#fff' } }}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout sx={{ color: '#FF6B6B' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Logout"
                      sx={{ '& .MuiListItemText-primary': { color: '#FF6B6B' } }}
                    />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                  color: '#fff',
                  border: '2px solid #9C27B0',
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #BA68C8 0%, #8E24AA 100%)',
                    borderColor: '#BA68C8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.4)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '0',
                    height: '0',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.4s',
                  },
                  '&:hover::before': {
                    width: '100%',
                    height: '100%',
                  },
                }}
              >
                🔑 Login
              </Button>
            )}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            background: '#0a0a0a',
            borderRight: '1px solid rgba(0, 180, 180, 0.2)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar