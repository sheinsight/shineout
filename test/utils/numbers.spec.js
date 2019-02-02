import { range, split, toPrecision } from '../../src/utils/numbers'
import { isInstance, beEqual } from '../utils'

describe('numbers.js[range]', () => {
  test('should return a normal arr when end > start', () => {
    const inputs = [[5], [5, 0], [5, 4], [1, -1]]
    const expects = [[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [4], [-1, 0]]
    inputs.forEach((input, index) => {
      beEqual(range)(input, expects[index])
    })
  })
  test('should return a empty arr when end = start', () => {
    const arr = range(5, 5)
    expect(arr.length).toBe(0)
    expect(isInstance(arr, Array)).toBeTruthy()
  })
  test('should return a empty arr when end < start', () => {
    let arr = range(4, 5)
    expect(arr.length).toBe(0)
    expect(isInstance(arr, Array)).toBeTruthy()
    arr = range(-2, 1)
    expect(arr.length).toBe(0)
    expect(isInstance(arr, Array)).toBeTruthy()
  })
  test('should throw error if not number', () => {
    expect(range(null, 'a').length).toEqual(0)
    expect(range('a', 'b').length).toEqual(0)
  })
})

describe('numbers.js[split]', () => {
  test('', () => {
    const inputs = [[5, [10, 0]], [5, [1, 0]], [5, [2, 0]]]
    const expects = [[10, -45], [1, 0], [2, -5]]
    inputs.forEach((input, index) => {
      beEqual(split)(input, expects[index])
    })
    const arr = split(1, [])
    expect(arr.length).toBe(0)
    expect(isInstance(arr, Array)).toBeTruthy()
  })
  test('should throw error when total < 0', () => {
    const inputs = [[0, []], [undefined, []], [null, []]]
    inputs.forEach(input => {
      expect(split(...input)).toEqual([])
    })
  })
})

describe('number.js[toPrecision]', () => {
  test('should convert when precision 0-100', () => {
    const inputs = [[12345, 2], [12345, 3]]
    const expects = [12000, 12300]
    inputs.forEach((input, index) => {
      expect(toPrecision(...input)).toBe(expects[index])
    })
  })
  test('should throw error when precision not between 1-100', () => {
    const inputs = [[12345, 0], [12345, 101], [12345, -1]]
    inputs.forEach(input => {
      expect(() => toPrecision(...input)).toThrow()
    })
  })
  test('should return origin when precision beyond num', () => {
    const inputs = [[1234, 10], [3333, 5]]
    const expects = [1234, 3333]
    inputs.forEach((input, index) => {
      expect(toPrecision(...input)).toBe(expects[index])
    })
  })
  test('should convert when num <= 0', () => {
    const inputs = [[-123, 2], [0, 3], [-0, 3]]
    const expects = [-120, 0, 0]
    inputs.forEach((input, index) => {
      expect(toPrecision(...input)).toBe(expects[index])
    })
  })
})
