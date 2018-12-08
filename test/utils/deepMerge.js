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

  t.deepEqual(target, {})
  t.deepEqual(res, src)
})

test('merge existing simple keys in target at the roots', (t) => {
  const src = { a: 'abc', b: 123 }
  const target = { b: 'def', c: 'ghi' }

  const expected = {
    a: 'abc',
    b: 123,
    c: 'ghi',
  }

  t.deepEqual(target, { b: 'def', c: 'ghi' })
  t.deepEqual(deepMerge(target, src), expected)
})

test('merge nested objects into target', (t) => {
  const src = {
    a: {
      b: 'abc',
      d: 'something',
    },
  }
  const target = {
    a: {
      b: 1234,
      c: '1234',
    },
  }

  const expected = {
    a: {
      b: 'abc',
      c: '1234',
      d: 'something',
    },
  }

  t.deepEqual(target, {
    a: {
      b: 1234,
      c: '1234',
    },
  })
  t.deepEqual(deepMerge(target, src), expected)
})

test('replace simple key with nested object in target', (t) => {
  const src = {
    a: {
      b: 'aa',
      c: 'bb',
    },
  }
  const target = {
    a: 1234,
    b: '1234',
  }

  const expected = {
    a: {
      b: 'aa',
      c: 'bb',
    },
    b: '1234',
  }

  t.deepEqual(target, { a: 1234, b: '1234' })
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

  const merged = deepMerge(target, src, { clone: true })

  t.deepEqual(merged, expected)

  t.not(merged.a, target.a)
  t.not(merged.b, src.b)
})

test('should replace object with simple key in target', (t) => {
  const src = { a: 1234 }
  const target = {
    a: {
      b: 'aa',
      c: 'bb',
    },
    b: '1234',
  }

  const expected = { a: 1234, b: '1234' }

  t.deepEqual(target, {
    a: {
      b: 'aa',
      c: 'bb',
    },
    b: '1234',
  })
  t.deepEqual(deepMerge(target, src), expected)
})

test('should not merge array', (t) => {
  const src = { a: [1, 2, 3] }
  const target = {
    a: [1, 2],
  }

  const dest = deepMerge(target, src)
  t.deepEqual(dest, src)
  t.is(src.a, dest.a)
})

test('should not merge function, date, error', (t) => {
  const src = { a: 1, b: func, c: { d: date, e: error } }
  const expected = { a: 1, b: func, c: { d: date, e: error } }

  const dest = deepMerge({}, src)
  t.deepEqual(dest, expected)
  t.is(dest.b, src.b)
  t.is(dest.c.d, src.c.d)
  t.is(dest.c.e, src.c.e)
})

test('should remove undefined', (t) => {
  const src = { a: 'abc', b: 123 }
  const target = { a: undefined }

  const res = deepMerge(src, target, { removeUndefined: true })

  t.deepEqual(res, { b: 123 })
})
