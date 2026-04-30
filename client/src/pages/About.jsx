import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
} from '@mui/material'
import {
  DirectionsCar,
  People,
  Security,
  Star,
  TrendingUp,
  Payment,
  RocketLaunch,
} from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  const navigate = useNavigate()

  const companyStats = [
    { value: '2M+', label: 'Happy Riders' },
    { value: '50K+', label: 'Active Drivers' },
    { value: '100+', label: 'Cities' },
    { value: '4.8/5', label: 'Average Rating' }
  ]

  const features = [
    {
      icon: <DirectionsCar />,
      title: 'Smart Routing',
      description: 'AI-powered route optimization reduces commute time by 40%'
    },
    {
      icon: <Security />,
      title: 'Safety First',
      description: '24/7 monitoring with emergency assistance and driver verification'
    },
    {
      icon: <TrendingUp />,
      title: 'Eco-Friendly',
      description: 'Carbon-neutral rides with electric vehicle options'
    },
    {
      icon: <Payment />,
      title: 'Flexible Payments',
      description: 'Multiple payment options including digital wallets and corporate billing'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'SJ',
      description: 'Visionary leader with 15+ years in transportation tech'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      avatar: 'MC',
      description: 'Tech expert specializing in AI and route optimization'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      avatar: 'ER',
      description: 'Operations guru ensuring smooth rides worldwide'
    },
    {
      name: 'David Kim',
      role: 'Head of Safety',
      avatar: 'DK',
      description: 'Safety advocate implementing industry-leading protocols'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About Us | UrbanMove</title>
        <meta name="description" content="Learn about UrbanMove - The future of urban transportation" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              About UrbanMove
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#a0a0a0',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Revolutionizing urban transportation with smart, sustainable, and customer-centric ride-sharing solutions
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {companyStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(0, 180, 180, 0.05) 100%)',
                    border: '1px solid rgba(0, 180, 180, 0.3)',
                    textAlign: 'center',
                    py: 4,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0, 180, 180, 0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Typography variant="h3" sx={{ color: '#00B4B4', fontWeight: 800, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#a0a0a0' }}>
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card sx={{ mb: 8, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardContent sx={{ p: 6 }}>
              <Typography variant="h3" sx={{ color: '#00B4B4', mb: 3, textAlign: 'center' }}>
                Our Mission
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#fff',
                  textAlign: 'center',
                  mb: 4,
                  maxWidth: '900px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                To transform urban transportation by providing smart, affordable, and sustainable mobility solutions that connect communities and reduce environmental impact.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#a0a0a0',
                  textAlign: 'center',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.8
                }}
              >
                We believe that transportation should be seamless, safe, and sustainable for everyone. Through innovative technology and a commitment to excellence, we're building the future of urban mobility.
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" sx={{ color: '#00B4B4', mb: 4, textAlign: 'center' }}>
              Why Choose UrbanMove
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        background: 'rgba(0, 180, 180, 0.1)',
                        transform: 'translateY(-4px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box sx={{ color: '#00B4B4', mb: 2, fontSize: '3rem' }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" sx={{ color: '#00B4B4', mb: 4, textAlign: 'center' }}>
              Meet Our Leadership Team
            </Typography>
            <Grid container spacing={4}>
              {team.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center',
                      '&:hover': {
                        background: 'rgba(0, 180, 180, 0.1)',
                        transform: 'translateY(-4px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 2,
                          background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                          fontSize: '2rem',
                          fontWeight: 700
                        }}
                      >
                        {member.avatar}
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#00B4B4', mb: 2 }}>
                        {member.role}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Card sx={{ background: 'linear-gradient(135deg, rgba(0, 180, 180, 0.1) 0%, rgba(255, 182, 193, 0.1) 100%)', border: '1px solid rgba(0, 180, 180, 0.3)' }}>
            <CardContent sx={{ p: 6, textAlign: 'center' }}>
              <RocketLaunch sx={{ fontSize: 60, color: '#00B4B4', mb: 3 }} />
              <Typography variant="h4" sx={{ color: '#fff', mb: 3 }}>
                Join the UrbanMove Community
              </Typography>
              <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '600px', mx: 'auto' }}>
                Experience the future of urban transportation with millions of satisfied riders worldwide. Start your journey today!
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/contact')}
                  sx={{
                    background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFB6C1 0%, #C2185B 100%)'
                    }
                  }}
                >
                  Become a Driver
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/contact')}
                  sx={{
                    borderColor: '#00B4B4',
                    color: '#00B4B4',
                    '&:hover': {
                      borderColor: '#FFB6C1',
                      color: '#FFB6C1'
                    }
                  }}
                >
                  Partner With Us
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>

        <Footer />
      </Box>
    </>
  )
}

export default About
