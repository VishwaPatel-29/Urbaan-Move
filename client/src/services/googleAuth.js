class GoogleAuthService {
  constructor() {
    this.clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
    this.isInitialized = false
  }

  initGoogleAuth() {
    return new Promise((resolve, reject) => {
      if (this.isInitialized) {
        resolve()
        return
      }

      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: false,
        })
        this.isInitialized = true
        resolve()
      } else {
        // Wait for Google script to load
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.accounts) {
            clearInterval(checkGoogle)
            window.google.accounts.id.initialize({
              client_id: this.clientId,
              callback: this.handleCredentialResponse.bind(this),
              auto_select: false,
              cancel_on_tap_outside: false,
            })
            this.isInitialized = true
            resolve()
          }
        }, 100)

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkGoogle)
          reject(new Error('Google Auth script failed to load'))
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

        // Show the Google Sign-In popup
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to popup if prompt doesn't work
            this.signInWithPopup()
          }
        })
      })
    } catch (error) {
      console.error('Google Sign-In error:', error)
      throw error
    }
  }

  signInWithPopup() {
    try {
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'filled_blue',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
        }
      )
    } catch (error) {
      console.error('Google popup error:', error)
      if (this.signInReject) {
        this.signInReject(error)
      }
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
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
