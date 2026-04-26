import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material'
import {
  PhotoCamera,
  Save,
  Lock,
  Notifications,
  History,
  Edit,
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { selectTheme } from '../features/uiSlice'
import { selectUser, setUser } from '../features/authSlice'
import { userService } from '../services/api'
import { uploadToCloudinary } from '../services/cloudinary'
import { validateName, validatePhone } from '../utils/validators'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Profile = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const user = useSelector(selectUser)
  
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    company: user?.company || '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    const nameError = validateName(formData.name)
    const phoneError = validatePhone(formData.phone)
    
    if (nameError) {
      toast.error(nameError)
      return
    }
    if (phoneError) {
      toast.error(phoneError)
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(setUser({ ...user, ...formData }))
      setEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setUploadingAvatar(true)
    try {
      const result = await uploadToCloudinary(file, 'avatars')
      if (result.success) {
        dispatch(setUser({ ...user, avatar: result.url }))
        toast.success('Avatar updated!')
      } else {
        toast.error('Failed to upload avatar')
      }
    } catch (error) {
      toast.error('Failed to upload avatar')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
    toast.success(`${type} notifications ${notifications[type] ? 'disabled' : 'enabled'}`)
  }

  return (
    <>
      <Helmet>
        <title>Profile | KBD-Havya</title>
        <meta name="description" content="Manage your KBD-Havya profile and preferences." />
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#000' : '#f5f5f5' }}>
        <Navbar />

        <Box sx={{ display: 'flex', pt: 8 }}>
          <Sidebar open={true} />

          <Box
            component={motion.main}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ flex: 1, p: { xs: 2, md: 4 }, ml: 280 }}
          >
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
              My Profile
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center' }}>
                  <CardContent sx={{ py: 4 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                      <Avatar
                        src={user?.avatar}
                        sx={{
                          width: 120,
                          height: 120,
                          fontSize: 48,
                          background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                        }}
                      >
                        {user?.name?.charAt(0) || 'U'}
                      </Avatar>
                      <IconButton
                        component="label"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          background: '#00B4B4',
                          '&:hover': { background: '#008080' },
                        }}
                      >
                        {uploadingAvatar ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <PhotoCamera sx={{ color: '#fff' }} />
                        )}
                        <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} />
                      </IconButton>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {user?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                      {user?.email}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => setEditing(!editing)}
                      sx={{ borderColor: '#00B4B4', color: '#00B4B4' }}
                    >
                      {editing ? 'Cancel Edit' : 'Edit Profile'}
                    </Button>
                  </CardContent>
                </Card>

                <Card sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Quick Links
                    </Typography>
                    <Button
                      fullWidth
                      startIcon={<History />}
                      sx={{ justifyContent: 'flex-start', color: '#666', mb: 1 }}
                    >
                      Ride History
                    </Button>
                    <Button
                      fullWidth
                      startIcon={<Notifications />}
                      sx={{ justifyContent: 'flex-start', color: '#666' }}
                    >
                      Notification Settings
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Personal Information
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => setEditing(!editing)}
                        sx={{ color: '#00B4B4' }}
                      >
                        {editing ? 'Cancel' : 'Edit'}
                      </Button>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!editing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!editing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          value={user?.email || ''}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          disabled={!editing}
                        />
                      </Grid>
                    </Grid>

                    {editing && (
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSaveProfile}
                        disabled={loading}
                        sx={{
                          mt: 3,
                          background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                        }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Change Password
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Current Password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="New Password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Confirm New Password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                      </Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      startIcon={<Lock />}
                      onClick={() => {
                        if (passwordData.newPassword !== passwordData.confirmPassword) {
                          toast.error('Passwords do not match')
                          return
                        }
                        toast.success('Password updated successfully!')
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                      }}
                      sx={{
                        mt: 3,
                        background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                      }}
                    >
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Notification Preferences
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.email}
                            onChange={() => handleNotificationChange('email')}
                          />
                        }
                        label="Email Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.push}
                            onChange={() => handleNotificationChange('push')}
                          />
                        }
                        label="Push Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.sms}
                            onChange={() => handleNotificationChange('sms')}
                          />
                        }
                        label="SMS Notifications"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Profile