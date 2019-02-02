import range from '../../../src/utils/validate/range'

describe('range.js[range]', () => {
  test('should get true while value in range or range not number', () => {
    const mockFn = jest.fn()
    range({
      min: 0,
      max: 10,
      message: '',
    })(1, undefined, mockFn)
    expect(mockFn.mock.calls[0][0]).toBe(true)

    range({
      min: 0,
      max: 10,
      message: '',
    })(0, undefined, mockFn)
    expect(mockFn.mock.calls[1][0]).toBe(true)

    range({
      min: 0,
      max: 10,
      message: '',
    })(10, undefined, mockFn)
    expect(mockFn.mock.calls[2][0]).toBe(true)
    // range not number
    range({
      min: 'a',
      max: 10,
      message: '',
    })(10, undefined, mockFn)
    expect(mockFn.mock.calls[3][0]).toBe(true)
  })
  test('should get error while value not in range or value is not number', () => {
    const mockFn = jest.fn()
    range({
      min: 0,
      max: 10,
      message: '',
    })(11, undefined, mockFn)
    expect(mockFn.mock.calls[0][0] instanceof Error).toBeTruthy()

    range({
      min: 0,
      max: 10,
      message: '',
    })('11', undefined, mockFn)
    expect(mockFn.mock.calls[1][0] instanceof Error).toBeTruthy()
  })
})
