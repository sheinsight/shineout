import required from '../../../src/utils/validate/required'

describe('required.js[required]', () => {
  test('should get error while value is empty', () => {
    const cases = [undefined, null, [], '']
    const callback = jest.fn()
    cases.forEach((item, index) => {
      required({ message: 'oh no' })(cases[index], undefined, callback)
      expect(callback.mock.calls[index][0] instanceof Error).toBeTruthy()
    })
  })
  test('should get true while has value', () => {
    const cases = [0, 'string', ' ', {}, [1], false, NaN, new Date()]
    const callback = jest.fn()
    cases.forEach((item, index) => {
      required({ message: 'oh no' })(cases[index], undefined, callback)
      expect(callback.mock.calls[index][0]).toBe(true)
    })
  })
})
