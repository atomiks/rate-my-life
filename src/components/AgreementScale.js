import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import AgreementButton, { COLORS, TITLES } from './AgreementButton'
import { MEDIA } from './Framework'
import Tippy, { TippyDelayGroup } from './Tippy'
import ThemeContext from '../contexts/ThemeContext'
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

function AgreementScale({
  questionIndex,
  agreementIndex,
  isStatic,
  displayTitles,
  dispatch
}) {
  const [theme] = useContext(ThemeContext)
  const userInput = useContext(UserInputContext)

  return (
    <AgreementScaleStyled>
      {displayTitles && (
        <Title $color={stronglyDisagreeColor} $left>
          Disagree
        </Title>
      )}
      <TippyDelayGroup
        delay={userInput !== 'mouse' ? 0 : [1000, 200]}
        duration={0}
      >
        {props =>
          buttonSizes.map((size, index) => (
            <Tippy
              key={index}
              placement="bottom"
              content={TITLES[index]}
              a11y={false}
              isEnabled={!isStatic}
              theme={theme === 'light' ? 'google' : 'translucent'}
              {...props}
              onShow={tip => {
                // iOS prevents the button being clicked because the tooltip
                // shows up.
                if (/iPhone|iPad|iPod/.test(navigator.platform)) {
                  tip.reference.click()
                }
                props.onShow(tip)
              }}
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
  displayTitles: false
}

export default memo(AgreementScale)
