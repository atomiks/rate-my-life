import React, { memo } from 'react'
import styled from 'styled-components'
import AgreementScale from './AgreementScale'
import { MEDIA } from './Framework'

const QuestionStyled = styled.div`
  position: relative;
  padding: 25px 15px 45px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.background};
  transition-property: background-color, border;
  transition-duration: 0.2s;
  margin-bottom: -1px;

  &:last-child {
    margin-bottom: 15px;
  }

  &::before {
    content: 'Unanswered';
    position: absolute;
    display: ${props => (props.isHighlighted ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    background: #ff1964;
    color: white;
    font-size: 12px;
    padding: 0 5px;
    text-transform: uppercase;
    top: 0;
    left: 0;
    font-weight: bold;
  }

  ${MEDIA.md} {
    padding: 30px 15px;

    &:first-child {
      border-radius: 10px 10px 0 0;
    }

    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
`

const Title = styled.h2`
  margin-top: 0;
  text-align: center;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 500;

  ${MEDIA.md} {
    margin-bottom: 20px;
  }
`

function Question({ index, agreementIndex, title, isHighlighted, dispatch }) {
  return (
    <QuestionStyled
      isHighlighted={isHighlighted}
      aria-label={isHighlighted ? 'Unanswered' : undefined}
    >
      <Title>{title}</Title>
      <AgreementScale
        questionIndex={index}
        agreementIndex={agreementIndex}
        dispatch={dispatch}
      />
    </QuestionStyled>
  )
}

export default memo(Question)
