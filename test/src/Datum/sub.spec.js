import Datum from '../../../src/Datum'

describe('Datum[sub/unsubscribe]', () => {
  test('should sub/unsubscribe', () => {
    const test = [new Datum.Form(), new Datum.List()]
    test.forEach(datum => {
      const mockFn = jest.fn()
      datum.subscribe('__test', mockFn)
      datum.dispatch('__test')
      expect(mockFn.mock.calls.length).toBe(1)
      datum.unsubscribe('__test', mockFn)
      datum.dispatch('__test')
      expect(mockFn.mock.calls.length).toBe(1)
    })
  })
})
