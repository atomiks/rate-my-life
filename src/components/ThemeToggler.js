import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Center } from './Framework'
import ThemeContext from '../contexts/ThemeContext'
import { Moon } from 'react-feather'
import Tippy from './Tippy'
import isProbablyDarkOutside from '../utils/isProbablyDarkOutside'

const Toggler = styled(Button)`
  position: relative;
  overflow: hidden;
`

const MoonStyles = theme => ({
  width: '20px',
  height: '20px',
  verticalAlign: '-5px',
  marginRight: '5px',
  fill: theme === 'dark' ? '#e9d579' : 'transparent',
  stroke: theme === 'dark' ? '#e9d579' : 'currentColor',
  transitionProperty: 'fill, stroke',
  transitionDuration: '0.2s'
})

function ThemeToggler({ onClick }) {
  const [theme, toggleTheme] = useContext(ThemeContext)
  const [isTooltipVisible, setIsTooltipVisible] = useState(
    isProbablyDarkOutside(new Date().getHours()) &&
      theme === 'dark' &&
      !localStorage.getItem('themeTooltip')
  )

  useEffect(() => {
    localStorage.setItem('themeTooltip', 'true')
  }, [])

  return (
    <Tippy
      content={
        <div>
          Looks like it's probably dark outside where you live! To soothe your
          eyes, Dark Mode has been enabled. Feel free to change it using this
          little button!
          <Center style={{ marginTop: 10 }}>
            <Button onClick={() => setIsTooltipVisible(false)}>Dismiss</Button>
          </Center>
        </div>
      }
      isVisible={isTooltipVisible}
      onHide={() => {
        if (isTooltipVisible) {
          setIsTooltipVisible(false)
        }
      }}
      animation="scale"
      duration={[1000, 200]}
      trigger="manual"
      arrow={true}
      interactive={true}
      distance={16}
      theme="blue hint"
    >
      <Toggler onClick={toggleTheme} theme={theme}>
        <Moon style={MoonStyles(theme)} />
        {theme === 'light' ? 'Enable' : 'Disable'} Dark Mode
      </Toggler>
    </Tippy>
  )
}

export default ThemeToggler
