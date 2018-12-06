import QUESTIONS from '../data/questions'
import {
  isUnanswered,
  getUnanswered,
  calculatePoints,
  calculateRating,
  isHighlighted,
  calculateProgress,
  getInitialAnswers,
  calculateCategoryRatings
} from './answers'

describe('isUnanswered', () => {
  it('returns true if undefined', () => {
    expect(isUnanswered(undefined)).toBe(true)
  })

  it('returns true if not a number', () => {
    expect(isUnanswered('')).toBe(true)
    expect(isUnanswered('5')).toBe(true)
    expect(isUnanswered(null)).toBe(true)
  })

  it('returns false if a number', () => {
    expect(isUnanswered(0)).toBe(false)
    expect(isUnanswered(5)).toBe(false)
  })
})

describe('getUnanswered', () => {
  it('returns filtered array', () => {
    const answers = [5, undefined, 2, undefined, '']
    expect(getUnanswered(answers)).toEqual([undefined, undefined, ''])
  })
})

describe('calculatePoints', () => {
  it('correctly sums the total points', () => {
    const totalPoints = QUESTIONS.length
    const answers = [...Array(totalPoints)]
    const maxPointsAnswers = answers.map((_, index) =>
      QUESTIONS[index].isPositive ? 6 : 0
    )
    const minPointsAnswers = answers.map((_, index) =>
      QUESTIONS[index].isPositive ? 0 : 6
    )
    expect(calculatePoints(maxPointsAnswers, QUESTIONS, 6)).toBe(
      totalPoints * 6
    )
    expect(calculatePoints(minPointsAnswers, QUESTIONS, 6)).toBe(0)
  })
})

describe('calculateRating', () => {
  it('returns an integer from 0-100', () => {
    expect(calculateRating(5, 10)).toBe(50)
    expect(calculateRating(0, 10)).toBe(0)
    expect(calculateRating(82, 100)).toBe(82)
  })
})

describe('isHighlighted', () => {
  it('returns true if state.turnOnHighlight === true and question is unanswered', () => {
    expect(isHighlighted({ turnOnHighlight: true, answers: [null] }, 0)).toBe(
      true
    )
  })

  it('returns false if state.turnOnHighlight === true and question is answered', () => {
    expect(isHighlighted({ turnOnHighlight: true, answers: [5] }, 0)).toBe(
      false
    )
  })

  it('returns false if state.turnOnHighlight === false and question is unanswered', () => {
    expect(isHighlighted({ turnOnHighlight: false, answers: [null] }, 0)).toBe(
      false
    )
  })

  it('returns false if state.turnOnHighlight === false and question is answered', () => {
    expect(isHighlighted({ turnOnHighlight: false, answers: [5] }, 0)).toBe(
      false
    )
  })
})

describe('calculateProgress', () => {
  it('does what it should', () => {
    expect(calculateProgress(10, 20)).toBe(0.5)
    expect(calculateProgress(0, 20)).toBe(1)
    expect(calculateProgress(20, 20)).toBe(0)
  })
})

describe('getInitialAnswers', () => {
  it('returns the correct', () => {
    const json = '[null, 5, 2]'
    expect(getInitialAnswers(null, QUESTIONS.length)).toEqual([
      ...Array(QUESTIONS.length)
    ])
    expect(getInitialAnswers(JSON.parse(json), QUESTIONS.length)).toEqual([
      null,
      5,
      2
    ])
  })
})

describe('calculateCategoryRatings', () => {
  it('single item', () => {
    expect(
      calculateCategoryRatings(
        [0],
        [{ category: 'environment', isPostive: false }],
        6
      )
    ).toEqual({
      environment: {
        points: 6,
        rating: 100,
        total: 6
      }
    })
  })

  it('non-array categories', () => {
    expect(
      calculateCategoryRatings(
        [0, 4, 3, 1],
        [
          { category: 'environment', isPositive: false },
          { category: 'finance', isPositive: true },
          { category: 'love', isPositive: false },
          { category: 'environment', isPositive: true }
        ],
        6
      )
    ).toEqual({
      environment: {
        points: 7,
        rating: Math.round((100 * 7) / 12),
        total: 12
      },
      finance: {
        points: 4,
        rating: Math.round((100 * 4) / 6),
        total: 6
      },
      love: {
        points: 3,
        rating: Math.round((100 * 3) / 6),
        total: 6
      }
    })
  })

  it('mixed category ratings', () => {
    expect(
      calculateCategoryRatings(
        [0, 4, 3, 1, 6],
        [
          { category: 'social', isPositive: false },
          { category: 'mind', isPositive: true },
          { category: ['social', 'finance'], isPositive: false },
          { category: 'social', isPositive: true },
          { category: ['appearance', 'social'], isPositive: true }
        ],
        6
      )
    ).toEqual({
      social: {
        points: 16,
        rating: Math.round((100 * 16) / 24),
        total: 24
      },
      mind: {
        points: 4,
        rating: Math.round((100 * 4) / 6),
        total: 6
      },
      finance: {
        points: 3,
        rating: Math.round((100 * 3) / 6),
        total: 6
      },
      appearance: {
        points: 6,
        rating: Math.round((100 * 6) / 6),
        total: 6
      }
    })
  })
})
