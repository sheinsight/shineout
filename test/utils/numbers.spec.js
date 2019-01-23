import { range, split, toPrecision } from '../../src/utils/numbers'
import { isInstance } from '../utils'

describe('numbers.js[range]', () => {
  test('should return a normal arr when end > start', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4])
    expect(range(5, 0)).toEqual([0, 1, 2, 3, 4])
    expect(range(5, 4)).toEqual([4])
    expect(range(1, -1)).toEqual([-1, 0])
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
    expect(() => range(null, 'a')).toThrow()
    expect(() => range('a', 'b')).toThrow()
  })
})

describe('numbers.js[split]', () => {
  test('', () => {
    expect(split(5, [10, 0])).toEqual([10, -45])
    expect(split(5, [1, 0])).toEqual([1, 0])
    expect(split(5, [2, 0])).toEqual([2, -5])
    const arr = split(1, [])
    expect(arr.length).toBe(0)
    expect(isInstance(arr, Array)).toBeTruthy()
  })
  test('should throw error when total < 0', () => {
    expect(() => split(0, [])).toThrow()
    expect(() => split(undefined, [])).toThrow()
    expect(() => split(null, [])).toThrow()
  })
})

describe('number.js[toPrecision]', () => {
  test('should convert when precision 0-100', () => {
    expect(toPrecision(12345, 2)).toBe(12000)
    expect(toPrecision(12345, 3)).toBe(12300)
  })
  test('should throw error when precision not between 1-100', () => {
    expect(() => toPrecision(12345, 0)).toThrow()
    expect(() => toPrecision(12345, 101)).toThrow()
    expect(() => toPrecision(12345, -1)).toThrow()
  })
  test('should return origin when precision beyond num', () => {
    expect(toPrecision(1234, 10)).toBe(1234)
    expect(toPrecision(3333, 5)).toBe(3333)
  })
  test('should convert when num <= 0', () => {
    expect(toPrecision(-123, 2)).toBe(-120)
    expect(toPrecision(0, 3)).toBe(0)
    expect(toPrecision(-0, 3)).toBe(0)
  })
})
