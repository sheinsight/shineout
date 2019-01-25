import { objectValues } from '../../src/utils/objects'

describe('objects.js[objectValues]', () => {
  test('should return all values', () => {
    const obj = { a: 1, b: 2 }
    expect(objectValues(obj)).toEqual([1, 2])
  })
  test('should return a empty array if a {}', () => {
    const obj = {}
    expect(objectValues(obj).length).toBe(0)
  })
  test('should return a empty array if have not argument', () => {
    expect(objectValues().length).toBe(0)
  })
  test('should return null when value is null', () => {
    expect(objectValues({ a: null, b: null })).toEqual([null, null])
  })
  test('should return instance values if a function', () => {
    function Func() {
      this.name = 'a'
      this.age = 10
    }
    expect(objectValues(new Func())).toEqual(['a', 10])
  })
  test('should return a empty array if a plain object', () => {
    expect(objectValues(1).length).toBe(0)
  })
})
