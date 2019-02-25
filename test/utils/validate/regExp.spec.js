import regExp from '../../../src/utils/validate/regExp'

describe('regExp.js[regExp]', () => {
  test('should get true while value match regexp', () => {
    const mockFn = jest.fn()
    regExp('hello', { message: '' })('hello', undefined, mockFn)
    expect(mockFn.mock.calls[0][0]).toBe(true)
    regExp(/hello/, { message: '' })('hello', undefined, mockFn)
    expect(mockFn.mock.calls[1][0]).toBe(true)
  })

  test('should get error while value dont match', () => {
    const mockFn = jest.fn()
    regExp('hello$', { message: '' })('helloworld', undefined, mockFn)
    expect(mockFn.mock.calls[0][0] instanceof Error).toBeTruthy()
    regExp(/hello$/, { message: '' })('helloworld', undefined, mockFn)
    expect(mockFn.mock.calls[1][0] instanceof Error).toBeTruthy()
  })
})
