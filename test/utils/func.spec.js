import { compose, curry } from '../../src/utils/func'

describe('func.js[compose]', () => {
  test('should compose arguments', () => {
    // eslint-disable-next-line
    const posed = compose(v => v+1, v => v+1)
    expect(posed(0)).toBe(2)

    // eslint-disable-next-line
    const posed1 = compose(function() {})
    expect(posed1(0)).toBeUndefined()
  })
  test('should return orogin if no arg', () => {
    const posed = compose()
    expect(posed(1)).toBe(1)
  })
})

describe('func.js[curry]', () => {
  test('should curry arguments', () => {
    const cur = curry((x, y) => x + y)
    expect(cur(1)(1)).toBe(2)
    expect(cur(1)(1)).toBe(2)
    expect(cur(1)(3)).toBe(4)
  })
})
