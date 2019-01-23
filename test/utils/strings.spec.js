import { capitalize, substitute } from '../../src/utils/strings'

describe('string.js[capitalize]', () => {
  it('should capitalize', () => {
    const words = ['hello', 'word', 'shineout']
    words.forEach((word) => {
      expect(capitalize(word).charCodeAt(0)).toBe(word.charCodeAt(0) - 32)
    })
  })
  it('should throw error if not a string', () => {
    expect(() => capitalize(new Date())).toThrow()
  })
  it('should not change if a capitalize string', () => {
    const words = ['Hello', 'World', 'Shine']
    words.forEach((word) => {
      expect(capitalize(word)).toBe(word)
    })
  })
  it('should not change with a start of number/character', () => {
    const words = ['1Hello', '&World', '#Shine']
    words.forEach((word) => {
      expect(capitalize(word)).toBe(word)
    })
  })
  it('should not change if a empty string', () => {
    expect(capitalize('')).toBe('')
  })
})

describe('strings.js[substitute]', () => {
  test('should substitute a normal string', () => {
    // {a}bc {a: 1}
    expect(substitute('{a}bc{a}{b}', { a: 1, b: 2 })).toBe('1bc12')
  })
  test('should ignore the value did not in obj ', () => {
    expect(substitute('{a}bc', {})).toBe('bc')
    expect(substitute('{a}{b}bc', { c: 1 })).toBe('bc')
  })
  test('should not parse the special char', () => {
    expect(substitute('{{a}bc', { a: 1 })).toBe('{1bc')
    expect(substitute('{{{a}}{bc{a}{', { a: 1 })).toBe('{{1}{bc1{')
  })
  test('should return str if not match rule', () => {
    expect(substitute('abc')).toBe('abc')
  })
  test('should exec if str is func', () => {
    expect(substitute(v => ({ a: v }), 1)).toEqual({ a: 1 })
  })
})
