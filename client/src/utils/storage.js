export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error getting item ${key}:`, error)
    return null
  }
}

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting item ${key}:`, error)
    return false
  }
}

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing item ${key}:`, error)
    return false
  }
}

export const clearAll = () => {
  try {
    localStorage.removeItem('urbanmove-user')
    localStorage.removeItem('urbanmove-token')
    localStorage.removeItem('urbanmove-theme')
    localStorage.removeItem('urbanmove-booking-step')
    localStorage.removeItem('urbanmove-filters')
    sessionStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing storage:', error)
    return false
  }
}

export const getSessionItem = (key) => {
  try {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error getting session item ${key}:`, error)
    return null
  }
}

export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting session item ${key}:`, error)
    return false
  }
}

export const removeSessionItem = (key) => {
  try {
    sessionStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing session item ${key}:`, error)
    return false
  }
}

export const clearSessionStorage = () => {
  try {
    sessionStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing session storage:', error)
    return false
  }
}