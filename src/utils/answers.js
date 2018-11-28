export function isUnanswered(answer) {
  return typeof answer !== 'number' || answer === undefined
}

export function getUnanswered(answers) {
  return answers.filter(isUnanswered)
}

export function calculatePoints(answers, questionData, maxIndex = 6) {
  return answers.reduce((acc, answer, index) => {
    const points = questionData[index].isPositive ? answer : maxIndex - answer
    return acc + points
  }, 0)
}

export function calculateRating(points, totalPoints) {
  return Math.round((100 * points) / totalPoints)
}

export function isHighlighted(state, index) {
  return state.turnOnHighlight && isUnanswered(state.answers[index])
}

export function calculateProgress(questionsRemaining, totalQuestions) {
  return (totalQuestions - questionsRemaining) / totalQuestions
}

export function getInitialAnswers(answersFromStorage, totalQuestions) {
  return answersFromStorage || [...Array(totalQuestions)]
}

export function calculateCategoryRatings(answers, questionData, maxIndex = 6) {
  return answers.reduce((acc, answer, index) => {
    const { category, isPositive } = questionData[index]
    const categories = Array.isArray(category) ? category : [category]
    categories.forEach(category => {
      if (!acc[category]) {
        acc[category] = { total: 0, points: 0, rating: null }
      }
      const obj = acc[category]
      obj.total += maxIndex
      obj.points += isPositive ? answer : maxIndex - answer
      obj.rating = calculateRating(obj.points, obj.total)
    })
    return acc
  }, {})
}
