class GoogleAuthService {
  constructor() {
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '635959778305-2voe764joqc4l10n0l3chjnfkbgg0bup.apps.googleusercontent.com'
    this.isInitialized = false
    console.log('UrbanMove Google Auth Client ID:', this.clientId)
    console.log('UrbanMove Current Origin:', window.location.origin)
  }

  initGoogleAuth(customCallback) {
    return new Promise((resolve, reject) => {
      if (!this.clientId || this.clientId.includes('your_google_client_id')) {
        console.warn('Google Client ID not configured properly in .env')
        reject(new Error('Google Client ID not configured'))
        return
      }

      if (this.isInitialized && !customCallback) {
        resolve()
        return
      }

      const callback = customCallback || this.handleCredentialResponse.bind(this)

      if (window.google && window.google.accounts) {
        try {
          window.google.accounts.id.initialize({
            client_id: this.clientId,
            callback: callback,
            auto_select: false,
            cancel_on_tap_outside: false,
          })
          this.isInitialized = true
          resolve()
        } catch (error) {
          console.error('Error initializing Google accounts:', error)
          reject(error)
        }
      } else {
        // Wait for Google script to load
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.accounts) {
            clearInterval(checkGoogle)
            try {
              window.google.accounts.id.initialize({
                client_id: this.clientId,
                callback: callback,
                auto_select: false,
                cancel_on_tap_outside: false,
              })
              this.isInitialized = true
              resolve()
            } catch (error) {
              console.error('Error initializing Google accounts after script load:', error)
              reject(error)
            }
          }
        }, 10)

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkGoogle)
          if (!this.isInitialized) {
            reject(new Error('Google Auth script failed to load or initialize'))
          }
        }, 10000)
      }
    })
  }

  async signIn() {
    try {
      await this.initGoogleAuth()
      
      return new Promise((resolve, reject) => {
        // Store resolve/reject for callback
        this.signInResolve = resolve
        this.signInReject = reject

        // Show the Google Sign-In prompt (One Tap)
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            const reason = notification.getNotDisplayedReason()
            console.log('One Tap is not displayed:', reason)
            
            // If the reason is 'origin_not_allowed', it's a configuration issue
            if (reason === 'origin_not_allowed') {
              reject(new Error('Access Blocked: This origin (http://localhost:3000) is not registered in Google Cloud Console.'))
            } else {
              reject(new Error(`Google account selection not available: ${reason}`))
            }
          } else if (notification.isSkippedMoment()) {
            console.log('One Tap skipped:', notification.getSkippedReason())
            reject(new Error('Sign-in skipped.'))
          } else if (notification.isDismissedMoment()) {
            console.log('One Tap dismissed:', notification.getDismissedReason())
            reject(new Error('Sign-in dismissed.'))
          }
        })
      })
    } catch (error) {
      console.error('Google Sign-In error:', error)
      throw error
    }
  }

  renderButton(elementId, options = {}) {
    try {
      if (!this.isInitialized) {
        console.warn('Google Auth not initialized. Call initGoogleAuth first.')
        return
      }
      
      const element = document.getElementById(elementId)
      if (!element) {
        console.warn(`Element with ID ${elementId} not found`)
        return
      }

      window.google.accounts.id.renderButton(
        element,
        {
          theme: options.theme || 'outline',
          size: options.size || 'large',
          text: options.text || 'continue_with',
          shape: options.shape || 'rectangular',
          width: options.width || '100%',
          logo_alignment: options.logo_alignment || 'left',
        }
      )
    } catch (error) {
      console.error('Google renderButton error:', error)
    }
  }

  async handleCredentialResponse(response) {
    try {
      // Decode the JWT token
      const payload = this.decodeJwtToken(response.credential)
      
      const userData = {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        firstName: payload.given_name,
        lastName: payload.family_name,
        profilePicture: payload.picture,
        emailVerified: payload.email_verified,
      }

      if (this.signInResolve) {
        this.signInResolve(userData)
      }
    } catch (error) {
      console.error('Error handling Google credential response:', error)
      if (this.signInReject) {
        this.signInReject(error)
      }
    }
  }

  decodeJwtToken(token) {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error decoding JWT token:', error)
      throw error
    }
  }

  // For development/demo purposes - mock Google auth
  async mockSignIn() {
    console.log('Using Mock Google Sign-In')
    // No delay for "fast" experience
    return {
      googleId: '123456789',
      email: 'demo.user@gmail.com',
      name: 'Demo User',
      firstName: 'Demo',
      lastName: 'User',
      profilePicture: 'https://picsum.photos/seed/demo/100/100.jpg',
      emailVerified: true,
    }
  }
}

export default new GoogleAuthService()
