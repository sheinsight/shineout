import test from 'ava'
import validate from '../../src/utils/validate'
import { repeat, createCases } from '../utils'

const testData = {
  password: '123456',
}

const invalid = (...args) => new Promise((resolve, reject) => {
  validate(...args).then(() => {
    reject(new Error('result should be Error'))
  }).catch(e => resolve(e.message))
})

const createTests = (t, cases, message, rule, type) => {
  const tests = []
  const { pass, fail } = cases
  tests.push(createCases(t, pass.map(c => validate(c, testData, rule, type)), repeat(pass.length, true)))
  tests.push(createCases(t, fail.map(c => invalid(c, testData, rule, type)), repeat(fail.length, message)))
  return tests
}

const pass = async (tests) => {
  const results = await Promise.all(tests)
  return results.find(r => r !== true) === undefined
}

const createTypeTests = (t, cases, type) => {
  const message = `type ${type} is not valid.`
  const rule = [{ type, message }]
  return createTests(t, cases, message, rule, type)
}

test('validate required', async (t) => {
  const cases = {
    pass: [0, 'string', ' ', {}, [1], false, NaN, new Date()],
    fail: [undefined, null, [], ''],
  }
  const message = 'value is required'
  const tests = createTests(t, cases, message, [{ required: true, message }])
  t.true(await pass(tests))
})

const lengthRule = [{ min: 1, max: 4, message: 'must between {min} and {max}' }]
const lengthMessage = 'must between 1 and 4'

test('validate number length', async (t) => {
  const cases = {
    pass: [1, 2, 3, 4, '2', '3', 1.1],
    fail: [NaN, 0, 5, '0', '5', 0.9],
  }

  t.true(await pass(createTests(t, cases, lengthMessage, lengthRule, 'number')))
})

test('validate array length', async (t) => {
  const cases = {
    pass: [[1], [1, 2], ['', 2, 3, 4]],
    fail: [[], [1, 2, 3, 4, 5]],
  }

  t.true(await pass(createTests(t, cases, lengthMessage, lengthRule, 'array')))
})

test('validate string length', async (t) => {
  const cases = {
    pass: ['1', '12', '1234'],
    fail: ['', '12345'],
  }

  t.true(await pass(createTests(t, cases, lengthMessage, lengthRule, 'string')))
})

test('validate email type', async (t) => {
  const cases = {
    pass: ['test@123.com'],
    fail: [undefined, '', 'test@123', '@123.com'],
  }

  t.true(await pass(createTypeTests(t, cases, 'email')))
})

test('validate number type', async (t) => {
  const cases = {
    pass: [0, 12, 1.2, '12', '1.2', -12, '-12'],
    fail: ['a', '', NaN],
  }

  t.true(await pass(createTypeTests(t, cases, 'number')))
})

test('validate url type', async (t) => {
  const cases = {
    pass: [
      'http://google.com', 'google.com', 'https://google.com', 'http://google.com:3003/',
      'ftp://google.com', 'http://192.168.11.1/', 'http://192.168.11.1:3000/',
    ],
    fail: ['', null, undefined, 'google', 'google:3000', 'http://', 'http//google.com', 'http:/google.com', '/path/name'],
  }

  t.true(await pass(createTypeTests(t, cases, 'url')))
})

test('validate json type', async (t) => {
  const cases = {
    pass: ['{"a":1}', '{}', '[]', '[1, 2, "3"]', '{"a":1,"b":[1,"2"]}'],
    fail: ['a', '', '{a}', 'a:{}'],
  }

  t.true(await pass(createTypeTests(t, cases, 'json')))
})

test('validate color type', async (t) => {
  const hexCases = {
    pass: ['#aabbcc', '#FF0000'],
    fail: ['#abc', 'aabbcc', 'rgba(0,0,0,0.1)'],
  }
  t.true(await pass(createTypeTests(t, hexCases, 'hex')))

  const rgbCases = {
    pass: ['rgb(0, 0, 0)', 'rgb(255,255,255)'],
    fail: ['', 'rgba(0,0,0,0.1)', 'rgb(0)'],
  }
  t.true(await pass(createTypeTests(t, rgbCases, 'rgb')))

  const rgbaCases = {
    pass: ['rgba(0, 0, 0, 0.1)', 'rgba(255,255,255,0)'],
    fail: ['', 'rgb(0,0,0,0.1)', 'rgba(0, 0, 0)'],
  }
  t.true(await pass(createTypeTests(t, rgbaCases, 'rgba')))
})

test('validate reg', async (t) => {
  const cases = {
    pass: ['a1234', '123a1', undefined],
    fail: ['12345', ''],
  }
  const message = 'at least has one letter'
  t.true(await pass(createTests(t, cases, message, [{ regExp: /[a-z]+/i, message }])))
})

test('validate function', async (t) => {
  const cases = {
    pass: ['123456'],
    fail: ['12345', ''],
  }
  const message = 'must same as password'
  const rule = (value, fd) => new Promise((resolve, reject) => {
    if (value === fd.password) resolve(true)
    else reject(new Error(message))
  })
  t.true(await pass(createTests(t, cases, message, [rule])))
})
