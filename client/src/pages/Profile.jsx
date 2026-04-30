import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
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
  CircularProgress,
  useTheme as useMuiTheme,
  Container
} from '@mui/material'
import {
  PhotoCamera,
  Save,
  Lock,
  Notifications,
  History,
  Edit,
  Badge,
  Business,
  Phone,
  Email,
  Person
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { selectUser, setUser } from '../features/authSlice'
import { validateName, validatePhone } from '../utils/validators'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Profile = () => {
  const dispatch = useDispatch()
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'
  const user = useSelector(selectUser)
  
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
  const [formData, setFormData] = useState({
    name: user?.name || 'Jane Doe', // Mock fallback
    phone: user?.phone || '+1 (555) 123-4567',
    company: user?.company || 'Acme Corp',
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
    
    // Instantly show the selected image in the UI
    const objectUrl = URL.createObjectURL(file)
    setAvatarPreview(objectUrl)
    
    // Read the file as a base64 string to save to Redux
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      
      const updatedUser = user ? { ...user, avatar: base64String } : { 
        name: formData.name, 
        email: 'user@acmecorp.com', 
        avatar: base64String 
      }
      
      dispatch(setUser(updatedUser))
      toast.success('Avatar updated successfully!')
      setUploadingAvatar(false)
    }
    reader.onerror = () => {
      toast.error('Failed to read image file')
      setUploadingAvatar(false)
    }
    reader.readAsDataURL(file)
  }

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
    toast.success(`${type} notifications ${notifications[type] ? 'disabled' : 'enabled'}`)
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
        <title>Profile | UrbanMove Enterprise</title>
      </Helmet>

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#0a0a0a' : '#f4f6f8' }}>
        <Navbar />

        <Box sx={{ flexGrow: 1, pt: { xs: '80px', md: '100px' }, pb: 8 }}>
          <Container maxWidth="lg">
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, letterSpacing: '-0.5px' }}>
                Account Settings
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                Manage your profile, security preferences, and enterprise data.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Left Column: Avatar & Quick Links */}
              <Grid item xs={12} md={4}>
                <Card sx={{ ...cardStyle, mb: 4, textAlign: 'center' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                      <Avatar
                        src={avatarPreview || user?.avatar}
                        sx={{
                          width: 120,
                          height: 120,
                          fontSize: 48,
                          bgcolor: '#00B4B4',
                          color: '#fff',
                          fontWeight: 700
                        }}
                      >
                        {user?.name?.charAt(0) || formData.name.charAt(0) || 'U'}
                      </Avatar>
                      <IconButton
                        component="label"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          '&:hover': { backgroundColor: '#00B4B4', color: '#fff', '& svg': { color: '#fff' } },
                          transition: 'all 0.2s',
                        }}
                      >
                        {uploadingAvatar ? (
                          <CircularProgress size={20} sx={{ color: '#00B4B4' }} />
                        ) : (
                          <PhotoCamera sx={{ color: theme.palette.text.primary, fontSize: 20 }} />
                        )}
                        <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} />
                      </IconButton>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      {formData.name || user?.name || 'User Name'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                      {user?.email || 'user@acmecorp.com'}
                    </Typography>
                    
                    <Divider sx={{ mb: 3, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
                    
                    <Button
                      fullWidth
                      variant={editing ? "outlined" : "contained"}
                      startIcon={<Edit />}
                      onClick={() => setEditing(!editing)}
                      sx={{
                        py: 1.5,
                        borderRadius: '8px',
                        backgroundColor: editing ? 'transparent' : '#00B4B4',
                        color: editing ? theme.palette.text.primary : '#fff',
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                        boxShadow: 'none',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: editing ? 'rgba(0,0,0,0.05)' : '#008080',
                          boxShadow: 'none',
                        }
                      }}
                    >
                      {editing ? 'Cancel Editing' : 'Edit Profile'}
                    </Button>
                  </CardContent>
                </Card>

                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.5px', mb: 2 }}>
                      System Links
                    </Typography>
                    <Button
                      fullWidth
                      startIcon={<History />}
                      sx={{ justifyContent: 'flex-start', color: theme.palette.text.primary, py: 1.5, textTransform: 'none', fontWeight: 500 }}
                    >
                      Commute History
                    </Button>
                    <Button
                      fullWidth
                      startIcon={<Business />}
                      sx={{ justifyContent: 'flex-start', color: theme.palette.text.primary, py: 1.5, textTransform: 'none', fontWeight: 500 }}
                    >
                      Corporate Billing
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Right Column: Forms */}
              <Grid item xs={12} md={8}>
                
                {/* Personal Information */}
                <Card sx={{ ...cardStyle, mb: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Person sx={{ color: '#00B4B4' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                          Enterprise Identity
                        </Typography>
                      </Box>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Full Name</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!editing}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Phone Number</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!editing}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Corporate Email</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={user?.email || 'user@acmecorp.com'}
                          disabled
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Associated Company</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          disabled={!editing}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Employee ID</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={user?.employeeId || 'EMP-94821'}
                          disabled
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' } }}
                        />
                      </Grid>
                    </Grid>

                    {editing && (
                      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          startIcon={<Save />}
                          onClick={handleSaveProfile}
                          disabled={loading}
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
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Profile Details'}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>

                {/* Security */}
                <Card sx={{ ...cardStyle, mb: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={4}>
                      <Lock sx={{ color: '#00B4B4' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        Security & Authentication
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Current Password</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>New Password</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>Confirm New Password</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Grid>
                    </Grid>

                    <Button
                      variant="outlined"
                      onClick={() => {
                        if (passwordData.newPassword !== passwordData.confirmPassword) {
                          toast.error('Passwords do not match')
                          return
                        }
                        if (!passwordData.currentPassword || !passwordData.newPassword) {
                          toast.error('Please fill all password fields')
                          return
                        }
                        toast.success('Password updated successfully!')
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                      }}
                      sx={{
                        mt: 4,
                        py: 1,
                        px: 3,
                        borderRadius: '8px',
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                        color: theme.palette.text.primary,
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card sx={cardStyle}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                      <Notifications sx={{ color: '#00B4B4' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        Notification Preferences
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.email}
                            onChange={() => handleNotificationChange('email')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        }
                        label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Email Notifications (Ride updates & receipts)</Typography>}
                        sx={{ m: 0, p: 1, borderRadius: '8px', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' } }}
                      />
                      <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.push}
                            onChange={() => handleNotificationChange('push')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        }
                        label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Push Notifications (Driver arrival alerts)</Typography>}
                        sx={{ m: 0, p: 1, borderRadius: '8px', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' } }}
                      />
                      <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.sms}
                            onChange={() => handleNotificationChange('sms')}
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#00B4B4' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00B4B4' } }}
                          />
                        }
                        label={<Typography variant="body2" sx={{ fontWeight: 500 }}>SMS Notifications (Critical delays only)</Typography>}
                        sx={{ m: 0, p: 1, borderRadius: '8px', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' } }}
                      />
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

export default Profile