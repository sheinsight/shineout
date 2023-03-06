import { getUidStr, getKey } from '../../src/utils/uid'

describe('uid.js[getUid-getUidStr]', () => {
  test('should getUidStr return different', () => {
    expect(getUidStr()).not.toBe(getUidStr())
  })
  test('should return d when gen is true', () => {
    expect(() => document.querySelector(`#${getUidStr()}`)).not.toThrow()
  })
})

describe('uid.js[getKey]', () => {
  test('should return d when gen is true', () => {
    expect(getKey(1, true)).toBe(1)
    expect(getKey('2', true)).toBe('2')
    // expect(() => getKey({}, true)).toThrow()
  })
  test('should exec gen when gen is function', () => {
    const gen = d => d + 1
    expect(getKey(1, gen)).toBe(2)
    expect(getKey('2', gen)).toBe('21')
  })
})
