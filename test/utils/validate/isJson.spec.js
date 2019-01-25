import isJson from '../../../src/utils/validate/isJson'

describe('isJson.js[isJson]', () => {
  test('should return true if json string / object', () => {
    const testData = [
      { a: 1 },
      '{"a":1,"b":"hello"}',
      JSON.stringify({ a: new Date(), b: null, c: { d: 'hello' }, d: new Error() }),
    ]
    testData.forEach(item => {
      expect(isJson(item)).toBeTruthy()
    })
  })
  test('should return false if not a json', () => {
    // expect(isJson(false)).toThrow()
    // expect(isJson(true)).toThrow()
    expect(isJson('{a:2}}')).toBeFalsy()
    expect(isJson('{a: 1, b: 2, c}')).toBeFalsy()
  })
})
