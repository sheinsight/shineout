import test from 'ava'
import validate from '../../src/utils/validate'

const testData = {
  email: 'test@123.com',
  password: 'Pas123456',
}

const rules = {
  required: [{
    required: true,
    message: 'value is required',
  }],
  length: [{
    min: 1,
    max: 4,
    message: 'must between {min} and {max}',
  }],
}

const invalid = (...args) => new Promise((resolve, reject) => {
  validate(...args).then(() => {
    reject(new Error('result should be Error'))
  }).catch(e => resolve(e.message))
})

test('validate required', async (t) => {
  t.true(await validate(0, testData, rules.required))
  t.true(await validate('string', testData, rules.required))
  t.true(await validate(' ', testData, rules.required))
  t.true(await validate({}, testData, rules.required))
  t.true(await validate([1], testData, rules.required))
  t.true(await validate(false, testData, rules.required))
  t.true(await validate(NaN, testData, rules.required))
  t.true(await validate(new Date(), testData, rules.required))

  t.is(await invalid(undefined, testData, rules.required), 'value is required')
  t.is(await invalid(null, testData, rules.required), 'value is required')
  t.is(await invalid([], testData, rules.required), 'value is required')
  t.is(await invalid('', testData, rules.required), 'value is required')
})

test('min & max', async (t) => {
  const message = 'must between 1 and 4'

  const result = await Promise.all([1, 2, 3, 4, '2', '3'].map(i => validate(i, testData, rules.length, 'number')))
  t.deepEqual(result, [true, true, true, true, true, true])

  t.is(await invalid(NaN, testData, rules.length, 'number'), message)
  t.is(await invalid(0, testData, rules.length, 'number'), message)
  t.is(await invalid(5, testData, rules.length, 'number'), message)
  t.is(await invalid('0', testData, rules.length, 'number'), message)
  t.is(await invalid('5', testData, rules.length, 'number'), message)


  t.true(await validate([1], testData, rules.length, 'array'))
  t.true(await validate([1, 2], testData, rules.length, 'array'))
  t.true(await validate(['', 2], testData, rules.length, 'array'))

  t.is(await invalid([], testData, rules.length, 'array'), message)
  t.is(await invalid([1, 2, 3, 4, 5], testData, rules.length, 'array'), message)

  t.true(await validate('1', testData, rules.length, 'string'))
  t.true(await validate('12', testData, rules.length, 'string'))
  t.true(await validate('1234', testData, rules.length, 'string'))
  t.is(await invalid('', testData, rules.length, 'string'), message)
  t.is(await invalid('12345', testData, rules.length, 'string'), message)
})
