import React, { memo, useContext } from 'react'
import styled, { withTheme } from 'styled-components'
import AgreementButton, { COLORS, TITLES } from './AgreementButton'
import { MEDIA } from './Framework'
import Tippy, { TippyDelayGroup } from './Tippy'
import UserInputContext from '../contexts/UserInputContext'

// The buttons go from large (strongly disagree) to small (neutral) then large
// again (strongly agree) -- Size in pixels.
const BUTTON_SIZES = [60, 50, 44, 38]
const buttonSizes = BUTTON_SIZES.concat(BUTTON_SIZES.slice(0, 3).reverse())

const stronglyDisagreeColor = COLORS[0]
const stronglyAgreeColor = COLORS[COLORS.length - 1]

const AgreementScaleStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-left: -10px;
  margin-right: -10px;
`

const Title = styled.div`
  position: absolute;
  color: ${props => props.$color};
  font-weight: bold;
  font-size: 14px;
  left: ${props => (props.$left ? 0 : undefined)};
  right: ${props => (props.$right ? 0 : undefined)};
  top: -25px;
  width: 60px;
  text-align: right;
  margin: 0 5px;

  ${MEDIA.sm} {
    position: static;
    text-align: left;
  }
`

// NOTE: I noticed that the tooltips became buggy if the page was loaded then
// switched to touch view in DevTools, but not if touch view was on during page
// load. This is because Tippy's code sets a `supportsTouch` variable which is
// simply `'ontouchstart' in window`, which is only `true` if the device is
// touch-capable. This causes internal code within Tippy to fail (stops)
// `touchHold` from working. Therefore, real users won't ever see buggy
// tooltips, only if DevTools switches to touch mode after page load. Maybe
// `supportsTouch` should not be considered for `touchHold` to prevent that?

function AgreementScale({
  questionIndex,
  agreementIndex,
  isStatic,
  displayTitles,
  dispatch,
  theme,
}) {
  const userInput = useContext(UserInputContext)

  return (
    <AgreementScaleStyled>
      {displayTitles && (
        <Title $color={stronglyDisagreeColor} $left>
          Disagree
        </Title>
      )}
      <TippyDelayGroup
        delay={userInput !== 'mouse' ? [300, 0] : [1000, 200]}
        duration={0}
      >
        {props =>
          buttonSizes.map((size, index) => (
            <Tippy
              key={index}
              placement={userInput === 'touch' ? 'top' : 'bottom'}
              content={TITLES[index]}
              a11y={false}
              isEnabled={!isStatic}
              touchHold={true}
              theme="agreement-button"
              {...props}
            >
              <AgreementButton
                $size={size}
                index={index}
                questionIndex={questionIndex}
                isActive={agreementIndex === index}
                disabled={isStatic}
                dispatch={dispatch}
              />
            </Tippy>
          ))
        }
      </TippyDelayGroup>
      {displayTitles && (
        <Title $color={stronglyAgreeColor} $right>
          Agree
        </Title>
      )}
    </AgreementScaleStyled>
  )
}

AgreementScale.defaultProps = {
  displayTitles: false,
}

export default memo(withTheme(AgreementScale))
