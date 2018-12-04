import test from 'ava'
import { flatten, unflatten, objectValues, insertValue, spliceValue } from '../../src/utils/objects'

const error = new Error('something wrong.')

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
  l: error,
}

const testResult = {
  'a.b.c.[0].a': 1,
  'a.b.c.[0].b': 2,
  'a.b.c.[1].c': 3,
  'a.b.c.[1].d': 4,
  'a.e.3': 1,
  'a.g': 'some string',
  h: 123,
  j: {},
  k: [],
  l: error,
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
    l: error,
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
  t.deepEqual(flatObj['3.[2]'], raw['3'][2])
  t.deepEqual(raw, obj)
})

test('object values', (t) => {
  const values = objectValues(testObject)
  t.deepEqual(values, [
    {
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
    123,
    {},
    [],
    error,
  ])
})

test('inner value', (t) => {
  const values = flatten({
    a: [{ a: 1 }, { b: 2 }],
  })

  const result = flatten({
    a: [{ a: 1 }, { c: 3 }, { b: 2 }],
  })

  insertValue(values, 'a', 1, { c: 3 })
  t.deepEqual(values, result)
  insertValue(values, 'a', 1, undefined)
  console.log(values, flatten({
    a: [{ a: 1 }, undefined, { c: 3 }, { b: 2 }],
  }))

  t.deepEqual(values, flatten({
    a: [{ a: 1 }, undefined, { c: 3 }, { b: 2 }],
  }))
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
