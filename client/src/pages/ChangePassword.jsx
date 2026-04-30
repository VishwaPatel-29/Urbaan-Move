import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material'
import {
  Lock,
  CheckCircle,
  Visibility,
  VisibilityOff,
  Security,
  Key,
  Shield
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ChangePassword = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const steps = ['Verify Current Password', 'Set New Password', 'Confirmation']

  const passwordRequirements = [
    'At least 8 characters long',
    'Contains uppercase letter',
    'Contains lowercase letter',
    'Contains number',
    'Contains special character'
  ]

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    return requirements
  }

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const validateCurrentPassword = () => {
    if (!formData.currentPassword) {
      setErrors({ currentPassword: 'Current password is required' })
      return false
    }
    // Simulate API validation
    setTimeout(() => {
      setCurrentStep(1)
    }, 1000)
    return true
  }

  const validateNewPassword = () => {
    const newErrors = {}
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else {
      const requirements = validatePassword(formData.newPassword)
      const failedRequirements = Object.entries(requirements)
        .filter(([_, passed]) => !passed)
        .map(([req]) => req)
      
      if (failedRequirements.length > 0) {
        newErrors.newPassword = 'Password does not meet all requirements'
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (currentStep === 0) {
      validateCurrentPassword()
    } else if (currentStep === 1) {
      if (validateNewPassword()) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
        setTimeout(() => {
          // Reset form
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          })
          setCurrentStep(0)
          setSuccess(false)
        }, 3000)
      }, 1500)
    }
  }

  const requirements = validatePassword(formData.newPassword)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Change Password
          </Typography>

          <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password changed successfully! You will be redirected to login.
            </Alert>
          )}

          <Card>
            <CardContent sx={{ p: 4 }}>
              {currentStep === 0 && (
                <Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Security sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant="h6">Verify Current Password</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type={showPasswords.current ? 'text' : 'password'}
                    label="Current Password"
                    value={formData.currentPassword}
                    onChange={handleInputChange('currentPassword')}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={() => togglePasswordVisibility('current')}>
                          {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}

              {currentStep === 1 && (
                <Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Key sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant="h6">Set New Password</Typography>
                  </Box>
                  
                  <TextField
                    fullWidth
                    type={showPasswords.new ? 'text' : 'password'}
                    label="New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange('newPassword')}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={() => togglePasswordVisibility('new')}>
                          {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    type={showPasswords.confirm ? 'text' : 'password'}
                    label="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <Button onClick={() => togglePasswordVisibility('confirm')}>
                          {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      )
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Password Requirements:
                    </Typography>
                    <List dense>
                      {passwordRequirements.map((req, index) => {
                        const reqKey = ['length', 'uppercase', 'lowercase', 'number', 'special'][index]
                        const passed = requirements[reqKey]
                        return (
                          <ListItem key={req} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              {passed ? (
                                <CheckCircle color="success" fontSize="small" />
                              ) : (
                                <Lock color="disabled" fontSize="small" />
                              )}
                            </ListItemIcon>
                            <ListItemText 
                              primary={req}
                              sx={{ 
                                '& .MuiListItemText-primary': {
                                  fontSize: '0.875rem',
                                  color: passed ? 'text.primary' : 'text.disabled'
                                }
                              }}
                            />
                          </ListItem>
                        )
                      })}
                    </List>
                  </Paper>
                </Box>
              )}

              {currentStep === 2 && (
                <Box textAlign="center">
                  <Shield sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Ready to Change Password
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Click confirm to update your password. You will need to login again with your new password.
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'left', mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Summary:</Typography>
                    <Typography variant="body2">• Current password: Verified</Typography>
                    <Typography variant="body2">• New password meets all requirements</Typography>
                    <Typography variant="body2">• Passwords match</Typography>
                  </Paper>
                </Box>
              )}

              <Box display="flex" justifyContent="space-between" mt={4}>
                {currentStep > 0 && (
                  <Button 
                    variant="outlined" 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{ ml: 'auto' }}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {currentStep === 0 ? 'Verify' : currentStep === 1 ? 'Continue' : 'Confirm Change'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default ChangePassword
