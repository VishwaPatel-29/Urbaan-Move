import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  useTheme as useMuiTheme
} from '@mui/material'
import {
  Notifications,
  Security,
  Help,
  Settings as SettingsIcon,
  Language,
  DarkMode,
  LocationOn
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Settings = () => {
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: true,
    autoLocation: true,
    language: 'english'
  })

  const [success, setSuccess] = useState(false)

  const handlePreferenceChange = (field) => {
    setPreferences(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSaveSettings = () => {
    // Simulate API call
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const cardStyle = {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: 'none',
  }

  return (
    <>
      <Helmet>
        <title>Settings | UrbanMove Enterprise</title>
      </Helmet>

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#0a0a0a' : '#f4f6f8' }}>
        <Navbar />

        <Box sx={{ flexGrow: 1, pt: { xs: '80px', md: '100px' }, pb: 8 }}>
          <Container maxWidth="lg">
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, letterSpacing: '-0.5px' }}>
                System Settings
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Configure application behaviors and system preferences.
              </Typography>
            </Box>

            {success && (
              <Alert severity="success" sx={{ mb: 4, borderRadius: '8px' }}>
                Enterprise settings successfully synchronized.
              </Alert>
            )}

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                {/* App Preferences */}
                <Card sx={{ ...cardStyle, mb: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <SettingsIcon sx={{ color: '#00B4B4' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Application Preferences
                      </Typography>
                    </Box>
                    <List disablePadding>
                      <ListItem disableGutters>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600 }}>Theme Mode</Typography>}
                          secondary="Toggle application dark theme" 
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={preferences.darkMode}
                            onChange={() => handlePreferenceChange('darkMode')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider sx={{ my: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} />
                      <ListItem disableGutters>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600 }}>Location Services</Typography>}
                          secondary="Automatically detect coordinates" 
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={preferences.autoLocation}
                            onChange={() => handlePreferenceChange('autoLocation')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider sx={{ my: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} />
                      <ListItem disableGutters>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600 }}>Language</Typography>}
                          secondary="Set global locale" 
                        />
                        <ListItemSecondaryAction>
                          <TextField
                            select
                            size="small"
                            value={preferences.language}
                            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                            sx={{ minWidth: 140, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                          >
                            <MenuItem value="english">English (US)</MenuItem>
                            <MenuItem value="spanish">Spanish (ES)</MenuItem>
                            <MenuItem value="french">French (FR)</MenuItem>
                          </TextField>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Administrative Actions</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Button 
                          variant="outlined" 
                          fullWidth 
                          startIcon={<Security />}
                          sx={{ py: 1.5, borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: theme.palette.text.primary }}
                        >
                          Change Password
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button 
                          variant="outlined" 
                          fullWidth 
                          startIcon={<Help />}
                          sx={{ py: 1.5, borderRadius: '8px', textTransform: 'none', fontWeight: 600, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: theme.palette.text.primary }}
                        >
                          Help & Support
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                {/* Notification Preferences */}
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <Notifications sx={{ color: '#00B4B4' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Alert Configurations
                      </Typography>
                    </Box>
                    <List disablePadding>
                      <ListItem disableGutters>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600 }}>Push Notifications</Typography>}
                          secondary="Receive system alerts on device" 
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={preferences.notifications}
                            onChange={() => handlePreferenceChange('notifications')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider sx={{ my: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} />
                      <ListItem disableGutters>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600 }}>Email Digests</Typography>}
                          secondary="Receive weekly commute summaries" 
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={preferences.emailAlerts}
                            onChange={() => handlePreferenceChange('emailAlerts')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider sx={{ my: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} />
                      <ListItem disableGutters>
                        <ListItemText 
                          primary={<Typography sx={{ fontWeight: 600 }}>SMS Urgent Alerts</Typography>}
                          secondary="For critical ride interruptions" 
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={preferences.smsAlerts}
                            onChange={() => handlePreferenceChange('smsAlerts')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>

                    <Box display="flex" justifyContent="flex-end" mt={5}>
                      <Button 
                        variant="contained" 
                        onClick={handleSaveSettings}
                        sx={{
                          py: 1,
                          px: 4,
                          borderRadius: '8px',
                          backgroundColor: '#00B4B4',
                          boxShadow: 'none',
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': { backgroundColor: '#008080', boxShadow: 'none' }
                        }}
                      >
                        Synchronize Settings
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default Settings
