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
  const instances = useRef([])

  const onCreate = useCallback(instance => {
    instance._originalDuration = instance.props.duration
    instances.current.push(instance)
  }, [])

  const onShow = useCallback(() => {
    instances.current.forEach(i => {
      i.set({ duration })
      i.hide()
    })
    clearTimeout(onHideTimeout.current)
    setIsAnyTippyOpen(true)
  })

  const onShown = useCallback(instance => {
    instance.set({ duration: instance._originalDuration })
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
    onCreate,
    onShow,
    onShown,
    onHide,
    delay: isAnyTippyOpen
      ? [0, Array.isArray(delay) ? delay[1] : delay]
      : delay,
    duration: isAnyTippyOpen ? duration : [],
    ...rest
  })
}

TippyDelayGroup.defaultProps = {
  timeout: 400,
  duration: 0
}

export default Tippy
