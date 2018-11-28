import { useState, useRef, useCallback, useContext } from 'react'
import Tippy from '@tippy.js/react'
import UserInputContext from '../contexts/UserInputContext'

Tippy.defaultProps = {
  performance: true,
  theme: 'google',
  livePlacement: false
}

export function TippyDelayGroup({
  children,
  timeout,
  delay,
  duration,
  ...rest
}) {
  const userInput = useContext(UserInputContext)
  const [isAnyTippyOpen, setIsAnyTippyOpen] = useState(false)
  const onHideTimeout = useRef()

  const onShow = useCallback(() => {
    clearTimeout(onHideTimeout.current)
    setIsAnyTippyOpen(true)
  })

  const onHide = useCallback(() => {
    clearTimeout(onHideTimeout.current)
    if (userInput === 'touch') {
      setIsAnyTippyOpen(false)
    } else {
      onHideTimeout.current = setTimeout(() => {
        setIsAnyTippyOpen(false)
      }, timeout)
    }
  })

  return children({
    onShow,
    onHide,
    delay: isAnyTippyOpen ? 0 : delay,
    duration: isAnyTippyOpen ? duration : [275, 250],
    ...rest
  })
}

TippyDelayGroup.defaultProps = {
  timeout: 400,
  duration: 0
}

export default Tippy
