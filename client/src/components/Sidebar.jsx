import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  DirectionsBus,
  History,
  Person,
  TwoWheeler,
  AdminPanelSettings,
  Settings,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  Logout,
  Help,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, toggleSidebar } from '../features/uiSlice'
import { selectUser } from '../features/authSlice'
import { useAuth } from '../hooks/useAuth'

const mainLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'Book a Ride', path: '/book', icon: DirectionsBus },
  { label: 'My Rides', path: '/rides', icon: History },
]

const userLinks = [
  { label: 'Profile', path: '/profile', icon: Person },
  { label: 'Settings', path: '/settings', icon: Settings },
]

const driverLinks = [
  { label: 'Driver Dashboard', path: '/driver', icon: TwoWheeler },
]

const adminLinks = [
  { label: 'Admin Panel', path: '/admin', icon: AdminPanelSettings },
]

const sideLinks = [
  { label: 'Help & Support', path: '/help', icon: Help },
]

const Sidebar = ({ open }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const theme = useSelector(selectTheme)
  const user = useSelector(selectUser)
  const { hasRole } = useAuth()
  const [expanded, setExpanded] = React.useState(true)

  const isActive = (path) => location.pathname === path

  const NavItem = ({ link }) => (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        component={NavLink}
        to={link.path}
        sx={{
          borderRadius: 2,
          mx: 1,
          background: isActive(link.path) ? 'rgba(0, 180, 180, 0.15)' : 'transparent',
          '&:hover': {
            background: 'rgba(0, 180, 180, 0.1)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <link.icon
            sx={{
              color: isActive(link.path) ? '#00B4B4' : theme === 'dark' ? '#a0a0a0' : '#666',
            }}
          />
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={link.label}
            primaryTypographyProps={{
              sx: {
                color: isActive(link.path) ? '#00B4B4' : theme === 'dark' ? '#fff' : '#1a1a1a',
                fontWeight: isActive(link.path) ? 600 : 400,
              },
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  )

  return (
    <AnimatePresence>
      <Box
        component={motion.aside}
        initial={{ width: open ? 280 : 80 }}
        animate={{ width: open ? 280 : 80 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: 'fixed',
          left: 0,
          top: 64,
          bottom: 0,
          width: open ? 280 : 80,
          background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          borderRight: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0e0e0'}`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, py: 2, overflow: 'auto' }}>
          <List>
            {mainLinks.map((link) => (
              <NavItem key={link.path} link={link} />
            ))}
          </List>

          {(hasRole('driver') || user?.role === 'driver') && (
            <>
              <Divider sx={{ my: 1 }} />
              <List>
                {driverLinks.map((link) => (
                  <NavItem key={link.path} link={link} />
                ))}
              </List>
            </>
          )}

          {hasRole('admin') && (
            <>
              <Divider sx={{ my: 1 }} />
              <List>
                {adminLinks.map((link) => (
                  <NavItem key={link.path} link={link} />
                ))}
              </List>
            </>
          )}

          <Divider sx={{ my: 1 }} />
          <List>
            {userLinks.map((link) => (
              <NavItem key={link.path} link={link} />
            ))}
          </List>

          <Divider sx={{ my: 1 }} />
          <List>
            {sideLinks.map((link) => (
              <NavItem key={link.path} link={link} />
            ))}
          </List>
        </Box>

        <Box sx={{ p: 2, borderTop: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0e0e0'}` }}>
          <Tooltip title={open ? 'Collapse sidebar' : 'Expand sidebar'}>
            <IconButton onClick={() => setExpanded(!expanded)} sx={{ width: '100%' }}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </AnimatePresence>
  )
}

export default Sidebar