import React, { useContext } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { transparentize } from 'polished'
import { MEDIA, CSS_EASING } from './Framework'
import ThemeContext from '../contexts/ThemeContext'
import { Howl } from 'howler'
import pop1 from '../assets/pop1.wav'
import pop2 from '../assets/pop2.wav'
import pop3 from '../assets/pop3.wav'

// Using `new Audio()` (HTML5 Audio) is terrible in Safari: there is a delay of
// 100-300ms after clicking, the sounds are distorted, and the TouchBar shows
// a player. `Howl` uses the Web Audio API which suffers none of these problems.
// Downside: it's 9 kB minzipped
const lowPop = new Howl({ src: pop2 })
const midPop = new Howl({ src: pop3 })
const highPop = new Howl({ src: pop1 })
const popSounds = [lowPop, lowPop, lowPop, midPop, highPop, highPop, highPop]

export const COLORS = [
  '#ff4660',
  '#f8448c',
  '#f170a4',
  '#828fa5',
  '#88dbb3',
  '#5bd69a',
  '#00d1b4'
]

export const TITLES = [
  'Strongly disagree',
  'Disagree',
  'Slightly disagree',
  'Neutral',
  'Slightly agree',
  'Agree',
  'Strongly agree'
]

const feedbackAnimation = keyframes`
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0;
    transform: scale(2.2);
  }
`

const baseSize = size => Math.round(size / 1.4)
const xsSize = size => Math.round(size / 1.2)
const _450pxSize = size => Math.round(size / 1.1)

const AgreementButtonStyled = styled.button`
  position: relative;
  border: none;
  padding: 0;
  border-radius: 50%;
  width: ${props => baseSize(props.$size)}px;
  height: ${props => baseSize(props.$size)}px;
  border: 3px solid ${props => COLORS[props.index]};
  margin: 0 4px;
  background: ${props =>
    props.isActive ? COLORS[props.index] : 'transparent'};
  transition: background-color 0.3s, transform 0.5s ${CSS_EASING.spring};
  z-index: initial;
  outline: 0;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : undefined)};
  transform: scale(1);
  user-select: none;
  -webkit-touch-callout: none;

  ${MEDIA.xs} {
    width: ${props => xsSize(props.$size)}px;
    height: ${props => xsSize(props.$size)}px;
  }

  @media (min-width: 450px) {
    margin: 0 6px;
    width: ${props => _450pxSize(props.$size)}px;
    height: ${props => _450pxSize(props.$size)}px;
  }

  &.focus-visible {
    box-shadow: ${props =>
      `0 0 0 5px ${transparentize(0.5, COLORS[props.index])}`};
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: ${props => baseSize(props.$size)}px;
    height: ${props => baseSize(props.$size)}px;
    background: ${props => COLORS[props.index]};
    border-radius: 50%;
    left: -3px;
    top: -3px;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    animation: ${props =>
      props.isActive &&
      css`
        ${feedbackAnimation} 1.2s cubic-bezier(.23,1,.32,1) forwards;
      `};

    ${MEDIA.xs} {
      width: ${props => xsSize(props.$size)}px;
      height: ${props => xsSize(props.$size)}px;
    }

    @media (min-width: 450px) {
      width: ${props => _450pxSize(props.$size)}px;
      height: ${props => _450pxSize(props.$size)}px;
    }
  }

  &:hover {
    background-color: ${props => COLORS[props.index]};
    transition: background-color 0.12s, transform 0.5s ${CSS_EASING.spring};
    transform: scale(1.06);
  }

  &:active {
    transform: scale(0.94);
    transition: background-color 0.3s transform 0.5s ${CSS_EASING.spring};
  }
`

function AgreementButton({
  questionIndex,
  index,
  dispatch,
  isActive,
  ...rest
}) {
  const [theme] = useContext(ThemeContext)

  function onClick() {
    if (!isActive) {
      popSounds[index].play()
    }

    dispatch({
      type: 'ON_ANSWERED',
      payload: {
        questionIndex,
        agreementIndex: index
      }
    })
  }

  return (
    <AgreementButtonStyled
      index={index}
      theme={theme}
      onClick={onClick}
      isActive={isActive}
      aria-label={TITLES[index]}
      aria-selected={isActive}
      onContextMenu={e => e.preventDefault()}
      {...rest}
    />
  )
}

export default AgreementButton
