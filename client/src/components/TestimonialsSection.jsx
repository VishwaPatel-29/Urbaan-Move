import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Grid, Card, CardContent, Avatar, Rating } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    company: 'TechCorp Inc.',
    avatar: null,
    rating: 5,
    text: 'UrbanMove has completely transformed my commute. I used to waste 45 minutes waiting for the company shuttle. Now I request a ride and it arrives in minutes. Game changer!',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateTech',
    avatar: null,
    rating: 5,
    text: 'The real-time tracking feature is incredible. I know exactly when my shuttle will arrive, so I can plan my morning perfectly. Highly recommend for any corporate campus.',
  },
  {
    name: 'Emily Davis',
    role: 'HR Manager',
    company: 'BusinessPark Solutions',
    avatar: null,
    rating: 5,
    text: 'As an HR manager, I see the impact on employee satisfaction daily. UrbanMove has reduced our shuttle-related complaints by 90%. The analytics dashboard helps us optimize routes.',
  },
  {
    name: 'David Kim',
    role: 'Data Analyst',
    company: 'DataDriven Corp.',
    avatar: null,
    rating: 5,
    text: 'The AI-powered routing is impressive. During off-peak hours, the system groups passengers intelligently, reducing my commute time by 30%. Smart and efficient.',
  },
]

const TestimonialsSection = () => {
  const theme = useSelector(selectTheme)

  return (
    <Box
      id="testimonials"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        background: theme === 'dark' ? '#000' : '#f5f5f5',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: theme === 'dark' ? '#fff' : '#1a1a1a',
            }}
          >
            What Our{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #00B4B4 0%, #FFB6C1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Users Say
            </Box>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 8,
              maxWidth: 600,
              mx: 'auto',
              color: theme === 'dark' ? '#a0a0a0' : '#666',
            }}
          >
            Join thousands of satisfied employees who have upgraded their commute.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={3} key={testimonial.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: theme === 'dark' ? '#1a1a1a' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00B4B4',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{ mb: 2, color: '#FFB6C1' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color: theme === 'dark' ? '#a0a0a0' : '#666',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: '#00B4B4',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: theme === 'dark' ? '#fff' : '#1a1a1a',
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: theme === 'dark' ? '#666' : '#999' }}
                        >
                          {testimonial.role}, {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default TestimonialsSection