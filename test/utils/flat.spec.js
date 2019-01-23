import { flatten, unflatten, insertValue, spliceValue, getSthByName, removeSthByName } from '../../src/utils/flat'

const error = new Error('something wrong.')
const date = new Date()
const func = () => {}
const testObject = {
  a: {
    b: {
      c: [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
    },
    e: {
      3: 1,
    },
    g: 'some string',
  },
  h: 123,
  j: {},
  k: [],
  // l: error,
  m: date,
  n: func,
}
const testResult = {
  'a.b.c[0].a': 1,
  'a.b.c[0].b': 2,
  'a.b.c[1].c': 3,
  'a.b.c[1].d': 4,
  'a.e.3': 1,
  'a.g': 'some string',
  h: 123,
  j: {},
  k: [],
  // l: error,
  m: date,
  n: func,
}

describe('flat.js', () => {
  test('flatten object', () => {
    const flatObject = flatten(testObject)
    expect(flatObject).toEqual(testResult)
  })
  test('flatten skip array', () => {
    const object = flatten(testObject, true)
    expect(object).toEqual({
      'a.b.c': [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
      'a.e.3': 1,
      'a.g': 'some string',
      h: 123,
      j: {},
      k: [],
      // l: error,
      m: date,
      n: func,
    })
  })
  test('insert value', () => {
    const values = flatten({
      a: [{ a: 1 }, { b: 2 }],
    })

    const result = {
      a: [{ a: 1 }, { c: 3 }, { b: 2 }],
    }

    insertValue(values, 'a', 1, { c: 3 })
    expect(values).toEqual(flatten(result))

    insertValue(values, 'a', 1, undefined)
    result.a.splice(1, 0, null)
    delete result.a[1]

    expect(values).toEqual(flatten(result))
  })
  test('splice value', () => {
    const values = flatten({
      a: [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }],
    })

    const result = flatten({
      a: [{ a: 1 }, { b: 2 }, { d: 4 }],
    })

    spliceValue(values, 'a', 2)
    expect(values).toEqual(result)
    spliceValue(values, 'a', 1)
    expect(values).toEqual(flatten({
      a: [{ a: 1 }, { d: 4 }],
    }))
  })
  test('unflatten object', () => {
    const object = unflatten(testResult)
    expect(object).toEqual(testObject)
  })
  test('flatten & unflatten', () => {
    const raw = {
      obj: {
        array: [1, 2, 3, 4],
        date: new Date(),
      },
      3: [1, new Date(), NaN],
    }

    const flatObj = flatten(raw)
    const obj = unflatten(flatObj)

    expect(flatObj['obj.date']).toEqual(raw.obj.date)
    expect(flatObj['3[2]']).toEqual(raw['3'][2])
    expect(raw).toEqual(obj)
  })
  test('splice value from array and path', () => {
    const ab = [{ a: 1 }, { b: 1 }]
    ab[3] = 3
    const src = {
      'a.b': ab,
      'a.b[1].b': 2,
    }

    spliceValue(src, 'a.b', 1)
    expect(src).toEqual({ 'a.b': [{ a: 1 }, undefined, 3] })
  })
  test('insert and splice nested array', () => {
    const src = {
      'a[0].b[0].name': 0,
      'a[0].b[1].name': 1,
      'a[0].b[2].name': 2,
      'a[0].b[3].name': 3,
    }
    spliceValue(src, 'a[0].b', 1)
    expect(src).toEqual({
      'a[0].b[0].name': 0,
      'a[0].b[1].name': 2,
      'a[0].b[2].name': 3,
    })
    insertValue(src, 'a[0].b', 1, { name: 1 })
    expect(src).toEqual({
      'a[0].b[0].name': 0,
      'a[0].b[1].name': 1,
      'a[0].b[2].name': 2,
      'a[0].b[3].name': 3,
    })
  })
  test('get something from object', () => {
    const abc0 = getSthByName('a.b.c[0]', testResult)
    expect(abc0).toEqual({ a: 1, b: 2 })
    const abc = getSthByName('a.b.c', testResult)
    expect(abc).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }])
    const ae3 = getSthByName('a.e.3', testResult)
    expect(1).toBe(ae3)
  })
  test('remove something from object', () => {
    const obj = flatten({
      a: {
        b: {
          c: [
            { a: 1, b: 2 },
            { c: 3, d: 4 },
          ],
        },
      },
    })

    removeSthByName('a.b.c[0].b', obj)
    expect(unflatten(obj)).toEqual({
      a: {
        b: {
          c: [
            { a: 1 },
            { c: 3, d: 4 },
          ],
        },
      },
    })

    removeSthByName('a.b.c[0]', obj)
    expect(unflatten(obj)).toEqual({
      a: {
        b: {
          c: [
            { c: 3, d: 4 },
          ],
        },
      },
    })
  })
  test('simple type', () => {
    expect(flatten(func)).toEqual(func)
    expect(flatten(null)).toEqual(null)
    expect(flatten(undefined)).toEqual(undefined)
    expect(flatten({})).toEqual({})
    expect(flatten([])).toEqual([])
    expect(flatten('')).toEqual('')
    expect(flatten(123)).toEqual({ '': 123 })
    expect(flatten('abc')).toEqual({ '': 'abc' })
    expect(flatten(date)).toEqual({ '': date })
    expect(flatten(error)).toEqual(error)
  })
  test('should merge array', () => {
    const ab = [{ a: 1 }]
    ab[3] = 3
    const src = {
      'a.b': ab,
      'a.b[1]': { b: 2 },
    }
    expect(unflatten(src).a.b[0].a).toBe(1)
    expect(unflatten(src).a.b[1].b).toBe(2)
    expect(unflatten(src).a.b[2]).toBe(undefined)
    expect(unflatten(src).a.b[3]).toBe(3)
    expect(unflatten(src)).toEqual({ a: { b: [{ a: 1 }, { b: 2 }, undefined, 3] } })
    expect(src).toEqual({ 'a.b': ab, 'a.b[1]': { b: 2 } })
  })
  test('should skip array value if both set in array and path', () => {
    const ab = [{ a: 1 }, { b: 1 }]
    ab[3] = 3
    const src = {
      'a.b': ab,
      'a.b[1].b': 2,
    }
    expect(unflatten(src).a.b[0].a).toBe(1)
    expect(unflatten(src, { overrite: true }).a.b[1].b).toBe(2)
    expect(unflatten(src).a.b[2]).toBe(undefined)
    expect(unflatten(src).a.b[3]).toBe(3)
    expect(unflatten(src)).toEqual({ a: { b: [{ a: 1 }, { b: 2 }, undefined, 3] } })
    expect(src).toEqual({ 'a.b': ab, 'a.b[1].b': 2 })
  })
  test('should skip empty array', () => {
    const src = {
      'a.b': [],
      'a.b[1].b': 2,
    }
    expect(unflatten(src)).toEqual({ a: { b: [undefined, { b: 2 }] } })
    expect(src).toEqual({ 'a.b': [], 'a.b[1].b': 2 })
  })
  test('should not change source', () => {
    const src = {
      'a.b': [1, {}, 3],
      'a.b[1].b': 2,
    }
    expect(unflatten(src)).toEqual({ a: { b: [1, { b: 2 }, 3] } })
    expect(src).toEqual({ 'a.b': [1, {}, 3], 'a.b[1].b': 2 })
  })
})
