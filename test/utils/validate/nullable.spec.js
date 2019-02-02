import nullable from '../../../src/utils/validate/nullable'

describe('nullable.js[nullable]', () => {
  test('should run while null or empty', () => {
    const nullCallback = nullable(undefined)
    const mockfn = jest.fn()
    const testData = [[], null, undefined]
    testData.forEach((item, index) => {
      nullCallback(item, undefined, mockfn)
      expect(mockfn.mock.calls[index][0]).toBeTruthy()
    })
  })
  test('should run fn while not null', () => {
    const fnmock = jest.fn()
    const nullableFn = nullable(fnmock)
    nullableFn(1, undefined, undefined)
    expect(fnmock.mock.calls.length).toBe(1)
  })
})
