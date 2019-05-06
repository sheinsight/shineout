import { deepGet, deepSet, deepRemove, pathGenerator } from '../../src/utils/objects'

const func = () => {}
const date = new Date()

describe('objects.js[deepGet]', () => {
  test('get empty path should get target', () => {
    const target = { a: { b: [] } }
    const dest = deepGet(target, '')
    expect(dest).toEqual({ a: { b: [] } })
  })

  test('get object by path', () => {
    const target = { a: { b: [1] } }
    const dest = deepGet(target, 'a.b')
    expect(dest).toEqual([1])
  })

  test('get array by index', () => {
    const target = { a: { b: [{ a: 1 }] } }
    const dest = deepGet(target, 'a.b[0].a')
    expect(dest).toEqual(1)
  })

  test('get default value if path not existed.', () => {
    const target = { a: { b: null } }
    const dest = deepGet(target, 'a.b.a.c', { defaultValue: 123 })
    expect(dest).toEqual(123)
  })

  test('should throw error if get value is not exist with strictMode', () => {
    const target = { a: { b: 1 } }
    expect(() => deepGet(target, 'a.b[1]', { strictMode: true })).toThrow()
  })

  test('should throw error if get value is not exist with path strict', () => {
    const target = { a: { b: [] } }
    expect(() => deepGet(target, 'a.b[1]!.c')).toThrow()
  })

  test('should get undefined if value is not existed and with path loose', () => {
    const target = { a: { b: [] } }
    const dest = deepGet(target, 'a.b[1]?.c', { strictMode: true })
    expect(dest).toBe(undefined)
  })
})
describe('object.js[deepSet]', () => {
  test('set empty key should create.', () => {
    const target = {}
    deepSet(target, 'a.b.c', 123)
    expect(target).toEqual({ a: { b: { c: 123 } } })
  })

  test('set single target should merge.', () => {
    const target = { a: { d: 1 } }
    deepSet(target, 'a.b.c', 123)
    expect(target).toEqual({ a: { b: { c: 123 }, d: 1 } })
  })

  test('set object target should merge target target.', () => {
    const target = { a: { b: { c: { e: 456 } } } }
    deepSet(target, 'a.b.c', { d: { f: 123 } })
    expect(target).toEqual({ a: { b: { c: { d: { f: 123 }, e: 456 } } } })
  })

  test('set object target should not merge if force set.', () => {
    const target = { a: { b: { c: { e: 456 } } }, e: 1 }
    deepSet(target, 'a.b.c', { d: { f: 123 } }, { forceSet: true })
    expect(target).toEqual({ a: { b: { c: { d: { f: 123 } } } }, e: 1 })
  })

  test('set should replace target if target target is not mergeable.', () => {
    const target = { a: { b: { c: 1 } } }
    deepSet(target, 'a.b', func)
    expect(target).toEqual({ a: { b: func } })
    deepSet(target, 'a.b', date)
    expect(target).toEqual({ a: { b: date } })
  })

  test('set array target should replace target', () => {
    const target = { a: { b: [1, 2, 3] } }
    deepSet(target, 'a.b', [4, 5, 6])
    expect(target).toEqual({ a: { b: [4, 5, 6] } })
  })

  test('set index should insert into array', () => {
    const target = { a: { b: [1, 2, 3] } }
    deepSet(target, 'a.b[4]', 4)
    expect(target).toEqual({ a: { b: [1, 2, 3, undefined, 4] } })
  })

  test('set index into nested array', () => {
    const target = { a: [1, [2, [3]]] }
    deepSet(target, 'a[1][1][1]', 4)
    expect(target).toEqual({ a: [1, [2, [3, 4]]] })
  })

  test('set index should create array is not exist', () => {
    const target = { a: {} }
    deepSet(target, 'a.b[1][0]', 4)
    expect(target).toEqual({ a: { b: [undefined, [4]] } })
  })

  test('set index should throw error if target is not an array', () => {
    const target = { a: { b: func } }
    expect(() => deepSet(target, 'a.b[1]', 4)).toThrow()
  })

  test('set path should throw error if target is an array', () => {
    const target = { a: { b: [] } }
    expect(() => deepSet(target, 'a.b.c', 4)).toThrow()
  })

  test('set empty path should merge target', () => {
    const target = { a: { b: [] } }
    deepSet(target, '', { c: 1 })
    expect(target).toEqual({ a: { b: [] }, c: 1 })
  })

  test('insert value before index', () => {
    const target = { a: { b: [1, 2, 3] } }
    deepSet(target, 'a.b[1]^', 4)
    expect(target).toEqual({ a: { b: [1, 4, 2, 3] } })
  })

  test('append value after index', () => {
    const target = { a: { b: [1, 2, 3] } }
    deepSet(target, 'a.b[1]$', 4)
    expect(target).toEqual({ a: { b: [1, 2, 4, 3] } })
  })

  test('set undefined value should not remove key', () => {
    const target = { a: { c: 1 } }
    deepSet(target, 'a.c', undefined)
    expect(target).toEqual({ a: { c: undefined } })
  })

  test('set undefined value should remove key when removeUndefined is true', () => {
    const target = { a: { c: 1 } }
    deepSet(target, 'a.c', undefined, { removeUndefined: true })
    expect(target).toEqual({ a: {} })
  })

  test('should skip undefined value if skipUndefined is true', () => {
    const target = { a: { c: 1 } }
    deepSet(target, 'a.c', undefined, { skipUndefined: true })
    expect(target).toEqual({ a: { c: 1 } })

    deepSet(target, 'a', { c: undefined }, { skipUndefined: true })
    expect(target).toEqual({ a: { c: 1 } })
  })
})
describe('object.js[deepRemove]', () => {
  test('should remove path', () => {
    const target = { a: { b: { c: 1 } } }
    deepRemove(target, 'a.b.c')
    expect(target).toEqual({ a: { b: {} } })
    deepRemove(target, 'a.b')
    expect(target).toEqual({ a: {} })
  })

  test('remove only one prop', () => {
    const target = { a: 'something' }
    deepRemove(target, 'a')
    expect(target).toEqual({})
  })

  test('remove path not exist', () => {
    const target = { a: 'something' }
    deepRemove(target, 'b.c')
    expect(target).toEqual({ a: 'something' })
  })

  test('should skip if path target value is not exist', () => {
    const target = { a: { b: { c: [1, 2, 3] } } }
    deepRemove(target, 'a.b.d')
    expect(target).toEqual({ a: { b: { c: [1, 2, 3] } } })
    deepRemove(target, 'a.b.c[4]')
    expect(target).toEqual({ a: { b: { c: [1, 2, 3] } } })
    deepRemove(target, 'a.d.c[4]')
    expect(target).toEqual({ a: { b: { c: [1, 2, 3] } } })
  })

  test('should splice value if path target is item of array', () => {
    const target = { a: { b: { c: [1, 2, 3] } } }
    deepRemove(target, 'a.b.c[1]')
    expect(target).toEqual({ a: { b: { c: [1, 3] } } })
    deepRemove(target, 'a.b.c[0]')
    expect(target).toEqual({ a: { b: { c: [3] } } })
    deepRemove(target, 'a.b.c[0]')
    expect(target).toEqual({ a: { b: { c: [] } } })
  })

  test('should throw error if path is object and target is an array', () => {
    const target = { a: { b: { 1: 1 } } }
    expect(() => deepRemove(target, 'a.b[1]')).toThrow()
  })
})

describe('object.js[pathGenerator]', () => {
  test('get path.', () => {
    const gen = pathGenerator('a.b[0].c.d')
    expect(gen).toEqual([
      ['a', 'b.[0].c.d', undefined],
      ['b', '[0].c.d', undefined],
      [0, 'c.d', undefined],
      ['c', 'd', undefined],
      ['d', undefined, undefined],
    ])
  })

  test('get path with mode.', () => {
    const gen = pathGenerator('a.b![0]?.c!')
    expect(gen).toEqual([['a', 'b!.[0]?.c!', undefined], ['b', '[0]?.c!', '!'], [0, 'c!', '?'], ['c', undefined, '!']])
  })
})
