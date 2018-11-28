/**
 * Invokes the provided callback whenever the input type (mouse or touch)
 * changes by providing an argument that determines if the user is currently
 * using touch. Dynamically detects switching between mouse and touch use
 * (i.e. hybrid laptops).
 */
function onUserInputChange(callback) {
  let userInput = 'mouse'
  let lastMouseMoveTime = 0
  const options = { passive: true }

  function onMouseMove() {
    const now = window.performance ? performance.now() : Date.now()

    // If the difference between two consecutive `mousemove` events was less
    // than 20ms, they are using a mouse again. This is because moving a mouse
    // fires the event rapidly even when moving it slowly. On touch devices,
    // `mousemove` also fires when tapping somewhere but it is extremely
    // rare/impossible for two of them to be less than 20ms apart. Even if it
    // happens, the next `touchstart` will set the state correctly anyway.
    if (now - lastMouseMoveTime < 20) {
      callback((userInput = 'mouse'))
      document.removeEventListener('mousemove', onMouseMove, options)
    }

    lastMouseMoveTime = now
  }

  function onTouchStart() {
    if (userInput === 'touch') {
      return
    }

    callback((userInput = 'touch'))
    document.addEventListener('mousemove', onMouseMove, options)
  }

  function onKeyDown() {
    if (userInput === 'keyboard') {
      return
    }

    callback((userInput = 'keyboard'))
    document.addEventListener('mousemove', onMouseMove, options)
  }

  document.addEventListener('touchstart', onTouchStart, options)
  document.addEventListener('keydown', onKeyDown, options)

  return () => {
    document.removeEventListener('touchstart', onTouchStart, options)
    document.removeEventListener('keydown', onKeyDown, options)
  }
}

export default onUserInputChange
