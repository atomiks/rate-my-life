import 'focus-visible'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/themes/google.css'
import 'tippy.js/dist/themes/translucent.css'
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, TippyThemes } from './components/Framework'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import ThemeContext from './contexts/ThemeContext'
import UserInputContext from './contexts/UserInputContext'
import isProbablyDarkOutside from './utils/isProbablyDarkOutside'
import useUserInput from './hooks/useUserInput'
import THEMES from './themes'

const initialTheme =
  THEMES[
    localStorage.getItem('theme') ||
      (isProbablyDarkOutside(new Date().getHours()) ? 'dark' : 'light')
  ]

function App() {
  const [theme, setTheme] = useState(initialTheme)
  const userInput = useUserInput()

  function toggleTheme() {
    setTheme(theme => (theme === THEMES.light ? THEMES.dark : THEMES.light))
  }

  useEffect(() => {
    localStorage.setItem('theme', theme === THEMES.light ? 'light' : 'dark')
  })

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <TippyThemes />
        <UserInputContext.Provider value={userInput}>
          <ThemeContext.Provider value={[theme, toggleTheme]}>
            <Header />
            <Main />
            <Footer />
          </ThemeContext.Provider>
        </UserInputContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
