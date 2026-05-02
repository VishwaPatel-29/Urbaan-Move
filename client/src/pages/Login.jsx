import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme as useMuiTheme,
  Grid,
  Paper,
  Divider,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowForward,
  Person,
  DirectionsCar,
  AdminPanelSettings,
  RocketLaunch,
  CheckCircleOutline,
} from '@mui/icons-material'
import { Google } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { setCredentials, setError, setLoading, selectAuthLoading, selectAuthError } from '../features/authSlice'
import { authService } from '../services/api'
import googleAuthService from '../services/googleAuth'
import BackButton from '../components/BackButton'

const loginSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is too short').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().oneOf(['employee', 'driver', 'admin'], 'Invalid role').required('Role is required'),
})

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useMuiTheme()
  const isDark = theme.palette.mode === 'dark'
  
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // This handles the callback from the rendered Google button
  const handleGoogleCredentialResponse = async (response) => {
    try {
      setGoogleLoading(true)
      toast.loading('Connecting to Google...', { id: 'google-auth' })
      
      // Decode the JWT token
      const userData = googleAuthService.decodeJwtToken(response.credential)
      
      const apiResponse = await authService.googleLogin({
        email: userData.email,
        name: userData.name,
        googleId: userData.sub,
        profilePicture: userData.picture,
      })
      
      const { user, token } = apiResponse.data
      dispatch(setCredentials({ user, token }))
      
      toast.success(`Welcome back, ${user.name}!`, { id: 'google-auth' })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 100)
    } catch (err) {
      console.error('Google login error:', err)
      toast.error('Google login failed', { id: 'google-auth' })
    } finally {
      setGoogleLoading(false)
    }
  }

  useEffect(() => {
    const initGoogle = async () => {
      try {
        await googleAuthService.initGoogleAuth(handleGoogleCredentialResponse)
        // Wait a bit for the DOM to be ready
        setTimeout(() => {
          googleAuthService.renderButton('google-button-container', {
            theme: isDark ? 'filled_black' : 'outline',
            size: 'large',
            width: '440px', // Matches the maxWidth of the form container
          })
        }, 500)
      } catch (err) {
        console.error('Failed to init Google Auth:', err)
      }
    }
    initGoogle()
  }, [isDark])


  const handleGoogleLogin = async (formName) => {
    // This is now handled by the rendered button, but we keep this
    // as a fallback or for triggering One Tap manually
    try {
      setGoogleLoading(true)
      toast.loading('Connecting to Google...', { id: 'google-auth' })
      
      let userData;
      try {
        userData = await googleAuthService.signIn()
      } catch (signInErr) {
        // If it's an origin error, offer mock login in development
        if (signInErr.message.includes('origin') || signInErr.message.includes('Access Blocked')) {
          console.warn('Real Google Auth failed due to origin. Offering mock fallback.')
          const useMock = window.confirm(
            `${signInErr.message}\n\nWould you like to use a Mock Login for development purposes?`
          )
          if (useMock) {
            userData = await googleAuthService.mockSignIn()
          } else {
            throw signInErr
          }
        } else {
          throw signInErr
        }
      }
      
      const response = await authService.googleLogin({
        email: userData.email,
        name: formName || userData.name,
        googleId: userData.googleId,
        profilePicture: userData.profilePicture,
      })
      
      const { user, token } = response.data
      dispatch(setCredentials({ user, token }))
      
      toast.success(`Welcome back, ${user.name}!`, { id: 'google-auth' })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 100)
    } catch (err) {
      console.error('Google login error:', err)
      // If One Tap fails, we don't want to show an error if they can still use the button
      if (err.message !== 'Sign-in dismissed.' && err.message !== 'Sign-in skipped.') {
        toast.error(err.message || 'Google login failed', { id: 'google-auth' })
      } else {
        toast.dismiss('google-auth')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(setLoading(true))
      const response = await authService.login(values)
      const { user, token } = response.data
      
      dispatch(setCredentials({ user, token }))
      
      toast.success(`Welcome back, ${user.name}!`)
      
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin-dashboard')
        } else if (user.role === 'driver') {
          navigate('/driver-dashboard')
        } else {
          navigate('/dashboard')
        }
      }, 100)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      dispatch(setError(message))
      toast.error(message)
    } finally {
      setSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const roleCards = [
    { value: 'employee', label: 'Employee', icon: Person },
    { value: 'driver', label: 'Driver', icon: DirectionsCar },
    { value: 'admin', label: 'Admin', icon: AdminPanelSettings },
  ]

  const featureList = [
    "Enterprise-grade security and encryption",
    "Real-time fleet tracking and analytics",
    "Carbon footprint reduction tracking",
    "Seamless API integrations"
  ]

  return (
    <>
      <Helmet>
        <title>Login | UrbanMove Enterprise</title>
      </Helmet>

      <Box sx={{ height: '100vh', display: 'flex', bgcolor: isDark ? '#0a0a0a' : '#f4f6f8', overflow: 'hidden' }}>
        <Grid container sx={{ flex: 1 }}>
          
          {/* Left Side: Branding Panel (Hidden on mobile) */}
          <Grid item xs={12} md={5} lg={6} sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flexDirection: 'column', 
            bgcolor: '#0f172a', // Deep slate for enterprise feel
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            p: { md: 4, lg: 6 },
            height: '100vh'
          }}>
            {/* Geometric Background Textures */}
            <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, transparent 70%)', zIndex: 0 }} />
            <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.03)', zIndex: 0 }} />
            <Box sx={{ position: 'absolute', bottom: '10%', right: '20%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.05)', zIndex: 0 }} />

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', mb: 4 }}>
              <RocketLaunch sx={{ color: '#00B4B4', fontSize: 32, mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>UrbanMove</Typography>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-1px', lineHeight: 1.1 }}>
                Smart Commuting for the Modern Enterprise.
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', mb: 3, fontWeight: 400, maxWidth: '480px' }}>
                Join hundreds of forward-thinking companies optimizing their employee transportation network.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {featureList.map((feature, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleOutline sx={{ color: '#00B4B4', fontSize: 20 }} />
                    <Typography variant="body1" sx={{ color: '#cbd5e1', fontWeight: 500 }}>{feature}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Side: Login Form */}
          <Grid item xs={12} md={7} lg={6} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 2,
            height: '100vh',
            overflowY: 'auto'
          }}>
            <Box sx={{ width: '100%', maxWidth: '440px' }}>
              <BackButton />
              
              <Box sx={{ mb: 2, display: { xs: 'block', md: 'none' }, textAlign: 'center' }}>
                <RocketLaunch sx={{ color: '#00B4B4', fontSize: 40, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, letterSpacing: '-0.5px' }}>UrbanMove</Typography>
              </Box>

              <Paper elevation={0} sx={{ 
                p: { xs: 2, sm: 3, md: 4 }, 
                borderRadius: '16px', 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.04)',
              }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
                    Sign in to your account
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Enter your professional credentials to access the portal.
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                    {error}
                  </Alert>
                )}

                <Formik
                  initialValues={{ name: '', email: '', password: '', role: 'employee' }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting, setFieldValue, values, handleChange, handleBlur }) => (
                    <Form>
                      
                      {/* Role Toggle Group */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                          Account Type
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, p: 0.5, borderRadius: '8px', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                          {roleCards.map((role) => {
                            const isSelected = values.role === role.value
                            const Icon = role.icon
                            return (
                              <Box
                                key={role.value}
                                onClick={() => setFieldValue('role', role.value)}
                                sx={{
                                  flex: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 1,
                                  py: 1,
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  backgroundColor: isSelected ? theme.palette.background.paper : 'transparent',
                                  boxShadow: isSelected ? (isDark ? '0 2px 4px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)') : 'none',
                                  border: isSelected ? `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` : '1px solid transparent',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <Icon sx={{ fontSize: 18, color: isSelected ? '#00B4B4' : theme.palette.text.secondary }} />
                                <Typography variant="caption" sx={{ fontWeight: isSelected ? 700 : 600, color: isSelected ? theme.palette.text.primary : theme.palette.text.secondary }}>
                                  {role.label}
                                </Typography>
                              </Box>
                            )
                          })}
                        </Box>
                      </Box>

                      {/* Inputs */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>
                            Full Name
                          </Typography>
                          <TextField
                            fullWidth
                            name="name"
                            placeholder="John Doe"
                            variant="outlined"
                            size="medium"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
                              }
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600, display: 'block', mb: 1 }}>
                            Email Address
                          </Typography>
                          <TextField
                            fullWidth
                            name="email"
                            placeholder="you@company.com"
                            type="email"
                            variant="outlined"
                            size="medium"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
                              }
                            }}
                          />
                        </Box>

                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                              Password
                            </Typography>
                            <Link to="/forgot-password" style={{ color: '#00B4B4', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                              Forgot password?
                            </Link>
                          </Box>
                          <TextField
                            fullWidth
                            name="password"
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            size="medium"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ color: theme.palette.text.secondary }}
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#fff',
                              }
                            }}
                          />
                        </Box>
                      </Box>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isSubmitting || loading}
                        sx={{
                          py: 1.2,
                          borderRadius: '8px',
                          backgroundColor: '#00B4B4',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '1rem',
                          textTransform: 'none',
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#008080',
                            boxShadow: 'none',
                          },
                        }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                      </Button>
                      <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
                        <Divider sx={{ flex: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
                        <Typography variant="caption" sx={{ px: 2, color: theme.palette.text.disabled, fontWeight: 600 }}>OR</Typography>
                        <Divider sx={{ flex: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
                      </Box>

                       <Box sx={{ position: 'relative', width: '100%' }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={googleLoading ? <CircularProgress size={20} color="inherit" /> : <Google />}
                          onClick={() => handleGoogleLogin(values.name)}
                          disabled={googleLoading || loading}
                          sx={{ 
                            py: 1.2, 
                            borderRadius: '8px',
                            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', 
                            color: theme.palette.text.primary, 
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': { 
                              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                              borderColor: theme.palette.text.primary
                            },
                          }}
                        >
                          {googleLoading ? 'Connecting...' : 'Continue with Google'}
                        </Button>
                        
                        {/* Real Google Button Overlay (Hidden but clickable) */}
                        <Box 
                          id="google-button-container" 
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            opacity: 0, 
                            zIndex: 2,
                            '& > div': { width: '100% !important', height: '100% !important' },
                            '& iframe': { width: '100% !important', height: '100% !important' }
                          }} 
                        />
                        {/* Dev/Mock Fallback */}
                        {(import.meta.env.MODE === 'development' || true) && (
                          <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <Button 
                              variant="text" 
                              size="small"
                              onClick={() => handleGoogleLogin(values.name || 'Demo User')}
                              sx={{ 
                                color: '#00B4B4', 
                                textTransform: 'none', 
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                '&:hover': { background: 'transparent', textDecoration: 'underline' }
                              }}
                            >
                              Trouble with Google? Use Mock Login
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Paper>



              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.disabled }}>
                  Demo Access: demo@urbanmove.com / Demo1234
                </Typography>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Login
