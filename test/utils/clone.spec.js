import { deepClone } from '../../src/utils/clone'
import { isInstance } from '../utils'

describe('clone.js[deepClone]', () => {
  it('should deep clone plain object', () => {
    const plain = 1
    const res = deepClone(plain)
    expect(res).toBe(plain)
  })
  it('should deep clone equal source', () => {
    const source = {
      a: {
        b: {
          c: [{ a: 1, b: 2 }, { c: 3, d: 4 }],
        },
        e: {
          3: 1,
        },
        g: 'some string',
      },
      h: 123,
      j: {},
      k: [1, 2],
      m: new Date(),
      n: () => {},
      o: Object(),
      p: new Map(),
      q: new Set(),
      r: /abcd/gi,
    }
    const res = deepClone(source)
    expect(res).toEqual(source)
  })
  it('should deep clone pure array', () => {
    const arr = [1, 2]
    const res = deepClone(arr)
    // always array ?
    expect(isInstance(res, Array)).toBeTruthy()
    expect(res.length).toBe(2)
    expect(res).not.toBe(arr)
  })
  it('should deep clone pure set', () => {
    const set = new Set([1, 2])
    const res = deepClone(set)
    expect(isInstance(res, Set)).toBeTruthy()
    expect(res.size).toBe(2)
    expect(res).not.toBe(set)
  })
  it('should deep clone pure map', () => {
    const map = new Map()
    const key = { a: 1 }
    map.set(key, 1)
    const res = deepClone(map)
    expect(isInstance(res, Map)).toBeTruthy()
    expect(res.get(key)).toBe(1)
    expect(res).not.toBe(map)
  })
  it('should deep clone pure date', () => {
    const date = new Date()
    const res = deepClone(date)
    expect(isInstance(res, Date)).toBeTruthy()
    expect(+date).toBe(+res)
    expect(res).not.toBe(date)
  })
  it('should deep clone pure error', () => {
    const err = new Error('error')
    const res = deepClone(err)
    expect(isInstance(res, Error)).toBeTruthy()
    expect(res.message).toBe(err.message)
    expect(res).not.toBe(err)
  })
  it('should deep clone pure regexp', () => {
    const reg = /hello/
    const res = deepClone(reg)
    expect(isInstance(res, RegExp)).toBeTruthy()
    expect(res).not.toBe(reg)
  })
  it('should deep clone wrap set', () => {
    const source = { set: new Set([1]) }
    const res = deepClone(source)
    expect(isInstance(res.set, Set)).toBeTruthy()
    expect(res.set.size).toBe(1)
    expect(res.set).not.toBe(source.set)
  })
  it('should deep clone wrap map', () => {
    const source = { map: new Map() }
    const key = { a: 1 }
    source.map.set(key, 1)
    const res = deepClone(source)
    expect(isInstance(res.map, Map)).toBeTruthy()
    expect(res.map.get(key)).toBe(1)
    expect(res.map).not.toBe(source.map)
  })
  it('should deep clone wrap date', () => {
    const source = { date: new Date() }
    const res = deepClone(source)
    expect(isInstance(source.date, Date)).toBeTruthy()
    expect(+source.date).toBe(+res.date)
    expect(res.date).not.toBe(source.date)
  })
  it('should deep clone wrap error', () => {
    const source = { error: new Error('error') }
    const res = deepClone(source)
    expect(isInstance(res.error, Error)).toBeTruthy()
    expect(res.error.message).toBe(source.error.message)
    expect(res.error).not.toBe(source.error)
  })
  it('should deep clone wrap regexp', () => {
    const source = { reg: /hello/ }
    const res = deepClone(source)
    expect(isInstance(res.reg, RegExp)).toBeTruthy()
    expect(res.reg).not.toBe(source.reg)
  })
  it('should deep clone circle object', () => {
    const source = {
      a: 1,
    }
    source.b = source
    const res = deepClone(source)
    expect(res.source).toBe(source)
  })
  it('should deep clone dom node', () => {
    const source = document.createElement('div')
    const res = deepClone(source)
    expect(res).not.toBe(source)
    expect(isInstance(res, HTMLElement))
  })
  it('should deep clone restrict object', () => {
    const source = Object.defineProperty({}, 'a', {
      enumerable: false,
      value: 1,
    })
    expect(() => deepClone(source)).toThrow()
  })
  it('should deep clone null/undefined/NaN', () => {
    expect(deepClone(null)).toBeNull()
    expect(deepClone(undefined)).toBeUndefined()
    expect(deepClone(NaN)).toBeNaN()
  })
  it('deep clone if empty', () => {
    const res = deepClone()
    expect(res).toBeUndefined()
  })
})
