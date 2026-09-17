import {
  deepGet,
  deepSet,
  deepSetImmutable,
  deepRemove,
  deepRemoveImmutable,
  pathGenerator,
  deepHas,
} from '../../src/utils/objects'

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

  test('remove path while null', () => {
    const target = { a: 'something', b: null }
    deepRemove(target, 'b.c')
    expect(target).toEqual({ a: 'something', b: null })
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

describe('object.js[deepHas]', () => {
  test('has path', () => {
    const data = {
      a: { b: 1 },
      b: [0, 1],
      c: undefined,
    }
    const arr = [['a.b.c', false], ['a.b', true], ['b[0]', true], ['c', true], ['c.d', false]]
    expect(deepHas({}, 'a')).toBe(false)
    arr.forEach(item => {
      expect(deepHas(data, item[0])).toBe(item[1])
    })
  })
})

// deepSetImmutable is the immutable counterpart of deepSet: it shares the signature, the
// path syntax and the semantic, but it never mutates the target and returns a new root.
// The cases below cover the whole deepSet suite above, asserted on the returned value.
describe('object.js[deepSetImmutable]', () => {
  test('set empty key should create.', () => {
    const target = {}
    const result = deepSetImmutable(target, 'a.b.c', 123)
    expect(result).toEqual({ a: { b: { c: 123 } } })
    expect(target).toEqual({})
  })

  test('set single target should merge.', () => {
    const target = { a: { d: 1 } }
    const result = deepSetImmutable(target, 'a.b.c', 123)
    expect(result).toEqual({ a: { b: { c: 123 }, d: 1 } })
    expect(target).toEqual({ a: { d: 1 } })
  })

  test('set object target should merge target target.', () => {
    const target = { a: { b: { c: { e: 456 } } } }
    const result = deepSetImmutable(target, 'a.b.c', { d: { f: 123 } })
    expect(result).toEqual({ a: { b: { c: { d: { f: 123 }, e: 456 } } } })
    expect(target).toEqual({ a: { b: { c: { e: 456 } } } })
  })

  test('set object target should not merge if force set.', () => {
    const target = { a: { b: { c: { e: 456 } } }, e: 1 }
    const result = deepSetImmutable(target, 'a.b.c', { d: { f: 123 } }, { forceSet: true })
    expect(result).toEqual({ a: { b: { c: { d: { f: 123 } } } }, e: 1 })
    expect(target).toEqual({ a: { b: { c: { e: 456 } } }, e: 1 })
  })

  test('set should replace target if target target is not mergeable.', () => {
    const target = { a: { b: { c: 1 } } }
    expect(deepSetImmutable(target, 'a.b', func).a.b).toBe(func)
    expect(deepSetImmutable(target, 'a.b', date).a.b).toBe(date)
    expect(target.a.b).toEqual({ c: 1 })
  })

  test('set array target should replace target', () => {
    const target = { a: { b: [1, 2, 3] } }
    const result = deepSetImmutable(target, 'a.b', [4, 5, 6])
    expect(result).toEqual({ a: { b: [4, 5, 6] } })
    expect(result.a.b).not.toBe(target.a.b)
    expect(target).toEqual({ a: { b: [1, 2, 3] } })
  })

  test('set index should insert into array', () => {
    const target = { a: { b: [1, 2, 3] } }
    const result = deepSetImmutable(target, 'a.b[4]', 4)
    expect(result).toEqual({ a: { b: [1, 2, 3, undefined, 4] } })
    expect(target).toEqual({ a: { b: [1, 2, 3] } })
  })

  test('set index into nested array', () => {
    const target = { a: [1, [2, [3]]] }
    const result = deepSetImmutable(target, 'a[1][1][1]', 4)
    expect(result).toEqual({ a: [1, [2, [3, 4]]] })
    expect(target).toEqual({ a: [1, [2, [3]]] })
  })

  test('set index should create array is not exist', () => {
    const target = { a: {} }
    const result = deepSetImmutable(target, 'a.b[1][0]', 4)
    expect(result).toEqual({ a: { b: [undefined, [4]] } })
    expect(target).toEqual({ a: {} })
  })

  test('set index should throw error if target is not an array', () => {
    const target = { a: { b: func } }
    expect(() => deepSetImmutable(target, 'a.b[1]', 4)).toThrow()
  })

  test('set path should throw error if target is an array', () => {
    const target = { a: { b: [] } }
    expect(() => deepSetImmutable(target, 'a.b.c', 4)).toThrow()
  })

  test('set empty path should merge target', () => {
    const target = { a: { b: [] } }
    const result = deepSetImmutable(target, '', { c: 1 })
    expect(result).toEqual({ a: { b: [] }, c: 1 })
    expect(target).toEqual({ a: { b: [] } })
    expect(result.a).toBe(target.a)
  })

  test('insert value before index', () => {
    const target = { a: { b: [1, 2, 3] } }
    const result = deepSetImmutable(target, 'a.b[1]^', 4)
    expect(result).toEqual({ a: { b: [1, 4, 2, 3] } })
    expect(target).toEqual({ a: { b: [1, 2, 3] } })
  })

  test('append value after index', () => {
    const target = { a: { b: [1, 2, 3] } }
    const result = deepSetImmutable(target, 'a.b[1]$', 4)
    expect(result).toEqual({ a: { b: [1, 2, 4, 3] } })
    expect(target).toEqual({ a: { b: [1, 2, 3] } })
  })

  test('set undefined value should not remove key', () => {
    const target = { a: { c: 1 } }
    const result = deepSetImmutable(target, 'a.c', undefined)
    expect(result).toEqual({ a: { c: undefined } })
    expect(target).toEqual({ a: { c: 1 } })
  })

  test('set undefined value should remove key when removeUndefined is true', () => {
    const target = { a: { c: 1 } }
    const result = deepSetImmutable(target, 'a.c', undefined, { removeUndefined: true })
    expect(result).toEqual({ a: {} })
    expect(target).toEqual({ a: { c: 1 } })
  })

  test('should skip undefined value if skipUndefined is true', () => {
    const target = { a: { c: 1 } }
    expect(deepSetImmutable(target, 'a.c', undefined, { skipUndefined: true })).toEqual({ a: { c: 1 } })
    expect(deepSetImmutable(target, 'a', { c: undefined }, { skipUndefined: true })).toEqual({ a: { c: 1 } })
    expect(target).toEqual({ a: { c: 1 } })
  })

  test('should throw error if target is not an object', () => {
    expect(() => deepSetImmutable(null, 'a', 1)).toThrow()
    expect(() => deepSetImmutable([], 'a', 1)).toThrow()
  })
})

// the cases below are specific to the immutable behaviour, they have no deepSet counterpart
describe('object.js[deepSetImmutable:path based shallow copy]', () => {
  test('should not mutate the target, not even the nodes on the path', () => {
    const target = { a: { b: { c: 1 } }, d: 2 }
    const snapshot = JSON.stringify(target)
    deepSetImmutable(target, 'a.b.c', 3)
    deepSetImmutable(target, 'a.b.e', 4)
    deepSetImmutable(target, 'a.x.y', 5)
    expect(JSON.stringify(target)).toBe(snapshot)
  })

  test('should shallow copy only the nodes on the path', () => {
    const target = { user: { info: { city: 'SH', age: 18 }, tags: ['a'] }, list: [1, 2], other: { x: 1 } }
    const result = deepSetImmutable(target, 'user.info.city', 'BJ')

    expect(result).toEqual({ user: { info: { city: 'BJ', age: 18 }, tags: ['a'] }, list: [1, 2], other: { x: 1 } })
    expect(target.user.info.city).toBe('SH')

    // nodes on the path are new
    expect(result).not.toBe(target)
    expect(result.user).not.toBe(target.user)
    expect(result.user.info).not.toBe(target.user.info)

    // siblings are reused by reference
    expect(result.user.tags).toBe(target.user.tags)
    expect(result.list).toBe(target.list)
    expect(result.other).toBe(target.other)
  })

  test('should reuse the untouched items of an array', () => {
    const users = [{ name: 'a' }, { name: 'b' }]
    const target = { users, meta: { total: 2 } }
    const result = deepSetImmutable(target, 'users[1].name', 'B')

    expect(result).toEqual({ users: [{ name: 'a' }, { name: 'B' }], meta: { total: 2 } })
    expect(target.users[1].name).toBe('b')

    expect(result.users).not.toBe(users)
    expect(result.users[0]).toBe(users[0])
    expect(result.users[1]).not.toBe(users[1])
    expect(result.meta).toBe(target.meta)
  })

  test('should copy the array instead of splicing it in place', () => {
    const target = { a: { b: [1, 2, 3] } }
    const result = deepSetImmutable(target, 'a.b[1]^', 4)
    expect(result).toEqual({ a: { b: [1, 4, 2, 3] } })
    expect(target).toEqual({ a: { b: [1, 2, 3] } })
  })

  test('should treat only the bracket style as an array index, same as deepSet', () => {
    const target = { users: [{ name: 'a' }, { name: 'b' }] }
    expect(deepSetImmutable(target, 'users[1].name', 'B')).toEqual({ users: [{ name: 'a' }, { name: 'B' }] })

    // a plain numeric segment is an object key, not an array index
    expect(deepSetImmutable({}, 'users.0.name', 'a')).toEqual({ users: { 0: { name: 'a' } } })

    // on an existing array the dot style throws, exactly like deepSet
    expect(() => deepSet(target, 'users.1.name', 'B')).toThrow()
    expect(() => deepSetImmutable(target, 'users.1.name', 'B')).toThrow()
  })

  test('should keep the prototype of the class instances on the path', () => {
    class Model {
      constructor() {
        this.x = 1
        this.y = { z: 2 }
      }
    }
    const target = { m: new Model(), keep: 1 }
    const result = deepSetImmutable(target, 'm.x', 9)

    expect(Object.getPrototypeOf(result.m)).toBe(Model.prototype)
    expect(result.m).toBeInstanceOf(Model)
    expect(result.m.x).toBe(9)
    expect(result.m.y).toBe(target.m.y)
    expect(result.keep).toBe(target.keep)
    expect(target.m.x).toBe(1)
  })
})

// deepSetImmutable has to produce the very same value as deepSet for every input, the only
// difference being that deepSet mutates the target while deepSetImmutable returns a copy.
// Every case below runs both implementations and asserts they agree, including on throwing.
describe('object.js[deepSetImmutable: same result as deepSet]', () => {
  const buildTarget = () => ({
    a: { b: { c: [{ x: 1 }] } },
    users: [{ name: 'a' }, { name: 'b' }],
    keep: 1,
  })

  const run = (setter, path, value, options) => {
    const target = buildTarget()
    try {
      return { thrown: false, value: setter(target, path, value, options) }
    } catch (e) {
      return { thrown: true }
    }
  }

  const cases = [
    // create / merge / force set
    ['a.b.c', 123, undefined],
    ['new.x.y', 1, undefined],
    ['a.b.c', { d: { f: 123 } }, undefined],
    ['a.b.c', { d: { f: 123 } }, { forceSet: true }],
    ['a.b.c', [4, 5, 6], undefined],
    ['a.b.c', func, undefined],
    ['a.b.c', date, undefined],
    ['keep', 2, undefined],
    // array index
    ['a.b[4]', 4, undefined],
    ['a[1][1][1]', 4, undefined],
    ['a.b.c[0]', { y: 2 }, undefined],
    ['a.b[1]^', 4, undefined],
    ['a.b[1]$', 4, undefined],
    // bracket style is an array index, dot style is an object key
    ['users[0].name', 'B', undefined],
    ['users[1].name', 'B', undefined],
    ['users.0.name', 'B', undefined],
    // type mismatch
    ['a.b[1][0]', 4, undefined],
    ['a.b.c.d', 4, undefined],
    // undefined
    ['a.b.c', undefined, undefined],
    ['a.b.c', undefined, { removeUndefined: true }],
    ['a.b.c', undefined, { skipUndefined: true }],
    ['a', { c: undefined }, { skipUndefined: true }],
    // empty path
    ['', { c: 1 }, undefined],
  ]

  test.each(cases)('path %s should match deepSet', (path, value, options) => {
    const mutable = run(
      (t, p, v, o) => {
        deepSet(t, p, v, o)
        return t
      },
      path,
      value,
      options
    )
    const immutable = run((t, p, v, o) => deepSetImmutable(t, p, v, o), path, value, options)

    expect(immutable).toEqual(mutable)
  })
})

// the immutable counterpart of deepRemove, covering the whole deepRemove suite
describe('object.js[deepRemoveImmutable]', () => {
  test('should remove path without mutating the target', () => {
    const target = { a: { b: { c: 1 } } }
    const result = deepRemoveImmutable(target, 'a.b.c')
    expect(result).toEqual({ a: { b: {} } })
    expect(target).toEqual({ a: { b: { c: 1 } } })

    const next = deepRemoveImmutable(result, 'a.b')
    expect(next).toEqual({ a: {} })
    expect(result).toEqual({ a: { b: {} } })
  })

  test('remove only one prop', () => {
    const target = { a: 'something' }
    const result = deepRemoveImmutable(target, 'a')
    expect(result).toEqual({})
    expect(target).toEqual({ a: 'something' })
  })

  test('should return the same target when path does not exist', () => {
    const target = { a: 'something' }
    expect(deepRemoveImmutable(target, 'b.c')).toBe(target)
    expect(target).toEqual({ a: 'something' })
  })

  test('should return the same target while meeting null on the path', () => {
    const target = { a: 'something', b: null }
    expect(deepRemoveImmutable(target, 'b.c')).toBe(target)
    expect(target).toEqual({ a: 'something', b: null })
  })

  test('should skip if path target value is not exist', () => {
    const target = { a: { b: { c: [1, 2, 3] } } }
    expect(deepRemoveImmutable(target, 'a.b.d')).toBe(target)
    expect(deepRemoveImmutable(target, 'a.b.c[4]')).toBe(target)
    expect(deepRemoveImmutable(target, 'a.d.c[4]')).toBe(target)
    expect(target).toEqual({ a: { b: { c: [1, 2, 3] } } })
  })

  test('should splice value if path target is item of array', () => {
    const target = { a: { b: { c: [1, 2, 3] } } }

    const r1 = deepRemoveImmutable(target, 'a.b.c[1]')
    expect(r1).toEqual({ a: { b: { c: [1, 3] } } })

    const r2 = deepRemoveImmutable(r1, 'a.b.c[0]')
    expect(r2).toEqual({ a: { b: { c: [3] } } })

    const r3 = deepRemoveImmutable(r2, 'a.b.c[0]')
    expect(r3).toEqual({ a: { b: { c: [] } } })

    // the original tree stays untouched all along
    expect(target).toEqual({ a: { b: { c: [1, 2, 3] } } })
  })

  test('should throw error if path is object and target is an array', () => {
    const target = { a: { b: { 1: 1 } } }
    expect(() => deepRemoveImmutable(target, 'a.b[1]')).toThrow()
  })

  test('should shallow copy only the nodes on the path', () => {
    const target = { a: { b: { c: 1 }, keep: { deep: 1 } }, list: [1, 2], other: { x: 1 } }
    const result = deepRemoveImmutable(target, 'a.b')

    expect(result).toEqual({ a: { keep: { deep: 1 } }, list: [1, 2], other: { x: 1 } })

    // nodes on the path are new
    expect(result).not.toBe(target)
    expect(result.a).not.toBe(target.a)

    // siblings are reused by reference
    expect(result.a.keep).toBe(target.a.keep)
    expect(result.list).toBe(target.list)
    expect(result.other).toBe(target.other)
  })

  test('should not mutate the original array when splicing', () => {
    const list = [1, 2, 3]
    const target = { list }
    const result = deepRemoveImmutable(target, 'list[1]')

    expect(result).toEqual({ list: [1, 3] })
    expect(result.list).not.toBe(list)
    expect(target.list).toBe(list)
    expect(list).toEqual([1, 2, 3])
  })

  test('should keep the untouched items of an array', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const target = { items }
    const result = deepRemoveImmutable(target, 'items[1]')

    expect(result.items[0]).toBe(items[0])
    expect(result.items[1]).toBe(items[2])
    expect(target.items).toBe(items)
  })
})

// deepRemoveImmutable must remove exactly what deepRemove removes, including on bad input
describe('object.js[deepRemoveImmutable: same result as deepRemove]', () => {
  const buildTarget = () => ({
    a: { b: { c: 1, d: [1, 2, 3] } },
    list: [{ x: 1 }, { x: 2 }],
    keep: 1,
  })

  const run = (remover, path) => {
    const target = buildTarget()
    try {
      return { thrown: false, value: remover(target, path) }
    } catch (e) {
      return { thrown: true }
    }
  }

  const cases = [
    'a.b.c',
    'a.b',
    'keep',
    'a.b.d[1]',
    'a.b.d[0]',
    'list[0]',
    'list[1].x',
    // not existing
    'a.b.notexist',
    'notexist.deep',
    'a.b.d[9]',
    // type mismatch, deepRemove breaks on these instead of throwing
    'a.b.d.x',
    'a.b.c.x',
  ]

  test.each(cases)('path %s should match deepRemove', path => {
    const mutable = run((t, p) => {
      deepRemove(t, p)
      return t
    }, path)
    const immutable = run((t, p) => deepRemoveImmutable(t, p), path)

    expect(immutable).toEqual(mutable)
  })
})
