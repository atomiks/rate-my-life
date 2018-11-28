import React, { useReducer, useEffect, useContext } from 'react'
import styled from 'styled-components'
import UnansweredQuestionsAlert from './UnansweredQuestionsAlert'
import ProgressBar from './ProgressBar'
import QuestionList from './QuestionList'
import ResultsModal from './ResultsModal'
import SubmitButton from './SubmitButton'
import { Container, Center } from './Framework'
import answersReducer from '../reducers/answersReducer'
import ThemeContext from '../contexts/ThemeContext'
import QUESTIONS from '../data/questions'
import { getRatingColor } from '../utils/rating'
import {
  getUnanswered,
  getInitialAnswers,
  calculatePoints,
  calculateRating,
  calculateProgress,
  calculateCategoryRatings
} from '../utils/answers'

const MainStyled = styled.main`
  padding: 25px 0;
`

const TOTAL_QUESTIONS = QUESTIONS.length
const TOTAL_POINTS = 6 * QUESTIONS.length

const initialAnswers = getInitialAnswers(
  JSON.parse(localStorage.getItem('answers')),
  TOTAL_QUESTIONS
)

function Main() {
  const [state, dispatch] = useReducer(answersReducer, {
    answers: initialAnswers,
    turnOnHighlight: false,
    isModalVisible: false,
    isProgressBarVisible: false,
    rating: 0,
    categoryRatings: [],
    link: '',
    color: ''
  })
  const [theme] = useContext(ThemeContext)
  const questionsRemaining = getUnanswered(state.answers).length
  const progress = calculateProgress(questionsRemaining, TOTAL_QUESTIONS)

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(state.answers))
  })

  function onSubmit() {
    const points = calculatePoints(state.answers, QUESTIONS)
    const rating = calculateRating(points, TOTAL_POINTS)
    const categoryRatings = calculateCategoryRatings(state.answers, QUESTIONS)
    const link = 'https://atomiks.github.io/rate-my-life#2812912'
    const color = getRatingColor(rating)

    dispatch({
      type: 'SUBMIT',
      payload: {
        points,
        rating,
        categoryRatings,
        link,
        color
      }
    })
  }

  return (
    <MainStyled>
      <ProgressBar progress={progress} isVisible={state.isProgressBarVisible} />
      <ResultsModal
        link={state.link}
        isVisible={state.isModalVisible}
        rating={state.rating}
        color={state.color}
        categoryRatings={state.categoryRatings}
        dispatch={dispatch}
      />
      <QuestionList state={state} dispatch={dispatch} />
      <Container>
        <Center>
          {questionsRemaining > 0 && (
            <UnansweredQuestionsAlert
              questionsRemaining={questionsRemaining}
              turnOnHighlight={state.turnOnHighlight}
              dispatch={dispatch}
            />
          )}
          <SubmitButton
            theme={theme}
            disabled={questionsRemaining > 0}
            onClick={onSubmit}
          >
            Get Life Rating!
          </SubmitButton>
        </Center>
      </Container>
    </MainStyled>
  )
}

export default Main
