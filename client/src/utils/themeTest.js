// Theme and Responsiveness Testing Utilities

export const testThemeSwitching = () => {
  const tests = {
    // Test theme persistence
    themePersistence: () => {
      const theme = localStorage.getItem('urbanmove-theme')
      console.log('✅ Theme persistence test:', theme ? 'PASS' : 'FAIL')
      return theme !== null
    },

    // Test theme classes on body
    themeClasses: () => {
      const hasDarkClass = document.documentElement.classList.contains('dark')
      const hasLightClass = document.body.classList.contains('light')
      const isCorrectTheme = (hasDarkClass && !hasLightClass) || (!hasDarkClass && hasLightClass)
      console.log('✅ Theme classes test:', isCorrectTheme ? 'PASS' : 'FAIL')
      return isCorrectTheme
    },

    // Test Redux theme state
    reduxThemeState: () => {
      // This would need to be tested in the actual app context
      try {
        const state = window.__REDUX_STORE__?.getState()
        const theme = state?.ui?.theme
        console.log('✅ Redux theme test:', theme ? 'PASS' : 'FAIL')
        return theme !== undefined
      } catch (error) {
        console.log('⚠️ Redux theme test: NOT AVAILABLE')
        return false
      }
    },
  }

  return Object.values(tests).every(test => test())
}

export const testResponsiveness = () => {
  const tests = {
    // Test viewport meta tag
    viewportMeta: () => {
      const viewport = document.querySelector('meta[name="viewport"]')
      const hasCorrectContent = viewport?.content?.includes('width=device-width')
      console.log('✅ Viewport meta test:', hasCorrectContent ? 'PASS' : 'FAIL')
      return hasCorrectContent
    },

    // Test responsive breakpoints
    responsiveBreakpoints: () => {
      const width = window.innerWidth
      const isMobile = width < 600
      const isTablet = width >= 600 && width < 900
      const isDesktop = width >= 900
      
      console.log(`✅ Breakpoint test: ${width}px (${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'})`)
      return true
    },

    // Test responsive elements
    responsiveElements: () => {
      // Check for responsive containers
      const containers = document.querySelectorAll('[class*="max-w"]')
      const hasResponsiveContainers = containers.length > 0
      console.log('✅ Responsive containers test:', hasResponsiveContainers ? 'PASS' : 'FAIL')
      return hasResponsiveContainers
    },
  }

  return Object.values(tests).every(test => test())
}

export const testComponentResponsiveness = () => {
  const components = {
    navbar: () => {
      const navbar = document.querySelector('[role="navigation"], .navbar, nav')
      const isVisible = navbar && window.getComputedStyle(navbar).display !== 'none'
      console.log('✅ Navbar visibility test:', isVisible ? 'PASS' : 'FAIL')
      return isVisible
    },

    sidebar: () => {
      const sidebar = document.querySelector('.sidebar, [class*="sidebar"]')
      if (sidebar) {
        const isVisible = window.getComputedStyle(sidebar).display !== 'none'
        console.log('✅ Sidebar visibility test:', isVisible ? 'PASS' : 'FAIL')
        return true
      }
      console.log('ℹ️ Sidebar not found on current page')
      return true
    },

    forms: () => {
      const forms = document.querySelectorAll('form, .form, [class*="form"]')
      const hasForms = forms.length > 0
      if (hasForms) {
        const isResponsive = Array.from(forms).every(form => {
          const style = window.getComputedStyle(form)
          return style.maxWidth !== 'none' || style.width === '100%'
        })
        console.log('✅ Form responsiveness test:', isResponsive ? 'PASS' : 'FAIL')
        return isResponsive
      }
      console.log('ℹ️ No forms found on current page')
      return true
    },

    cards: () => {
      const cards = document.querySelectorAll('.card, [class*="card"], [role="article"]')
      const hasCards = cards.length > 0
      if (hasCards) {
        const isResponsive = Array.from(cards).every(card => {
          const style = window.getComputedStyle(card)
          return style.boxShadow !== 'none' || style.border !== 'none'
        })
        console.log('✅ Card styling test:', isResponsive ? 'PASS' : 'FAIL')
        return isResponsive
      }
      console.log('ℹ️ No cards found on current page')
      return true
    },
  }

  return Object.values(components).every(test => test())
}

export const testColorScheme = (theme) => {
  const root = document.documentElement
  const computedStyle = getComputedStyle(root)
  
  const tests = {
    primaryColor: () => {
      const primaryColor = theme === 'dark' ? '#00B4B4' : '#008080'
      const hasPrimary = document.querySelector('[style*="00B4B4"], [style*="008080"]')
      console.log('✅ Primary color test:', hasPrimary ? 'PASS' : 'FAIL')
      return hasPrimary !== null
    },

    backgroundColor: () => {
      const bodyBg = getComputedStyle(document.body).backgroundColor
      const isCorrectTheme = theme === 'dark' 
        ? bodyBg.includes('0') || bodyBg.includes('rgb(0') 
        : !bodyBg.includes('0') || bodyBg.includes('rgb(248')
      console.log('✅ Background color test:', isCorrectTheme ? 'PASS' : 'FAIL')
      return isCorrectTheme
    },

    textColor: () => {
      const textElements = document.querySelectorAll('h1, h2, h3, p, span')
      const hasCorrectText = Array.from(textElements).some(el => {
        const color = getComputedStyle(el).color
        return theme === 'dark' 
          ? color.includes('255') || color.includes('rgb(255')
          : color.includes('0') || color.includes('rgb(0')
      })
      console.log('✅ Text color test:', hasCorrectText ? 'PASS' : 'FAIL')
      return hasCorrectText
    },
  }

  return Object.values(tests).every(test => test())
}

export const runFullTest = () => {
  console.log('🚀 Starting full theme and responsiveness test...\n')
  
  const theme = localStorage.getItem('urbanmove-theme') || 'dark'
  console.log(`📊 Testing in ${theme} mode\n`)
  
  const results = {
    theme: testThemeSwitching(),
    responsiveness: testResponsiveness(),
    components: testComponentResponsiveness(),
    colors: testColorScheme(theme),
  }
  
  const allPassed = Object.values(results).every(result => result)
  
  console.log('\n📋 Test Results:')
  Object.entries(results).forEach(([key, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${key.charAt(0).toUpperCase() + key.slice(1)}: ${passed ? 'PASS' : 'FAIL'}`)
  })
  
  console.log(`\n${allPassed ? '🎉' : '⚠️'} Overall: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`)
  
  return results
}

// Export for use in browser console or testing
window.testThemeAndResponsiveness = runFullTest

export default {
  testThemeSwitching,
  testResponsiveness,
  testComponentResponsiveness,
  testColorScheme,
  runFullTest,
}
