import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Grid,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material'
import {
  Edit,
  CameraAlt,
  Notifications,
  Security,
  Language,
  DarkMode,
  Help
} from '@mui/icons-material'

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890'
  })

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: true,
    autoLocation: true,
    language: 'english'
  })

  const [success, setSuccess] = useState(false)

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field) => {
    setPreferences(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSaveSettings = () => {
    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Settings
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      {/* Profile Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
              <CameraAlt />
            </Avatar>
            <Box>
              <Typography variant="h6">Profile Picture</Typography>
              <Button variant="outlined" startIcon={<CameraAlt />} size="small">
                Change Photo
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={profile.firstName}
                onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={profile.lastName}
                onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Notifications sx={{ mr: 2 }} />
            <Typography variant="h6">Notification Preferences</Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Push Notifications" secondary="Receive push notifications on your device" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={preferences.notifications}
                  onChange={() => handlePreferenceChange('notifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Alerts" secondary="Receive trip updates via email" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={preferences.emailAlerts}
                  onChange={() => handlePreferenceChange('emailAlerts')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="SMS Alerts" secondary="Receive important updates via SMS" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={preferences.smsAlerts}
                  onChange={() => handlePreferenceChange('smsAlerts')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Settings sx={{ mr: 2 }} />
            <Typography variant="h6">App Preferences</Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Dark Mode" secondary="Use dark theme" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={preferences.darkMode}
                  onChange={() => handlePreferenceChange('darkMode')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Auto Location" secondary="Automatically detect your location" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={preferences.autoLocation}
                  onChange={() => handlePreferenceChange('autoLocation')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Language" secondary="Choose your preferred language" />
              <ListItemSecondaryAction>
                <TextField
                  select
                  size="small"
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                  sx={{ minWidth: 120 }}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </TextField>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Quick Actions</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth startIcon={<Security />}>
                Change Password
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth startIcon={<Help />}>
                Help & Support
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" onClick={handleSaveSettings}>
          Save All Settings
        </Button>
      </Box>
    </Container>
  )
}

export default Settings
