// Google Analytics utility functions
import { useEffect } from 'react'

// Initialize Google Analytics
export const initGA = (trackingId) => {
  if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', trackingId, {
        page_path: window.location.pathname,
      })
      window.GA_INITIALIZED = true
    }
  }
}

// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path || window.location.pathname,
    })
  }
}

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      custom_parameter_1: 'custom_value',
    })
  }
}

// Hook for automatic page tracking
export const useAnalytics = (trackingId) => {
  useEffect(() => {
    // Initialize GA
    initGA(trackingId)

    // Track initial page view
    trackPageView()

    // Track page changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname)
    }

    // Listen for route changes (works with React Router)
    window.addEventListener('popstate', handleRouteChange)
    
    // Custom event for programmatic navigation
    window.addEventListener('routechange', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('routechange', handleRouteChange)
    }
  }, [trackingId])
}

// Common event tracking functions
export const analyticsEvents = {
  // User authentication events
  login: (method = 'email') => trackEvent('login', { method }),
  register: (method = 'email') => trackEvent('sign_up', { method }),
  logout: () => trackEvent('logout'),

  // Ride booking events
  rideBooked: (rideData) => trackEvent('ride_booked', {
    ride_type: rideData.type,
    distance: rideData.distance,
    price: rideData.price,
  }),
  rideCancelled: (reason) => trackEvent('ride_cancelled', { reason }),
  rideCompleted: (rideData) => trackEvent('ride_completed', {
    ride_type: rideData.type,
    duration: rideData.duration,
    rating: rideData.rating,
  }),

  // User interaction events
  buttonClick: (buttonName, location) => trackEvent('button_click', {
    button_name: buttonName,
    location,
  }),
  formSubmit: (formName) => trackEvent('form_submit', { form_name: formName }),
  search: (searchTerm) => trackEvent('search', { search_term: searchTerm }),

  // Feature usage events
  mapInteraction: (action) => trackEvent('map_interaction', { action }),
  notificationClick: (type) => trackEvent('notification_click', { notification_type: type }),
  themeToggle: (theme) => trackEvent('theme_toggle', { theme }),

  // Error tracking
  error: (error, context) => trackEvent('error', {
    error_message: error.message,
    error_context: context,
  }),

  // Performance events
  pageLoad: (loadTime) => trackEvent('page_load', { load_time: loadTime }),
  apiCall: (endpoint, duration, success) => trackEvent('api_call', {
    endpoint,
    duration,
    success,
  }),
}

// Enhanced ecommerce tracking (if needed)
export const ecommerceEvents = {
  viewItem: (item) => trackEvent('view_item', {
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    category: item.category,
  }),
  addToCart: (item) => trackEvent('add_to_cart', {
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    quantity: item.quantity,
  }),
  beginCheckout: (value, items) => trackEvent('begin_checkout', {
    value,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  }),
  purchase: (transactionId, value, items) => trackEvent('purchase', {
    transaction_id: transactionId,
    value,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  }),
}

// Custom dimensions and metrics
export const customDimensions = {
  setUserRole: (role) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: { 'dimension1': 'user_role' }
      })
      window.gtag('event', 'user_role_dimension', { user_role: role })
    }
  },
  setUserId: (userId) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        user_id: userId
      })
    }
  },
}

// Debug mode for development
export const debugAnalytics = (eventName, parameters) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, parameters)
  }
}

export default {
  initGA,
  trackPageView,
  trackEvent,
  useAnalytics,
  analyticsEvents,
  ecommerceEvents,
  customDimensions,
  debugAnalytics,
}
