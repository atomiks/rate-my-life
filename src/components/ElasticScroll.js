import React, { Children, cloneElement, useRef, useEffect } from 'react'
import elasticScroll from 'elastic-scroll-polyfill'

function ElasticScroll({ children, ...rest }) {
  const scroller = useRef()
  const instance = useRef()

  useEffect(() => {
    instance.current = elasticScroll({
      targets: scroller.current,
      ...rest
    })

    return () => {
      instance.current.disable()
      instance.current = null
    }
  }, [])

  return Children.map(children, child =>
    cloneElement(child, {
      children: <div data-elastic-wrapper>{child.props.children}</div>,
      ref: node => {
        scroller.current = node
        const { ref } = child
        if (ref) {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref.hasOwnProperty('current')) {
            ref.current = node
          }
        }
      }
    })
  )
}

export default ElasticScroll
