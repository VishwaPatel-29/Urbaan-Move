export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'Email is required'
  if (!emailRegex.test(email)) return 'Invalid email address'
  return null
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  return null
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/
  if (!phone) return 'Phone number is required'
  if (!phoneRegex.test(phone)) return 'Invalid phone number'
  return null
}

export const validateName = (name) => {
  if (!name) return 'Name is required'
  if (name.length < 2) return 'Name must be at least 2 characters'
  if (name.length > 50) return 'Name must be less than 50 characters'
  return null
}

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return null
}

export const validateEmployeeId = (employeeId) => {
  if (!employeeId) return 'Employee ID is required'
  if (employeeId.length < 3) return 'Employee ID must be at least 3 characters'
  return null
}

export const validateCompany = (company) => {
  if (!company) return 'Company name is required'
  if (company.length < 2) return 'Company name must be at least 2 characters'
  return null
}

export const validatePickupLocation = (location) => {
  if (!location) return 'Pickup location is required'
  if (!location.lat || !location.lng) return 'Invalid pickup location'
  return null
}

export const validateDestination = (destination) => {
  if (!destination) return 'Destination is required'
  return null
}

export const validatePickupTime = (time) => {
  if (!time) return 'Pickup time is required'
  const pickupDate = new Date(time)
  const now = new Date()
  if (pickupDate < now) return 'Pickup time cannot be in the past'
  return null
}

export const validatePassengerCount = (count, maxSeats = 6) => {
  if (!count || count < 1) return 'At least 1 passenger is required'
  if (count > maxSeats) return `Maximum ${maxSeats} passengers allowed`
  return null
}

export const validationSchemas = {
  login: {
    email: validateEmail,
    password: (value) => validateRequired(value, 'Password'),
  },

  booking: {
    pickupLocation: validatePickupLocation,
    destination: validateDestination,
    pickupTime: validatePickupTime,
    passengers: (value) => validatePassengerCount(value),
  },
  profile: {
    name: validateName,
    phone: validatePhone,
    company: validateCompany,
  },
}