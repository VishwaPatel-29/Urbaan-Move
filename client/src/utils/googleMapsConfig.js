// Google Maps Configuration
export const GOOGLE_MAPS_CONFIG = {
  // Check if API key is properly configured
  isApiKeyValid: () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    return apiKey && 
           apiKey !== '' && 
           apiKey !== 'your_google_maps_api_key' &&
           apiKey !== 'AIzaSyDemoKeyForDevelopment' &&
           !apiKey.includes('demo') &&
           !apiKey.includes('test') &&
           apiKey.length > 30 // Valid API keys are longer
  },
  
  // Get API key or return null to disable maps
  getApiKey: () => {
    if (GOOGLE_MAPS_CONFIG.isApiKeyValid()) {
      return import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }
    // Return null to disable Google Maps when no valid key is available
    return null
  },
  
  // Check if Google Maps should be disabled
  shouldDisableMaps: () => {
    return !GOOGLE_MAPS_CONFIG.isApiKeyValid()
  },
  
  // Error message for missing/invalid API key
  getErrorMessage: () => {
    return `
Google Maps API key is not configured or is invalid.

To fix this error:
1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Maps JavaScript API" and "Geocoding API"
4. Create an API key with restrictions for your domain
5. Create a .env file in the client directory with:
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
6. Restart the development server

Note: The app will work without Google Maps - you'll see a fallback interface.
    `
  }
}

export default GOOGLE_MAPS_CONFIG
