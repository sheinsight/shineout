import test from 'ava'
import { deepGet, deepSet, deepRemove, pathGenerator } from '../../src/utils/objects'

const func = () => {}
const date = new Date()

test('get path.', (t) => {
  const gen = pathGenerator('a.b[0].c.d')
  t.deepEqual(gen.next().value, ['a', 'b.[0].c.d', undefined])
  t.deepEqual(gen.next().value, ['b', '[0].c.d', undefined])
  t.deepEqual(gen.next().value, [0, 'c.d', undefined])
  t.deepEqual(gen.next().value, ['c', 'd', undefined])
  t.deepEqual(gen.next().value, ['d', undefined, undefined])
  t.true(gen.next().done)
})

test('get path with mode.', (t) => {
  const gen = pathGenerator('a.b![0]?.c!')
  t.deepEqual(gen.next().value, ['a', 'b!.[0]?.c!', undefined])
  t.deepEqual(gen.next().value, ['b', '[0]?.c!', '!'])
  t.deepEqual(gen.next().value, [0, 'c!', '?'])
  t.deepEqual(gen.next().value, ['c', undefined, '!'])
  t.true(gen.next().done)
})

test('set empty key should create.', (t) => {
  const target = {}
  deepSet(target, 'a.b.c', 123)
  t.deepEqual(target, { a: { b: { c: 123 } } })
})

test('set single target should merge.', (t) => {
  const target = { a: { d: 1 } }
  deepSet(target, 'a.b.c', 123)
  t.deepEqual(target, { a: { b: { c: 123 }, d: 1 } })
})

test('set object target should merge target target.', (t) => {
  const target = { a: { b: { c: { e: 456 } } } }
  deepSet(target, 'a.b.c', { d: { f: 123 } })
  t.deepEqual(target, { a: { b: { c: { d: { f: 123 }, e: 456 } } } })
})

test('set object target should not merge if force set.', (t) => {
  const target = { a: { b: { c: { e: 456 } } }, e: 1 }
  deepSet(target, 'a.b.c', { d: { f: 123 } }, { forceSet: true })
  t.deepEqual(target, { a: { b: { c: { d: { f: 123 } } } }, e: 1 })
})

test('set should replace target if target target is not mergeable.', (t) => {
  const target = { a: { b: { c: 1 } } }
  deepSet(target, 'a.b', func)
  t.deepEqual(target, { a: { b: func } })
  deepSet(target, 'a.b', date)
  t.deepEqual(target, { a: { b: date } })
})

test('set array target should replace target', (t) => {
  const target = { a: { b: [1, 2, 3] } }
  deepSet(target, 'a.b', [4, 5, 6])
  t.deepEqual(target, { a: { b: [4, 5, 6] } })
})

test('set index should insert into array', (t) => {
  const target = { a: { b: [1, 2, 3] } }
  deepSet(target, 'a.b[4]', 4)
  t.deepEqual(target, { a: { b: [1, 2, 3, undefined, 4] } })
})

test('set index into nested array', (t) => {
  const target = { a: [1, [2, [3]]] }
  deepSet(target, 'a[1][1][1]', 4)
  t.deepEqual(target, { a: [1, [2, [3, 4]]] })
})

test('set index should create array is not exist', (t) => {
  const target = { a: {} }
  deepSet(target, 'a.b[1][0]', 4)
  t.deepEqual(target, { a: { b: [undefined, [4]] } })
})

test('set index should throw error if target is not an array', (t) => {
  const target = { a: { b: func } }
  try {
    deepSet(target, 'a.b[1]', 4)
    t.fail('should throw error')
  } catch (e) {
    t.pass()
  }
})

test('set path should throw error if target is an array', (t) => {
  const target = { a: { b: [] } }
  try {
    deepSet(target, 'a.b.c', 4)
    t.fail('should throw error')
  } catch (e) {
    t.pass()
  }
})

test('set empty path should merge target', (t) => {
  const target = { a: { b: [] } }
  deepSet(target, '', { c: 1 })
  t.deepEqual(target, { a: { b: [] }, c: 1 })
})

test('insert value before index', (t) => {
  const target = { a: { b: [1, 2, 3] } }
  deepSet(target, 'a.b[1]^', 4)
  t.deepEqual(target, { a: { b: [1, 4, 2, 3] } })
})

test('append value after index', (t) => {
  const target = { a: { b: [1, 2, 3] } }
  deepSet(target, 'a.b[1]$', 4)
  t.deepEqual(target, { a: { b: [1, 2, 4, 3] } })
})

test('set undefined value should not remove key', (t) => {
  const target = { a: { c: 1 } }
  deepSet(target, 'a.c', undefined)
  t.deepEqual(target, { a: { c: undefined } })
})

test('set undefined value should remove key when removeUndefined is true', (t) => {
  const target = { a: { c: 1 } }
  deepSet(target, 'a.c', undefined, { removeUndefined: true })
  t.deepEqual(target, { a: {} })
})

test('should skip undefined value if skipUndefined is true', (t) => {
  const target = { a: { c: 1 } }
  deepSet(target, 'a.c', undefined, { skipUndefined: true })
  t.deepEqual(target, { a: { c: 1 } })

  deepSet(target, 'a', { c: undefined }, { skipUndefined: true })
  t.deepEqual(target, { a: { c: 1 } })
})

test('get empty path should get target', (t) => {
  const target = { a: { b: [] } }
  const dest = deepGet(target, '')
  t.deepEqual(dest, { a: { b: [] } })
})

test('get object by path', (t) => {
  const target = { a: { b: [1] } }
  const dest = deepGet(target, 'a.b')
  t.deepEqual(dest, [1])
})

test('get array by index', (t) => {
  const target = { a: { b: [{ a: 1 }] } }
  const dest = deepGet(target, 'a.b[0].a')
  t.deepEqual(dest, 1)
})

test('get default value if path not existed.', (t) => {
  const target = { a: { b: 1 } }
  const dest = deepGet(target, 'a.b[0].a', { defaultValue: 123 })
  t.deepEqual(dest, 123)
})

test('should throw error if get value is not exist with strictMode', (t) => {
  const target = { a: { b: 1 } }
  try {
    deepGet(target, 'a.b[1]', { strictMode: true })
    t.fail('should throw error')
  } catch (e) {
    t.pass()
  }
})

test('should throw error if get value is not exist with path strict', (t) => {
  const target = { a: { b: [] } }
  try {
    deepGet(target, 'a.b[1]!.c')
    t.fail('should throw error')
  } catch (e) {
    t.pass()
  }
})

test('should get undefined if value is not existed and with path loose', (t) => {
  const target = { a: { b: [] } }
  const dest = deepGet(target, 'a.b[1]?.c', { strictMode: true })
  t.is(dest, undefined)
})

test('should remove path', (t) => {
  const target = { a: { b: { c: 1 } } }
  deepRemove(target, 'a.b.c')
  t.deepEqual(target, { a: { b: {} } })
  deepRemove(target, 'a.b')
  t.deepEqual(target, { a: {} })
})

test('remove only one prop', (t) => {
  const target = { a: 'something' }
  deepRemove(target, 'a')
  t.deepEqual(target, { })
})


test('should skip if path target value is not exist', (t) => {
  const target = { a: { b: { c: [1, 2, 3] } } }
  deepRemove(target, 'a.b.d')
  t.deepEqual(target, { a: { b: { c: [1, 2, 3] } } })
  deepRemove(target, 'a.b.c[4]')
  t.deepEqual(target, { a: { b: { c: [1, 2, 3] } } })
  deepRemove(target, 'a.d.c[4]')
  t.deepEqual(target, { a: { b: { c: [1, 2, 3] } } })
})

test('should splice value if path target is item of array', (t) => {
  const target = { a: { b: { c: [1, 2, 3] } } }
  deepRemove(target, 'a.b.c[1]')
  t.deepEqual(target, { a: { b: { c: [1, 3] } } })
  deepRemove(target, 'a.b.c[0]')
  t.deepEqual(target, { a: { b: { c: [3] } } })
  deepRemove(target, 'a.b.c[0]')
  t.deepEqual(target, { a: { b: { c: [] } } })
})

test('should throw error if path is object and target is an array', (t) => {
  const target = { a: { b: { 1: 1 } } }
  try {
    deepRemove(target, 'a.b[1]')
    t.fail('should throw error')
  } catch (e) {
    t.pass()
  }
})
