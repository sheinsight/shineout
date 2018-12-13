import test from 'ava'
import shallowEqual from '../../src/utils/shallowEqual'

// eslint-disable-next-line
const falsey = [, '', 0, false, NaN, null, undefined]

test('returns false if either argument is null', (t) => {
  t.not(shallowEqual(null, {}))
  t.not(shallowEqual({}, null))
})

test('returns true if both arguments are null or undefined', (t) => {
  t.true(shallowEqual(null, null))
  t.true(shallowEqual(undefined, undefined))
})

test('returns true if arguments are shallow equal', (t) => {
  t.true(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }))
})

test('returns false if arguments are not objects and not equal', (t) => {
  t.not(shallowEqual(1, 2))
})

test('returns false if only one argument is not an object', (t) => {
  t.not(shallowEqual(1, {}))
})

test('returns false if first argument has too many keys', (t) => {
  t.not(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }))
})

test('returns false if second argument has too many keys', (t) => {
  t.not(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }))
})

test('returns true if values are not primitives but are ===', (t) => {
  const obj = {}
  t.true(shallowEqual({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj }))
})

// subsequent test cases are copied from lodash tests
test('returns false if arguments are not shallow equal', (t) => {
  t.not(shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} }))
})

test('should ignore skip keys', (t) => {
  t.true(shallowEqual({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: 1 }, { skip: 'c' }))
  t.true(shallowEqual({ a: 1, b: 3, c: undefined }, { a: 1, b: 2, c: 1 }, { skip: ['b', 'c'] }))
})

test('should deep equal special keys', (t) => {
  t.true(shallowEqual({ a: 1, b: 2, c: [1, 2, 3] }, { a: 1, b: 2, c: [1, 2, 3] }, { deep: 'c' }))
  t.true(shallowEqual({ a: 1, b: {}, c: { a: 1, b: 2, c: 3 } }, { a: 1, b: {}, c: { a: 1, b: 2, c: 3 } }, { deep: ['b', 'c'] }))
})
