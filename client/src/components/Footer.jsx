import React from 'react'
import { Box, Typography, Grid, IconButton, Link } from '@mui/material'
import {
  DirectionsBus,
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'

const Footer = () => {
  const theme = useSelector(selectTheme)
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/#features' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Login', path: '/login' },
    { label: 'Sign Up', path: '/register' },
  ]

  const supportLinks = [
    { label: 'Help Center', path: '/help' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/kbdhavya' },
    { icon: Twitter, href: 'https://twitter.com/kbdhavya' },
    { icon: LinkedIn, href: 'https://linkedin.com/company/kbdhavya' },
    { icon: Instagram, href: 'https://instagram.com/kbdhavya' },
  ]

  return (
    <Box
      component="footer"
      sx={{
        background: theme === 'dark' ? '#0a0a0a' : '#fff',
        borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <DirectionsBus sx={{ color: '#00B4B4', fontSize: 32 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                KBD-Havya
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: theme === 'dark' ? '#a0a0a0' : '#666',
              }}
            >
              Smart Commutes. Real-Time Routes. The future of corporate shuttle
              services is here. Join thousands of employees who trust KBD-Havya
              for their daily commute.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.href}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#00B4B4',
                    border: '1px solid #00B4B4',
                    '&:hover': {
                      background: '#00B4B4',
                      color: '#fff',
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme === 'dark' ? '#fff' : '#1a1a1a',
              }}
            >
              Quick Links
            </Typography>
            {quickLinks.map((link) => (
              <Box key={link.label} sx={{ mb: 1 }}>
                <Link
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: theme === 'dark' ? '#a0a0a0' : '#666',
                    textDecoration: 'none',
                    '&:hover': { color: '#00B4B4' },
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme === 'dark' ? '#fff' : '#1a1a1a',
              }}
            >
              Support
            </Typography>
            {supportLinks.map((link) => (
              <Box key={link.label} sx={{ mb: 1 }}>
                <Link
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: theme === 'dark' ? '#a0a0a0' : '#666',
                    textDecoration: 'none',
                    '&:hover': { color: '#00B4B4' },
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme === 'dark' ? '#fff' : '#1a1a1a',
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOn sx={{ color: '#00B4B4', fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{ color: theme === 'dark' ? '#a0a0a0' : '#666' }}
              >
                123 Business Park Drive, Tech City, TC 12345
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Email sx={{ color: '#00B4B4', fontSize: 20 }} />
              <Link
                href="mailto:support@kbdhavya.com"
                sx={{
                  color: theme === 'dark' ? '#a0a0a0' : '#666',
                  textDecoration: 'none',
                  '&:hover': { color: '#00B4B4' },
                }}
              >
                support@kbdhavya.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone sx={{ color: '#00B4B4', fontSize: 20 }} />
              <Link
                href="tel:+1234567890"
                sx={{
                  color: theme === 'dark' ? '#a0a0a0' : '#666',
                  textDecoration: 'none',
                  '&:hover': { color: '#00B4B4' },
                }}
              >
                +1 (234) 567-890
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 4,
            borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: theme === 'dark' ? '#a0a0a0' : '#666' }}
          >
            &copy; {currentYear} KBD-Havya. All rights reserved. | Smart Commutes.
            Real-Time Routes.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer