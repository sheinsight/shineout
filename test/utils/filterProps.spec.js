import { filterProps } from '../../src/utils/objects'

const testObj = {
  a: '12345',
  b: [],
  c: {},
  d: 12345,
  e: { a: 1, b: 2 },
}

describe('objects.js[filterProps]', () => {
  test('get props from object by keys', () => {
    const obj = filterProps(testObj, ['a', 'c'])
    expect(obj).toEqual({ a: '12345', c: {} })
  })

  test('get props from object by function', () => {
    const obj = filterProps(testObj, v => typeof v === 'string' || typeof v === 'number')
    expect(obj).toEqual({ a: '12345', d: 12345 })
  })
})

