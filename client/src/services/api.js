// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// API headers configuration
const getHeaders = () => {
  const token = localStorage.getItem('kbd-havya-token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  // For development, return mock responses if backend is not available
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
    return getMockResponse(endpoint, options)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    // For development, return mock response on error
    if (import.meta.env.DEV) {
      console.warn('Using mock response due to API failure')
      return getMockResponse(endpoint, options)
    }
    throw error
  }
}

// Mock response handler for development
const getMockResponse = (endpoint, options) => {
  const mockResponses = {
    '/auth/login': {
      success: true,
      data: {
        user: {
          id: '1',
          name: 'Demo User',
          email: 'demo@kbd-havya.com',
          role: 'user',
          phone: '+1234567890',
          company: 'TechCorp Inc.',
        },
        token: 'mock-jwt-token-123456789'
      },
      message: 'Login successful'
    },
    '/auth/register': {
      success: true,
      data: {
        user: {
          id: '2',
          name: 'New User',
          email: 'user@kbd-havya.com',
          role: 'user',
          phone: '+1234567890',
          company: 'InnovateTech',
        },
        token: 'mock-jwt-token-987654321'
      },
      message: 'Registration successful'
    },
    '/auth/google-login': {
      success: true,
      data: {
        user: {
          id: '3',
          name: 'Google User',
          email: 'google@kbd-havya.com',
          role: 'user',
          phone: '+1234567890',
          company: 'Google Corp',
        },
        token: 'mock-google-jwt-token'
      },
      message: 'Google login successful'
    },
    '/auth/google-register': {
      success: true,
      data: {
        user: {
          id: '4',
          name: 'Google User',
          email: 'google@kbd-havya.com',
          role: 'user',
          phone: '+1234567890',
          company: 'Google Corp',
        },
        token: 'mock-google-jwt-token-register'
      },
      message: 'Google registration successful'
    },
    '/auth/refresh': {
      success: true,
      data: {
        token: 'mock-refreshed-jwt-token-123456789'
      }
    },
    '/auth/logout': {
      success: true,
      message: 'Logout successful'
    }
  }

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponses[endpoint] || { success: false, message: 'Endpoint not found' })
    }, 500)
  })
}

// Authentication service
export const authService = {
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  googleLogin: async (token) => {
    return apiRequest('/auth/google-login', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  },

  googleRegister: async (token) => {
    return apiRequest('/auth/google-register', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },

  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    })
  },

  verifyEmail: async (token) => {
    return apiRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  },

  forgotPassword: async (email) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  resetPassword: async (token, password) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })
  },
}

// User service
export const userService = {
  getProfile: async () => {
    return apiRequest('/user/profile')
  },

  updateProfile: async (userData) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  changePassword: async (passwords) => {
    return apiRequest('/user/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    })
  },

  deleteAccount: async () => {
    return apiRequest('/user/account', {
      method: 'DELETE',
    })
  },
}

// Ride service
export const rideService = {
  getRides: async (filters = {}) => {
    const params = new URLSearchParams(filters)
    return apiRequest(`/rides?${params}`)
  },

  bookRide: async (rideData) => {
    return apiRequest('/rides/book', {
      method: 'POST',
      body: JSON.stringify(rideData),
    })
  },

  cancelRide: async (rideId) => {
    return apiRequest(`/rides/${rideId}/cancel`, {
      method: 'PUT',
    })
  },

  rateRide: async (rideId, rating) => {
    return apiRequest(`/rides/${rideId}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    })
  },

  getActiveRide: async () => {
    return apiRequest('/rides/active')
  },

  getRideHistory: async (page = 1, limit = 10) => {
    return apiRequest(`/rides/history?page=${page}&limit=${limit}`)
  },
}

// Shuttle service
export const shuttleService = {
  getShuttles: async () => {
    return apiRequest('/shuttles')
  },

  getShuttleLocation: async (shuttleId) => {
    return apiRequest(`/shuttles/${shuttleId}/location`)
  },

  getNearbyShuttles: async (lat, lng, radius = 5) => {
    return apiRequest(`/shuttles/nearby?lat=${lat}&lng=${lng}&radius=${radius}`)
  },

  getShuttleSchedule: async (shuttleId) => {
    return apiRequest(`/shuttles/${shuttleId}/schedule`)
  },
}

// Notification service
export const notificationService = {
  getNotifications: async () => {
    return apiRequest('/notifications')
  },

  markAsRead: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    })
  },

  markAllAsRead: async () => {
    return apiRequest('/notifications/mark-all-read', {
      method: 'PUT',
    })
  },

  deleteNotification: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}`, {
      method: 'DELETE',
    })
  },

  subscribeToNotifications: async (deviceToken) => {
    return apiRequest('/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify({ deviceToken }),
    })
  },
}

// Payment service
export const paymentService = {
  getPaymentMethods: async () => {
    return apiRequest('/payments/methods')
  },

  addPaymentMethod: async (paymentData) => {
    return apiRequest('/payments/methods', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  },

  removePaymentMethod: async (methodId) => {
    return apiRequest(`/payments/methods/${methodId}`, {
      method: 'DELETE',
    })
  },

  processPayment: async (paymentData) => {
    return apiRequest('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  },

  getPaymentHistory: async () => {
    return apiRequest('/payments/history')
  },
}

// Admin service
export const adminService = {
  getDashboardStats: async () => {
    return apiRequest('/admin/dashboard')
  },

  getAllUsers: async (page = 1, limit = 10) => {
    return apiRequest(`/admin/users?page=${page}&limit=${limit}`)
  },

  getAllRides: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({ page, limit, ...filters })
    return apiRequest(`/admin/rides?${params}`)
  },

  getAllShuttles: async () => {
    return apiRequest('/admin/shuttles')
  },

  updateUserRole: async (userId, role) => {
    return apiRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    })
  },

  banUser: async (userId) => {
    return apiRequest(`/admin/users/${userId}/ban`, {
      method: 'PUT',
    })
  },

  unbanUser: async (userId) => {
    return apiRequest(`/admin/users/${userId}/unban`, {
      method: 'PUT',
    })
  },
}

// Export default API service
export default {
  authService,
  userService,
  rideService,
  shuttleService,
  notificationService,
  paymentService,
  adminService,
}