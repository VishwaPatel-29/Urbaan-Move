import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/uiSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LottieLoader from '../components/LottieLoader'

const HeroSection = lazy(() => import('../components/HeroSection'))
const FeaturesSection = lazy(() => import('../components/FeaturesSection'))
const HowItWorks = lazy(() => import('../components/HowItWorks'))
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'))
const CTASection = lazy(() => import('../components/CTASection'))


const Landing = () => {
  const theme = useSelector(selectTheme)

  return (
    <>
      <Helmet>
        <title>UrbanMove | Smart Commutes. Real-Time Routes.</title>
        <meta
          name="description"
          content="On-demand corporate shuttle and van-pooling platform for employees commuting to business parks and IT campuses. Book rides, track live, and save time."
        />
        <meta property="og:title" content="UrbanMove | Smart Commutes. Real-Time Routes." />
        <meta
          property="og:description"
          content="On-demand corporate shuttle and van-pooling platform. Dynamic routing based on real-time passenger requests."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          background: theme === 'dark' ? '#000' : '#f5f5f5',
        }}
      >
        <Navbar />

        <Suspense fallback={<LottieLoader />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<LottieLoader />}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<LottieLoader />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<LottieLoader />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<LottieLoader />}>
          <CTASection />
        </Suspense>



        <Footer />
      </Box>
    </>
  )
}

export default Landing