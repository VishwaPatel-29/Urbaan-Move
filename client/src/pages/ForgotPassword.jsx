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
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material'
import {
  Email,
  Phone,
  Lock,
  CheckCircle,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Sms
} from '@mui/icons-material'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [method, setMethod] = useState('email') // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const steps = ['Choose Method', 'Verify Identity', 'Set New Password', 'Confirmation']

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const sendVerificationCode = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setCurrentStep(2)
      startResendTimer()
    }, 1500)
  }

  const startResendTimer = () => {
    setResendTimer(60)
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const verifyCode = () => {
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Verification code is required' })
      return
    }
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      if (formData.verificationCode === '123456') {
        setCurrentStep(3)
      } else {
        setErrors({ verificationCode: 'Invalid verification code' })
      }
    }, 1000)
  }

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

  const resetPassword = () => {
    const newErrors = {}
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else {
      const requirements = validatePassword(formData.newPassword)
      const failedRequirements = Object.entries(requirements)
        .filter(([_, passed]) => !passed)
      
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
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        // Redirect to login
        window.location.href = '/login'
      }, 3000)
    }, 1500)
  }

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod)
    setCurrentStep(1)
  }

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0)
    } else if (currentStep === 2) {
      setCurrentStep(1)
    } else if (currentStep === 3) {
      setCurrentStep(2)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '80px', pb: 4 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Reset Password
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
              Password reset successful! Redirecting to login...
            </Alert>
          )}

          <Card>
            <CardContent sx={{ p: 4 }}>
              {currentStep === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Choose Verification Method
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    How would you like to verify your identity?
                  </Typography>
                  
                  <Box display="flex" flexDirection="column" gap={2} mt={3}>
                    <Button
                      variant={method === 'email' ? 'contained' : 'outlined'}
                      size="large"
                      startIcon={<Email />}
                      onClick={() => handleMethodSelect('email')}
                      fullWidth
                    >
                      Email Verification
                    </Button>
                    
                    <Button
                      variant={method === 'phone' ? 'contained' : 'outlined'}
                      size="large"
                      startIcon={<Phone />}
                      onClick={() => handleMethodSelect('phone')}
                      fullWidth
                    >
                      Phone Verification
                    </Button>
                  </Box>

                  {method && (
                    <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {method === 'email' ? 'Email' : 'Phone'} will receive:
                      </Typography>
                      <Typography variant="body2">
                        {method === 'email' 
                          ? 'A 6-digit verification code sent to your email address'
                          : 'A 6-digit verification code sent via SMS'
                        }
                      </Typography>
                    </Paper>
                  )}
                </Box>
              )}

              {currentStep === 1 && (
                <Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    {method === 'email' ? <Email sx={{ mr: 2 }} /> : <Phone sx={{ mr: 2 }} />}
                    <Typography variant="h6">
                      Enter {method === 'email' ? 'Email' : 'Phone Number'}
                    </Typography>
                  </Box>

                  {method === 'email' ? (
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{ mb: 3 }}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      type="tel"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      sx={{ mb: 3 }}
                    />
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={sendVerificationCode}
                    disabled={loading || !(method === 'email' ? formData.email : formData.phone)}
                    startIcon={loading ? <CircularProgress size={20} /> : <Sms />}
                  >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                </Box>
              )}

              {currentStep === 2 && (
                <Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Lock sx={{ mr: 2 }} />
                    <Typography variant="h6">Enter Verification Code</Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    Enter the 6-digit code sent to your {method === 'email' ? 'email' : 'phone'}
                  </Typography>

                  <TextField
                    fullWidth
                    label="Verification Code"
                    value={formData.verificationCode}
                    onChange={handleInputChange('verificationCode')}
                    error={!!errors.verificationCode}
                    helperText={errors.verificationCode || 'Demo: Enter 123456'}
                    sx={{ mb: 3 }}
                  />

                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="body2" color="text.secondary">
                      Didn't receive the code?
                    </Typography>
                    <Button
                      variant="text"
                      disabled={resendTimer > 0}
                      onClick={sendVerificationCode}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </Button>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={verifyCode}
                    disabled={loading || !formData.verificationCode}
                    startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </Box>
              )}

              {currentStep === 3 && (
                <Box>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Lock sx={{ mr: 2 }} />
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
                        <IconButton onClick={() => togglePasswordVisibility('new')}>
                          {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
                        <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                          {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={resetPassword}
                    disabled={loading || !formData.newPassword || !formData.confirmPassword}
                    startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </Box>
              )}

              <Box display="flex" justifyContent="space-between" mt={4}>
                {currentStep > 0 && (
                  <Button 
                    variant="outlined" 
                    onClick={handleBack}
                    disabled={loading}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default ForgotPassword
