import { getRatingColor } from './rating'

describe('getRatingColor', () => {
  it('returns correct hsl() value', () => {
    expect(getRatingColor(10)).toBe('hsl(290, 100%, 70%)')
    expect(getRatingColor(90)).toBe('hsl(170, 100%, 42%)')
  })
})
