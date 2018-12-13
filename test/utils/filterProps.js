import test from 'ava'
import { filterProps } from '../../src/utils/objects'

const testObj = {
  a: '12345',
  b: [],
  c: {},
  d: 12345,
  e: { a: 1, b: 2 },
}

test('get props from object by keys', (t) => {
  const obj = filterProps(testObj, ['a', 'c'])
  t.deepEqual(obj, { a: '12345', c: {} })
})

test('get props from object by function', (t) => {
  const obj = filterProps(testObj, v => typeof v === 'string' || typeof v === 'number')
  t.deepEqual(obj, { a: '12345', d: 12345 })
})

