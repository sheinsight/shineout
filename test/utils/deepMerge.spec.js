import { deepMerge } from '../../src/utils/objects'

const error = new Error('something wrong.')
const date = new Date()
const func = () => {}

describe('object.js[deepMerge]', () => {
  test('add keys in target', () => {
    const src = { a: 'abc', b: 123 }
    const target = {}

    const res = deepMerge(target, src)

    expect(target).toEqual({})
    expect(res).toEqual(src)
  })

  test('merge existing simple keys in target at the roots', () => {
    const src = { a: 'abc', b: 123 }
    const target = { b: 'def', c: 'ghi' }

    const expected = {
      a: 'abc',
      b: 123,
      c: 'ghi',
    }

    expect(target).toEqual({ b: 'def', c: 'ghi' })
    expect(deepMerge(target, src)).toEqual(expected)
  })

  test('merge nested objects into target', () => {
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

    expect(target).toEqual({
      a: {
        b: 1234,
        c: '1234',
      },
    })
    expect(deepMerge(target, src)).toEqual(expected)
  })

  test('replace simple key with nested object in target', () => {
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

    expect(target).toEqual({ a: 1234, b: '1234' })
    expect(deepMerge(target, src)).toEqual(expected)
  })

  test('should add nested object in target', () => {
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

    expect(deepMerge(target, src)).toEqual(expected)
  })

  test('should clone source and target', () => {
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

    expect(merged).toEqual(expected)

    expect(merged.a).not.toBe(target.a)
    expect(merged.b).not.toBe(src.b)
  })

  test('should replace object with simple key in target', () => {
    const src = { a: 1234 }
    const target = {
      a: {
        b: 'aa',
        c: 'bb',
      },
      b: '1234',
    }

    const expected = { a: 1234, b: '1234' }

    expect(target).toEqual({
      a: {
        b: 'aa',
        c: 'bb',
      },
      b: '1234',
    })
    expect(deepMerge(target, src)).toEqual(expected)
  })

  test('should not merge array', () => {
    const src = { a: [1, 2, 3] }
    const target = {
      a: [1, 2],
    }

    const dest = deepMerge(target, src)
    expect(dest).toEqual(src)
    expect(src.a).toBe(dest.a)
  })

  test('should not merge function, date, error', () => {
    const src = { a: 1, b: func, c: { d: date, e: error } }
    const expected = { a: 1, b: func, c: { d: date, e: error } }

    const dest = deepMerge({}, src)
    expect(dest).toEqual(expected)
    expect(dest.b).toBe(src.b)
    expect(dest.c.d).toBe(src.c.d)
    expect(dest.c.e).toBe(src.c.e)
  })

  test('should remove undefined', () => {
    const src = { a: 'abc', b: 123 }
    const target = { a: undefined }

    const res = deepMerge(src, target, { removeUndefined: true })

    expect(res).toEqual({ b: 123 })
  })
})

