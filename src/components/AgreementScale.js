import React, { memo, useContext } from 'react'
import styled, { withTheme } from 'styled-components'
import AgreementButton, { TITLES } from './AgreementButton'
import { MEDIA } from './Framework'
import Tippy, { TippyDelayGroup } from './Tippy'
import UserInputContext from '../contexts/UserInputContext'

// The buttons go from large (strongly disagree) to small (neutral) then large
// again (strongly agree) -- Size in pixels.
const BUTTON_SIZES = [50, 44, 38, 32]
const buttonSizes = BUTTON_SIZES.concat(BUTTON_SIZES.slice(0, 3).reverse())

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
  top: 50px;
  width: ${props => (props.$left ? '20%' : '15%')};
  text-align: ${props => (props.$left ? 'right' : 'left')};
  margin: 0 5px;
  text-transform: uppercase;
  opacity: ${props => props.theme.$type === 'dark' && 0.95};

  ${MEDIA.md} {
    position: static;
    text-align: left;
    width: 75px;
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
  dispatch,
  theme,
}) {
  const userInput = useContext(UserInputContext)

  return (
    <AgreementScaleStyled>
      <Title $color={theme.scale[0]} $left>
        Disagree
      </Title>
      <TippyDelayGroup
        delay={userInput !== 'mouse' ? [300, 0] : [1000, 500]}
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
      <Title $color={theme.scale[theme.scale.length - 1]} $right>
        Agree
      </Title>
    </AgreementScaleStyled>
  )
}

AgreementScale.defaultProps = {
  displayTitles: false,
}

export default memo(withTheme(AgreementScale))
