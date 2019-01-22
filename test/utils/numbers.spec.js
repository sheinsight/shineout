import { range, split, toPrecision } from '../../src/utils/numbers'
import { isInstance } from '../utils'

describe('numbers.js[range]', () => {
  test('should return a normal arr when end > start', () => {
    expect(range(5))
      .toEqual([0, 1, 2, 3, 4])
    expect(range(5, 0))
      .toEqual([0, 1, 2, 3, 4])
    expect(range(5, 4))
      .toEqual([4])
    expect(range(1, -1))
      .toEqual([-1, 0])
  })
  test('should return a empty arr when end = start', () => {
    const arr = range(5, 5)
    expect(arr.length)
      .toBe(0)
    expect(isInstance(arr, Array))
      .toBeTruthy()
  })
  test('should return a empty arr when end < start', () => {
    let arr = range(4, 5)
    expect(arr.length)
      .toBe(0)
    expect(isInstance(arr, Array))
      .toBeTruthy()
    arr = range(-2, 1)
    expect(arr.length)
      .toBe(0)
    expect(isInstance(arr, Array))
      .toBeTruthy()
  })
  test('should throw error if not number', () => {
    expect(() => range(null, 'a'))
      .toThrow()
    expect(() => range('a', 'b'))
      .toThrow()
  })
})

describe('numbers.js[split]', () => {
  test('', () => {
    expect(split(5, [10, 0]))
      .toEqual([10, -45])
    expect(split(5, [1, 0]))
      .toEqual([1, 0])
    expect(split(5, [2, 0]))
      .toEqual([2, -5])
    const arr = split(1, [])
    expect(arr.length)
      .toBe(0)
    expect(isInstance(arr, Array))
      .toBeTruthy()
  })
  test('should throw error when total < 0', () => {
    expect(() => split(0, []))
      .toThrow()
    expect(() => split(undefined, []))
      .toThrow()
    expect(() => split(null, []))
      .toThrow()
  })
})


describe('number.js[toPrecision]', () => {

})
