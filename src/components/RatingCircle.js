import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import Circle from 'react-circle'

const RatingCircleWrapper = styled.div`
  max-width: 150px;
  margin: 0 auto;
`

function RatingCircle({ rating, size, color, children, theme }) {
  const [progress, setProgress] = useState(0)

  // We want to transition from `0` to the actual rating on mount.
  useEffect(
    () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (rating !== progress) {
            setProgress(rating)
          }
        })
      })
    },
    [rating],
  )

  return (
    <RatingCircleWrapper
      tabIndex="0"
      aria-label={`Your overall life rating is ${rating} out of 100`}
    >
      <Circle
        size={size}
        progress={progress}
        animationDuration="3.5s"
        lineWidth={10}
        bgColor={theme.backgroundDark}
        progressColor={color}
        textColor={color}
        roundedStroke={true}
        showPercentageSymbol={false}
        textStyle={{
          fontSize: '100px',
          transform: 'translateY(10px)',
        }}
      />
      {children}
    </RatingCircleWrapper>
  )
}

export default withTheme(RatingCircle)
