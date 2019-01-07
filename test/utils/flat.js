import test from 'ava'
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

test('flatten object', (t) => {
  const flatObject = flatten(testObject)
  t.deepEqual(flatObject, testResult)
})

test('unflatten object', (t) => {
  const object = unflatten(testResult)
  t.deepEqual(object, testObject)
})

test('flatten skip array', (t) => {
  const object = flatten(testObject, true)
  t.deepEqual(object, {
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

test('flatten & unflatten', (t) => {
  const raw = {
    obj: {
      array: [1, 2, 3, 4],
      date: new Date(),
    },
    3: [1, new Date(), NaN],
  }

  const flatObj = flatten(raw)
  const obj = unflatten(flatObj)

  t.deepEqual(flatObj['obj.date'], raw.obj.date)
  t.deepEqual(flatObj['3[2]'], raw['3'][2])
  t.deepEqual(raw, obj)
})

test('insert value', (t) => {
  const values = flatten({
    a: [{ a: 1 }, { b: 2 }],
  })

  const result = {
    a: [{ a: 1 }, { c: 3 }, { b: 2 }],
  }

  insertValue(values, 'a', 1, { c: 3 })
  t.deepEqual(values, flatten(result))

  insertValue(values, 'a', 1, undefined)
  result.a.splice(1, 0, null)
  delete result.a[1]

  t.deepEqual(values, flatten(result))
})

test('splice value', (t) => {
  const values = flatten({
    a: [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }],
  })

  const result = flatten({
    a: [{ a: 1 }, { b: 2 }, { d: 4 }],
  })

  spliceValue(values, 'a', 2)
  t.deepEqual(values, result)
  spliceValue(values, 'a', 1)
  t.deepEqual(values, flatten({
    a: [{ a: 1 }, { d: 4 }],
  }))
})

test('splice value from array and path', (t) => {
  const ab = [{ a: 1 }, { b: 1 }]
  ab[3] = 3
  const src = {
    'a.b': ab,
    'a.b[1].b': 2,
  }

  spliceValue(src, 'a.b', 1)
  t.deepEqual(src, { 'a.b': [{ a: 1 }, undefined, 3] })
})

test('get something from object', (t) => {
  const abc0 = getSthByName('a.b.c[0]', testResult)
  t.deepEqual(abc0, { a: 1, b: 2 })
  const abc = getSthByName('a.b.c', testResult)
  t.deepEqual(abc, [{ a: 1, b: 2 }, { c: 3, d: 4 }])
  const ae3 = getSthByName('a.e.3', testResult)
  t.is(1, ae3)
})

test('remove something from object', (t) => {
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
  t.deepEqual(unflatten(obj), {
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
  t.deepEqual(unflatten(obj), {
    a: {
      b: {
        c: [
          { c: 3, d: 4 },
        ],
      },
    },
  })
})

test('simple type', (t) => {
  t.deepEqual(flatten(func), func)
  t.deepEqual(flatten(null), null)
  t.deepEqual(flatten(undefined), undefined)
  t.deepEqual(flatten({}), {})
  t.deepEqual(flatten([]), [])
  t.deepEqual(flatten(''), '')
  t.deepEqual(flatten(123), { '': 123 })
  t.deepEqual(flatten('abc'), { '': 'abc' })
  t.deepEqual(flatten(date), { '': date })
  t.deepEqual(flatten(error), error)
})

test('should merge array', (t) => {
  const ab = [{ a: 1 }]
  ab[3] = 3
  const src = {
    'a.b': ab,
    'a.b[1]': { b: 2 },
  }
  t.is(unflatten(src).a.b[0].a, 1)
  t.is(unflatten(src).a.b[1].b, 2)
  t.is(unflatten(src).a.b[2], undefined)
  t.is(unflatten(src).a.b[3], 3)
  t.deepEqual(unflatten(src), { a: { b: [{ a: 1 }, { b: 2 }, undefined, 3] } })
  t.deepEqual(src, { 'a.b': ab, 'a.b[1]': { b: 2 } })
})

test('should skip array value if both set in array and path', (t) => {
  const ab = [{ a: 1 }, { b: 1 }]
  ab[3] = 3
  const src = {
    'a.b': ab,
    'a.b[1].b': 2,
  }
  t.is(unflatten(src).a.b[0].a, 1)
  t.is(unflatten(src, { overrite: true }).a.b[1].b, 2)
  t.is(unflatten(src).a.b[2], undefined)
  t.is(unflatten(src).a.b[3], 3)
  t.deepEqual(unflatten(src), { a: { b: [{ a: 1 }, { b: 2 }, undefined, 3] } })
  t.deepEqual(src, { 'a.b': ab, 'a.b[1].b': 2 })
})

test('should skip empty array', (t) => {
  const src = {
    'a.b': [],
    'a.b[1].b': 2,
  }
  t.deepEqual(unflatten(src), { a: { b: [undefined, { b: 2 }] } })
  t.deepEqual(src, { 'a.b': [], 'a.b[1].b': 2 })
})

test('should not change source', (t) => {
  const src = {
    'a.b': [1, {}, 3],
    'a.b[1].b': 2,
  }
  t.deepEqual(unflatten(src), { a: { b: [1, { b: 2 }, 3] } })
  t.deepEqual(src, { 'a.b': [1, {}, 3], 'a.b[1].b': 2 })
})
