import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MEDIA, Button } from './Framework'
import ThemeContext from '../contexts/ThemeContext'
import Tippy from './Tippy'
import THEMES from '../themes'

const UnansweredQuestionsAlertStyled = styled.div`
  position: relative;
  padding: 20px;
  background: ${props => THEMES[props.theme].background};
  border: 1px solid ${props => THEMES[props.theme].borderColor};
  border-radius: 4px;
  margin-top: 10px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    border-bottom: 20px solid;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
  }

  &::before {
    border-bottom-color: ${props => THEMES[props.theme].borderColor};
    top: -20px;
  }

  &::after {
    border-bottom-color: ${props => THEMES[props.theme].background};
    top: -19px;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;

  ${MEDIA.md} {
    flex-direction: row;
  }
`

const ButtonsItem = styled.div`
  flex: 1;
  margin: 10px 0;
`

const Text = styled.div`
  margin-bottom: 10px;
`

function UnansweredQuestionsAlert({
  turnOnHighlight,
  questionsRemaining,
  dispatch
}) {
  const [theme] = useContext(ThemeContext)
  const [isTooltipVisible, setIsTooltipVisible] = useState(true)
  const [trigger, setTrigger] = useState('manual')
  const isInitialTimeoutPending = useRef(false)

  useEffect(() => {
    if (
      turnOnHighlight &&
      isTooltipVisible &&
      !isInitialTimeoutPending.current
    ) {
      setTimeout(() => {
        setIsTooltipVisible(false)
        setTrigger('mouseenter focus')
      }, 5000)
      isInitialTimeoutPending.current = true
    }
  })

  const tooltipContent =
    'Questions highlighted! Scroll up to answer the ones you missed.'

  return (
    <UnansweredQuestionsAlertStyled theme={theme}>
      <Text>
        You still have <strong>{questionsRemaining}</strong> questions left
        unanswered. Would you like to:
      </Text>
      <Buttons>
        <ButtonsItem>
          <Tippy
            a11y={false}
            content={tooltipContent}
            trigger={trigger}
            isVisible={turnOnHighlight && isTooltipVisible}
            theme="blue"
            distance={20}
            animateFill={false}
            inertia={true}
            hideOnClick={false}
            duration={[800, 400]}
          >
            <span>
              <Button
                aria-label={turnOnHighlight ? tooltipContent : undefined}
                onClick={() => dispatch({ type: 'TURN_ON_HIGHLIGHT' })}
                disabled={turnOnHighlight}
              >
                Highlight all unanswered questions
              </Button>
            </span>
          </Tippy>
        </ButtonsItem>
        <div>OR</div>
        <ButtonsItem>
          <Button onClick={() => dispatch({ type: 'MARK_UNANSWERED_NEUTRAL' })}>
            Mark unanswered questions neutral
          </Button>
        </ButtonsItem>
      </Buttons>
    </UnansweredQuestionsAlertStyled>
  )
}

export default UnansweredQuestionsAlert
