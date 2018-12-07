import test from 'ava'
import { isMergeable, deepMerge } from '../../src/utils/objects'

const error = new Error('something wrong.')
const date = new Date()
const func = () => {}

test('is merge able', (t) => {
  t.true(isMergeable({}))
  t.false(isMergeable([]))
  t.false(isMergeable(''))
  t.false(isMergeable(123))
  t.false(isMergeable(error))
  t.false(isMergeable(date))
  t.false(isMergeable(func))
})

test('add keys in target', (t) => {
  const src = { a: 'abc', b: 123 }
  const target = {}

  const res = deepMerge(target, src)

  t.deepEqual(target, {}, 'merge should be immutable')
  t.deepEqual(res, src)
})

test('merge existing simple keys in target at the roots', (t) => {
  const src = { key1: 'changed', key2: 'value2' }
  const target = { key1: 'value1', key3: 'value3' }

  const expected = {
    key1: 'changed',
    key2: 'value2',
    key3: 'value3',
  }

  t.deepEqual(target, { key1: 'value1', key3: 'value3' })
  t.deepEqual(deepMerge(target, src), expected)
})

test('merge nested objects into target', (t) => {
  const src = {
    key1: {
      subkey1: 'changed',
      subkey3: 'added',
    },
  }
  const target = {
    key1: {
      subkey1: 'value1',
      subkey2: 'value2',
    },
  }

  const expected = {
    key1: {
      subkey1: 'changed',
      subkey2: 'value2',
      subkey3: 'added',
    },
  }

  t.deepEqual(target, {
    key1: {
      subkey1: 'value1',
      subkey2: 'value2',
    },
  })
  t.deepEqual(deepMerge(target, src), expected)
})

test('replace simple key with nested object in target', (t) => {
  const src = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
  }
  const target = {
    key1: 'value1',
    key2: 'value2',
  }

  const expected = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
    key2: 'value2',
  }

  t.deepEqual(target, { key1: 'value1', key2: 'value2' })
  t.deepEqual(deepMerge(target, src), expected)
})

test('should add nested object in target', (t) => {
  const src = {
    b: {
      c: {},
    },
  }

  const target = {
    a: {},
  }

  const expected = {
    a: {},
    b: {
      c: {},
    },
  }

  t.deepEqual(deepMerge(target, src), expected)
})

test('should clone source and target', (t) => {
  const src = {
    b: {
      c: 'foo',
    },
  }

  const target = {
    a: {
      d: 'bar',
    },
  }

  const expected = {
    a: {
      d: 'bar',
    },
    b: {
      c: 'foo',
    },
  }

  const merged = deepMerge(target, src, true)

  t.deepEqual(merged, expected)

  t.not(merged.a, target.a)
  t.not(merged.b, src.b)
})

test('should replace object with simple key in target', (t) => {
  const src = { key1: 'value1' }
  const target = {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
    key2: 'value2',
  }

  const expected = { key1: 'value1', key2: 'value2' }

  t.deepEqual(target, {
    key1: {
      subkey1: 'subvalue1',
      subkey2: 'subvalue2',
    },
    key2: 'value2',
  })
  t.deepEqual(deepMerge(target, src), expected)
})
