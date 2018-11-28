import { isUnanswered } from '../utils/answers'

const NEUTRAL_ANSWER = 3

function answersReducer(state, { type, payload }) {
  switch (type) {
    case 'MARK_UNANSWERED_NEUTRAL': {
      return {
        ...state,
        answers: state.answers.map(answer =>
          isUnanswered(answer) ? NEUTRAL_ANSWER : answer
        )
      }
    }
    case 'ON_ANSWERED': {
      return {
        ...state,
        answers: state.answers.map((currentAnswer, index) => {
          return payload.questionIndex === index
            ? payload.agreementIndex
            : currentAnswer
        })
      }
    }
    case 'PROGRESS_BAR': {
      return { ...state, isProgressBarVisible: payload }
    }
    case 'TURN_ON_HIGHLIGHT': {
      return { ...state, turnOnHighlight: true }
    }
    case 'SUBMIT': {
      return {
        ...state,
        ...payload,
        isModalVisible: true
      }
    }
    case 'CLOSE_MODAL': {
      return { ...state, isModalVisible: false }
    }
    default: {
      return state
    }
  }
}

export default answersReducer
