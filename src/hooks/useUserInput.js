import { useState, useEffect } from 'react'
import onUserInputChange from '../utils/onUserInputChange'

/**
 * Hook to determine the user's input type.
 * Input types: 'mouse', 'touch', 'keyboard'
 */
function useUserInput() {
  const [userInput, setUserInput] = useState('mouse')

  useEffect(() => onUserInputChange(setUserInput), [])

  return userInput
}

export default useUserInput
