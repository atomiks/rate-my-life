import 'focus-visible'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/themes/google.css'
import 'tippy.js/dist/themes/translucent.css'
import React, { useState, useEffect } from 'react'
import { GlobalStyle, TippyThemes } from './components/Framework'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import ThemeContext from './contexts/ThemeContext'
import UserInputContext from './contexts/UserInputContext'
import isProbablyDarkOutside from './utils/isProbablyDarkOutside'
import useUserInput from './hooks/useUserInput'

const initialTheme =
  localStorage.getItem('theme') ||
  (isProbablyDarkOutside(new Date().getHours()) ? 'dark' : 'light')

function App() {
  const [theme, setTheme] = useState(initialTheme)
  const userInput = useUserInput()

  function toggleTheme() {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
  })

  return (
    <div>
      <GlobalStyle theme={theme} />
      <TippyThemes theme={theme} />
      <UserInputContext.Provider value={userInput}>
        <ThemeContext.Provider value={[theme, toggleTheme]}>
          <Header />
          <Main />
          <Footer />
        </ThemeContext.Provider>
      </UserInputContext.Provider>
    </div>
  )
}

export default App
