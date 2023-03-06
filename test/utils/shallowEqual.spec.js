import shallowEqual from '../../src/utils/shallowEqual'

// eslint-disable-next-line
const falsey = [, '', 0, false, NaN, null, undefined]

describe('shallowEaual.js[shallowEqual]', () => {
  test('returns true if both arguments are null or undefined', () => {
    expect(shallowEqual(null, null)).toBe(true)
    expect(shallowEqual(undefined, undefined)).toBe(true)
  })

  test('returns true if arguments are shallow equal', () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(true)
  })

  test('returns false if arguments are not objects and not equal', () => {
    expect(shallowEqual(1, 2)).toBeFalsy()
  })

  test('returns false if only one argument is not an object', () => {
    expect(shallowEqual(1, {})).toBeFalsy()
  })

  test('returns false if first argument has too many keys', () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBeFalsy()
  })

  test('returns false if second argument has too many keys', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBeFalsy()
  })

  test('returns true if values are not primitives but are ===', () => {
    const obj = {}
    expect(shallowEqual({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj })).toBeTruthy()
  })

  // subsequent test cases are copied from lodash tests
  test('returns false if arguments are not shallow equal', () => {
    expect(shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} })).toBeFalsy()
  })

  test('should ignore skip keys', () => {
    expect(shallowEqual({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: 1 }, { skip: 'c' })).toBeTruthy()
    expect(shallowEqual({ a: 1, b: 3, c: undefined }, { a: 1, b: 2, c: 1 }, { skip: ['b', 'c'] })).toBeTruthy()
  })

  test('should deep equal special keys', () => {
    expect(shallowEqual(
      { a: 1, b: 2, c: [1, 2, 3] },
      { a: 1, b: 2, c: [1, 2, 3] },
      { deep: 'c' },
    )).toBeTruthy()
    expect(shallowEqual(
      { a: 1, b: {}, c: { a: 1, b: 2, c: 3 } },
      { a: 1, b: {}, c: { a: 1, b: 2, c: 3 } },
      { deep: ['b', 'c'] },
    )).toBeTruthy()
  })
  test('returns false if either argument is null', () => {
    expect(shallowEqual(null, {})).toBeFalsy()
    expect(shallowEqual({}, null)).toBeFalsy()
  })
})
