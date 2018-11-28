import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

const ProgressContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.4s;
  pointer-events: none;
`

const ProgressBarStyled = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
`

const ProgressValue = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #4d80ff;
  width: ${props => 100 * props.$progress}%;
  transition: width 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: ${props => (props.$progress === 1 ? 0 : '0 20px 20px 0')};

  &::after {
    content: '';
    position: absolute;
    right: 2px;
    display: block;
    width: 50px;
    height: 100%;
    box-shadow: 0 2px 30px 0 ${transparentize(0.3, '#4d80ff')};
    transform: scaleX(1.5);
    transform-origin: right;
    z-index: -1;
  }
`

function ProgressBar({ progress, isVisible }) {
  return (
    <ProgressContainer isVisible={isVisible}>
      <ProgressBarStyled>
        <ProgressValue $progress={progress} />
      </ProgressBarStyled>
    </ProgressContainer>
  )
}

export default ProgressBar
