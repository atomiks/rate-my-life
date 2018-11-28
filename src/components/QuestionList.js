import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import QUESTIONS from '../data/questions'
import { Container } from './Framework'
import Question from './Question'
import { isHighlighted } from '../utils/answers'
import useShouldDisplayProgressBar from '../hooks/useShouldDisplayProgressBar'

const QuestionListStyled = styled.div``

function QuestionList({ state, dispatch }) {
  const QuestionListNode = useRef()
  const isProgressBarVisible = useShouldDisplayProgressBar(QuestionListNode)

  useEffect(() => {
    if (isProgressBarVisible !== state.isProgressBarVisible) {
      dispatch({
        type: 'PROGRESS_BAR',
        payload: isProgressBarVisible
      })
    }
  })

  return (
    <QuestionListStyled ref={QuestionListNode}>
      <Container mobilePadding={0} style={{ overflow: 'hidden' }}>
        {QUESTIONS.map((question, index) => (
          <Question
            key={index}
            index={index}
            agreementIndex={state.answers[index]}
            isHighlighted={isHighlighted(state, index)}
            dispatch={dispatch}
            {...question}
          />
        ))}
      </Container>
    </QuestionListStyled>
  )
}

export default QuestionList
