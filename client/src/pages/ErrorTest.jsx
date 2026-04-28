import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ErrorTest = () => {
  return (
    <>
      <Helmet>
        <title>Error Test | UrbanMove</title>
        <meta name="description" content="Error test page" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: '#000' }}>
        <Navbar />
        
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ color: '#00B4B4', mb: 4 }}>
              Error Test Page
            </Typography>
            <Typography variant="h5" sx={{ color: '#a0a0a0', mb: 4 }}>
              If you can see this page, the basic routing is working.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" component={Link} to="/">
                Go to Home
              </Button>
              <Button variant="outlined" component={Link} to="/about">
                Go to About
              </Button>
              <Button variant="outlined" component={Link} to="/faq">
                Go to FAQ
              </Button>
              <Button variant="outlined" component={Link} to="/help">
                Go to Help
              </Button>
              <Button variant="outlined" component={Link} to="/contact">
                Go to Contact
              </Button>
              <Button variant="outlined" component={Link} to="/login">
                Go to Login
              </Button>
            </Box>
          </Box>
        </Container>
        
        <Footer />
      </Box>
    </>
  )
}

export default ErrorTest
