import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { setCredentials, setError, setLoading, selectAuthLoading, selectAuthError } from '../features/authSlice'
import { authService } from '../services/api'
import googleAuthService from '../services/googleAuth'
import Navbar from '../components/Navbar'
import LottieSuccess from '../components/LottieSuccess'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(setLoading(true))
      const response = await authService.login(values)
      const { user, token } = response.data
      
      dispatch(setCredentials({ user, token }))
      setLoginSuccess(true)
      
      setTimeout(() => {
        toast.success('Welcome back!')
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      dispatch(setError(message))
      toast.error(message)
    } finally {
      setSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      toast.loading('Connecting to Google...', { id: 'google-auth' })
      
      // For demo purposes, use mock auth
      // In production, replace with: const userData = await googleAuthService.signIn()
      const userData = await googleAuthService.mockSignIn()
      
      // Send Google user data to backend
      const response = await authService.googleLogin({
        email: userData.email,
        name: userData.name,
        googleId: userData.googleId,
        profilePicture: userData.profilePicture,
      })
      
      const { user, token } = response.data
      dispatch(setCredentials({ user, token }))
      setLoginSuccess(true)
      
      toast.success('Welcome back!', { id: 'google-auth' })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Google login error:', error)
      toast.error('Google login failed. Please try again.', { id: 'google-auth' })
    } finally {
      setGoogleLoading(false)
    }
  }

  if (loginSuccess) {
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
        <title>Login | KBD-Havya</title>
        <meta name="description" content="Login to your KBD-Havya account to book rides and manage your commute." />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
                maxWidth: 440,
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
                Welcome Back
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  textAlign: 'center',
                  color: '#a0a0a0',
                }}
              >
                Sign in to continue to KBD-Havya
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Box sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: '#00B4B4' }} />
                            </InputAdornment>
                          ),
                        }}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#333' },
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#00B4B4' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting || loading}
                      sx={{
                        py: 1.5,
                        mb: 2,
                        background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)',
                        },
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                  </Form>
                )}
              </Formik>

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  OR
                </Typography>
              </Divider>

              <Box sx={{ p: 2, background: 'rgba(0, 180, 180, 0.1)', borderRadius: 2, mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#00B4B4', fontWeight: 600 }}>
                  Demo Credentials:
                </Typography>
                <Box sx={{ mt: 1, fontSize: '0.75rem', color: '#a0a0a0' }}>
                  <Box><strong>Employee:</strong> demo@kbd-havya.com / Demo1234</Box>
                  <Box><strong>Driver:</strong> driver@kbd-havya.com / Driver1234</Box>
                  <Box><strong>Admin:</strong> admin@kbd-havya.com / Admin1234</Box>
                </Box>
                <Button
                  size="small"
                  onClick={() => {
                    document.querySelector('input[name="email"]').value = 'demo@kbd-havya.com'
                    document.querySelector('input[name="password"]').value = 'Demo1234'
                  }}
                  sx={{ mt: 1, color: '#FFB6C1', fontSize: '0.7rem' }}
                >
                  Fill Demo Employee
                </Button>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={googleLoading ? <CircularProgress size={20} color="inherit" /> : <Google />}
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                sx={{
                  py: 1.5,
                  borderColor: '#333',
                  color: '#fff',
                  '&:hover': {
                    borderColor: '#00B4B4',
                    background: 'rgba(0, 180, 180, 0.1)',
                  },
                  '&:disabled': {
                    borderColor: '#555',
                    color: '#777',
                  },
                }}
              >
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </Button>

              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  textAlign: 'center',
                  color: '#a0a0a0',
                }}
              >
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#00B4B4',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  )
}

export default Login