import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Badge,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Paper
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  MarkEmailRead,
  Delete,
  Settings,
  Search,
  FilterList,
  DirectionsCar,
  AttachMoney,
  Security,
  Star,
  Person,
  Email,
  Phone,
  CalendarToday,
  LocalOffer,
  Warning,
  Info,
  CheckCircle,
  Error,
  AccessTime
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF001',
      type: 'ride',
      title: 'Ride Completed',
      message: 'Your ride from Downtown to Uptown has been completed. Thank you for riding with UrbanMove!',
      timestamp: '2024-01-20 09:55 AM',
      read: false,
      priority: 'normal',
      action: 'View Receipt',
      icon: <DirectionsCar />
    },
    {
      id: 'NOTIF002',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment of $25.50 for ride RIDE001 has been processed successfully.',
      timestamp: '2024-01-20 09:56 AM',
      read: false,
      priority: 'normal',
      action: 'View Details',
      icon: <AttachMoney />
    },
    {
      id: 'NOTIF003',
      type: 'promotion',
      title: 'Special Offer!',
      message: 'Get 20% off your next 3 rides. Use code SAVE20. Limited time offer!',
      timestamp: '2024-01-19 02:30 PM',
      read: true,
      priority: 'high',
      action: 'Claim Offer',
      icon: <LocalOffer />
    },
    {
      id: 'NOTIF004',
      type: 'safety',
      title: 'Safety Feature Update',
      message: 'New emergency sharing feature added. Share your live location with trusted contacts.',
      timestamp: '2024-01-19 10:15 AM',
      read: true,
      priority: 'low',
      action: 'Learn More',
      icon: <Security />
    },
    {
      id: 'NOTIF005',
      type: 'rating',
      title: 'Rate Your Driver',
      message: 'How was your ride with Sarah Johnson? Your feedback helps us improve.',
      timestamp: '2024-01-18 06:45 PM',
      read: true,
      priority: 'normal',
      action: 'Rate Now',
      icon: <Star />
    },
    {
      id: 'NOTIF006',
      type: 'system',
      title: 'App Update Available',
      message: 'Version 2.5.0 is now available with new features and improvements.',
      timestamp: '2024-01-18 12:00 PM',
      read: true,
      priority: 'low',
      action: 'Update Now',
      icon: <Info />
    }
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    rideUpdates: true,
    paymentAlerts: true,
    promotions: false,
    safetyAlerts: true,
    systemUpdates: true
  })

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  const filters = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'ride', label: 'Ride Updates' },
    { value: 'payment', label: 'Payment' },
    { value: 'promotion', label: 'Promotions' },
    { value: 'safety', label: 'Safety' }
  ]

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleNotificationAction = (notification) => {
    // Handle different actions based on notification type
    console.log(`Action: ${notification.action} for notification: ${notification.id}`)
  }

  const handleSettingChange = (setting) => (event) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: event.target.checked }))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error'
      case 'normal': return 'primary'
      case 'low': return 'default'
      default: return 'default'
    }
  }

  const getTypeIcon = (type) => {
    const notification = notifications.find(n => n.type === type)
    return notification?.icon || <NotificationsIcon />
  }

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notif.read) ||
                         (filter === notif.type)
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Notifications
          </Typography>

          {/* Header with Stats */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={3}>
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon sx={{ fontSize: 32 }} />
                  </Badge>
                  <Box>
                    <Typography variant="h6">
                      {unreadCount} unread notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notifications.length} total notifications
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    startIcon={<MarkEmailRead />}
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    Mark All Read
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={handleClearAll}
                    disabled={notifications.length === 0}
                  >
                    Clear All
                  </Button>
                  <IconButton onClick={() => setShowSettingsDialog(true)}>
                    <Settings />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Filters and Search */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                <TextField
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                  }}
                  size="small"
                  sx={{ minWidth: 250 }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filter}
                    label="Filter"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    {filters.map(f => (
                      <MenuItem key={f.value} value={f.value}>
                        {f.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card>
            <CardContent>
              {filteredNotifications.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <NotificationsIcon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No notifications found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchTerm || filter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'You\'re all caught up! No new notifications.'}
                  </Typography>
                </Box>
              ) : (
                <List>
                  {filteredNotifications.map((notification) => (
                    <ListItem key={notification.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: !notification.read ? 'primary.main' : 'action.disabled' }}>
                          {notification.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ fontWeight: !notification.read ? 'bold' : 'normal' }}
                            >
                              {notification.title}
                            </Typography>
                            <Chip
                              label={notification.priority}
                              color={getPriorityColor(notification.priority)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ fontWeight: !notification.read ? 'medium' : 'normal' }}
                            >
                              {notification.message}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2} mt={1}>
                              <Typography variant="caption" color="text.secondary">
                                <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                                {notification.timestamp}
                              </Typography>
                              <Button
                                variant="text"
                                size="small"
                                onClick={() => handleNotificationAction(notification)}
                              >
                                {notification.action}
                              </Button>
                            </Box>
                          </Box>
                        }
                      />
                      <Box display="flex" alignItems="center" gap={1}>
                        {!notification.read && (
                          <IconButton
                            size="small"
                            onClick={() => handleMarkAsRead(notification.id)}
                            color="primary"
                          >
                            <MarkEmailRead />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteNotification(notification.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings Dialog */}
          <Dialog open={showSettingsDialog} onClose={() => setShowSettingsDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>Notification Channels</Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Push Notifications" secondary="Receive notifications on your device" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={handleSettingChange('pushNotifications')}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onChange={handleSettingChange('emailNotifications')}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="SMS Notifications" secondary="Get important updates via text" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onChange={handleSettingChange('smsNotifications')}
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Notification Types</Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Ride Updates" secondary="Pickup, dropoff, and ride status" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.rideUpdates}
                        onChange={handleSettingChange('rideUpdates')}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Payment Alerts" secondary="Payment confirmations and receipts" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.paymentAlerts}
                        onChange={handleSettingChange('paymentAlerts')}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Promotions" secondary="Special offers and discounts" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.promotions}
                        onChange={handleSettingChange('promotions')}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Safety Alerts" secondary="Emergency and safety notifications" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.safetyAlerts}
                        onChange={handleSettingChange('safetyAlerts')}
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="System Updates" secondary="App updates and maintenance" />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onChange={handleSettingChange('systemUpdates')}
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowSettingsDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowSettingsDialog(false)} variant="contained">
                Save Settings
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default NotificationsPage
