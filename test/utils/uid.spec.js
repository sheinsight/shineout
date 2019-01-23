import { getUid, getUidStr, getKey } from '../../src/utils/uid'

describe('uid.js[getUid-getUidStr]', () => {
  let first
  let second
  beforeAll(() => {
    first = getUid()
    second = getUid()
  })
  test('should getUid twice calls differ by one', () => {
    expect(second - first).toBe(1)
  })
  test('should getUidStr return different', () => {
    expect(getUidStr()).not.toBe(getUidStr())
  })
})

describe('uid.js[getKey]', () => {
  test('should return d when gen is true', () => {
    expect(getKey(1, true)).toBe(1)
    expect(getKey('2', true)).toBe('2')
    expect(() => getKey({}, true)).toThrow()
  })
  test('should exec gen when gen is function', () => {
    const gen = d => d + 1
    expect(getKey(1, gen)).toBe(2)
    expect(getKey('2', gen)).toBe('21')
  })
})
