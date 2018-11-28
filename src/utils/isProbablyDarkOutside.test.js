import isProbablyDarkOutside from './isProbablyDarkOutside'

describe('isProbablyDarkOutside', () => {
  it('returns true if earlier than 6 AM', () => {
    expect(isProbablyDarkOutside(2)).toBe(true)
    expect(isProbablyDarkOutside(5)).toBe(true)
    expect(isProbablyDarkOutside(5.999)).toBe(true)
  })

  it('returns true if later than 6 PM', () => {
    expect(isProbablyDarkOutside(18.001)).toBe(true)
    expect(isProbablyDarkOutside(19)).toBe(true)
    expect(isProbablyDarkOutside(23.54)).toBe(true)
  })

  it('returns false in between 6 AM and 6 PM', () => {
    expect(isProbablyDarkOutside(6)).toBe(false)
    expect(isProbablyDarkOutside(10)).toBe(false)
    expect(isProbablyDarkOutside(12)).toBe(false)
  })
})
