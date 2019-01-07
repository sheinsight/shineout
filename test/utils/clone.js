import test from 'ava'
import { FormError } from '../../src/utils/errors'
import { deepClone } from '../../src/utils/clone'

const date = new Date('2018-01-01')
const func = () => {}

const source = {
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
  k: [1, 2],
  m: date,
  n: func,
  o: Object(),
  p: new Map(),
  q: new Set(),
  r: /abcd/ig,
}

test('should deep equal source', (t) => {
  const res = deepClone(source)
  t.deepEqual(res, source)
})

test('should deep copy array', (t) => {
  const res = deepClone(source)
  res.k.push(3)
  t.true(source.k.length === 2)
  t.true(res.k[2] === 3)
})

test('should copy map', (t) => {
  const map = new Map()
  map.set('foo', 'bar')
  const src = { map }
  const res = deepClone(src)

  t.not(src.map, res.map)
  t.true(src.map.get('foo') === res.map.get('foo'))

  res.map.set('foo', 'ops')
  t.true(src.map.get('foo') === 'bar')
  t.true(res.map.get('foo') === 'ops')
})

test('should copy set', (t) => {
  const set = new Set([1, 2, 3])
  const src = { set }
  const res = deepClone(src)

  t.deepEqual(src.set, res.set)
  res.set.add(4)
  t.true(src.set.size === 3)
  t.true(res.set.size === 4)
  t.true(res.set.has(4))
  t.notDeepEqual(src.set, res.set)
})

test('should copy date', (t) => {
  const src = { date }
  const res = deepClone(src)

  t.deepEqual(src.date, res.date)
  res.date.setDate(10)
  t.true(src.date.getDate() === 1)
  t.true(res.date.getDate() === 10)
  t.notDeepEqual(src.date, res.date)
})

test('should copy regexp', (t) => {
  const reg = /abcd/ig
  const src = { reg }
  const res = deepClone(src)

  t.deepEqual(src.reg, res.reg)
  t.not(src.reg, res.reg)
})

test('should copy error', (t) => {
  const err = new FormError('something is wrong.')
  err.status = 200
  const src = { err }
  const res = deepClone(src)

  t.is(src.err.constructor, res.err.constructor)
  t.not(src.err, res.err)
  t.is(src.err.message, res.err.message)
  t.is(src.err.status, res.err.status)
  res.err.status = 400
  t.not(src.err.status, res.err.status)
})
