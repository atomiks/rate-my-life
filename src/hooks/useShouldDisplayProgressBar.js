import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

function useShouldDisplayProgressBar(questionListNode) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const onScroll = throttle(() => {
      if (questionListNode.current) {
        const { top } = questionListNode.current.getBoundingClientRect()
        const currentValue = top < 0
        if (value !== currentValue) {
          setValue(currentValue)
        }
      }
    }, 100)

    const options = { passive: true }

    window.addEventListener('scroll', onScroll, options)

    return () => {
      window.removeEventListener('scroll', onScroll, options)
    }
  })

  return value
}

export default useShouldDisplayProgressBar
