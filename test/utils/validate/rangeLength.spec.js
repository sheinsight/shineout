import rangeLength from '../../../src/utils/validate/rangeLength'

describe('rangeLength.js[rangeLength]', () => {
  test('should get true while value length in range', () => {
    const mockFn = jest.fn()
    rangeLength({
      min: 0,
      max: 10,
      message: '',
    })('hello', undefined, mockFn)
    expect(mockFn.mock.calls[0][0]).toBe(true)

    rangeLength({
      min: 0,
      max: 10,
      message: '',
    })('', undefined, mockFn)
    expect(mockFn.mock.calls[1][0]).toBe(true)
  })
  test('should get error while value not in range', () => {
    const mockFn = jest.fn()
    rangeLength({
      min: 5,
      max: 10,
      message: '',
    })('', undefined, mockFn)
    expect(mockFn.mock.calls[0][0] instanceof Error).toBeTruthy()
  })
  test('should get true while range < 0 and in range', () => {
    const mockFn = jest.fn()
    rangeLength({
      min: -5,
      max: 5,
      message: '',
    })('hello', undefined, mockFn)
    expect(mockFn.mock.calls[0][0]).toBeTruthy()
  })
  test('should get true while value is not empty & min is 0', () => {
    const mockFn = jest.fn()
    rangeLength({
      min: 0,
      max: 10,
      message: '',
    })(null, undefined, mockFn)
    expect(mockFn.mock.calls[0][0]).toBeTruthy()
  })
})
