import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  Badge,
  Business,
  Google,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { setCredentials, setError, setLoading } from '../features/authSlice'
import { authService } from '../services/api'
import googleAuthService from '../services/googleAuth'
import { setSessionItem, getSessionItem } from '../utils/storage'
import Navbar from '../components/Navbar'
import LottieSuccess from '../components/LottieSuccess'

const steps = ['Personal Info', 'Account Details', 'Company Info']

const personalSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').required('Name is required'),
  phone: Yup.string().matches(/^[+]?[\d\s-()]{10,}$/, 'Invalid phone number').required('Phone is required'),
})

const accountSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'At least 8 characters')
    .matches(/[A-Z]/, 'Need uppercase letter')
    .matches(/[a-z]/, 'Need lowercase letter')
    .matches(/[0-9]/, 'Need a number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

const companySchema = Yup.object().shape({
  company: Yup.string().required('Company name is required'),
  employeeId: Yup.string().min(3, 'Minimum 3 characters').required('Employee ID is required'),
})

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.loading)
  const [activeStep, setActiveStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  
  const savedProgress = getSessionItem('kbd-havya-register-progress')
  const [formData, setFormData] = useState(
    savedProgress || { name: '', phone: '', email: '', password: '', confirmPassword: '', company: '', employeeId: '' }
  )

  const schemas = [personalSchema, accountSchema, companySchema]

  const handleNext = async (values) => {
    const newFormData = { ...formData, ...values }
    setFormData(newFormData)
    setSessionItem('kbd-havya-register-progress', newFormData)

    if (activeStep === steps.length - 1) {
      try {
        dispatch(setLoading(true))
        const response = await authService.register(newFormData)
        const { user, token } = response.data
        dispatch(setCredentials({ user, token }))
        setRegisterSuccess(true)
        sessionStorage.removeItem('kbd-havya-register-progress')
        setTimeout(() => {
          toast.success('Welcome to KBD-Havya!')
          navigate('/dashboard')
        }, 1500)
      } catch (err) {
        dispatch(setError(err.message || 'Registration failed'))
        toast.error(err.message || 'Registration failed')
      } finally {
        dispatch(setLoading(false))
      }
    } else {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true)
      toast.loading('Connecting to Google...', { id: 'google-auth' })
      
      // For demo purposes, use mock auth
      // In production, replace with: const userData = await googleAuthService.signIn()
      const userData = await googleAuthService.mockSignIn()
      
      // Send Google user data to backend for registration
      const response = await authService.googleRegister({
        email: userData.email,
        name: userData.name,
        googleId: userData.googleId,
        profilePicture: userData.profilePicture,
        // Skip company/employee info for Google registration
        skipCompanyInfo: true,
      })
      
      const { user, token } = response.data
      dispatch(setCredentials({ user, token }))
      setRegisterSuccess(true)
      
      toast.success('Welcome to KBD-Havya!', { id: 'google-auth' })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Google registration error:', error)
      toast.error('Google registration failed. Please try again.', { id: 'google-auth' })
    } finally {
      setGoogleLoading(false)
    }
  }

  if (registerSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        <LottieSuccess />
      </Box>
    )
  }

  return (
    <>
      <Helmet>
        <title>Sign Up | KBD-Havya</title>
        <meta name="description" content="Create your KBD-Havya account and start commuting smarter." />
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py: 8,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 480,
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                background: '#1a1a1a',
                border: '1px solid #333',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, textAlign: 'center', color: '#a0a0a0' }}
              >
                Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
              </Typography>

              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Formik
                initialValues={formData}
                validationSchema={schemas[activeStep]}
                onSubmit={handleNext}
                enableReinitialize
              >
                {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
                  <Form>
                    <AnimatePresence mode="wait">
                        <Box key={activeStep} sx={{ mb: 3 }}>
                          {activeStep === 0 && (
                            <>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="name"
                                  label="Full Name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.name && Boolean(errors.name)}
                                  helperText={touched.name && errors.name}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Person sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                  }}
                                />
                              </Box>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="phone"
                                  label="Phone Number"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.phone && Boolean(errors.phone)}
                                  helperText={touched.phone && errors.phone}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Phone sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                  }}
                                />
                              </Box>
                            </>
                          )}

                          {activeStep === 1 && (
                            <>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="email"
                                  label="Email"
                                  type="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.email && Boolean(errors.email)}
                                  helperText={touched.email && errors.email}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Email sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                  }}
                                />
                              </Box>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="password"
                                  label="Password"
                                  type={showPassword ? 'text' : 'password'}
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.password && Boolean(errors.password)}
                                  helperText={touched.password && errors.password}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Box>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="confirmPassword"
                                  label="Confirm Password"
                                  type={showPassword ? 'text' : 'password'}
                                  value={values.confirmPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                  helperText={touched.confirmPassword && errors.confirmPassword}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                  }}
                                />
                              </Box>
                            </>
                          )}

                          {activeStep === 2 && (
                            <>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="company"
                                  label="Company Name"
                                  value={values.company}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.company && Boolean(errors.company)}
                                  helperText={touched.company && errors.company}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Business sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                  }}
                                />
                              </Box>
                              <Box sx={{ mb: 3 }}>
                                <TextField
                                  fullWidth
                                  name="employeeId"
                                  label="Employee ID"
                                  value={values.employeeId}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.employeeId && Boolean(errors.employeeId)}
                                  helperText={touched.employeeId && errors.employeeId}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start"><Badge sx={{ color: '#00B4B4' }} /></InputAdornment>,
                                  }}
                                />
                              </Box>
                            </>
                          )}
                        </Box>
                      </AnimatePresence>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {activeStep > 0 && (
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleBack}
                            sx={{ py: 1.5, borderColor: '#333', color: '#fff', '&:hover': { borderColor: '#00B4B4' } }}
                          >
                            Back
                          </Button>
                        )}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={isSubmitting || loading}
                          sx={{
                            py: 1.5,
                            background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                            '&:hover': { background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)' },
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
                        </Button>
                      </Box>
                    </Form>
                  )}
              </Formik>

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>OR</Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={googleLoading ? <CircularProgress size={20} color="inherit" /> : <Google />}
                onClick={handleGoogleRegister}
                disabled={googleLoading}
                sx={{ 
                  py: 1.5, 
                  borderColor: '#333', 
                  color: '#fff', 
                  '&:hover': { 
                    borderColor: '#00B4B4', 
                    background: 'rgba(0, 180, 180, 0.1)' 
                  },
                  '&:disabled': {
                    borderColor: '#555',
                    color: '#777',
                  },
                }}
              >
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </Button>

              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: '#a0a0a0' }}>
                Already have an account? <Link to="/login" style={{ color: '#00B4B4', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  )
}

export default Register