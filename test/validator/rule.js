import test from 'ava'
import { getLocale } from '../../src/locale'
import Rule from '../../src/Rule'
import { requiredMessage } from '../../src/Rule/required'
import { lengthMessage } from '../../src/Rule/length'
import { typeMessage } from '../../src/Rule/type'
import convert, { splitRule, convertRule } from '../../src/Rule/convert'

test('split rule string to array', (t) => {
  const str = 'required;empty();min(2);length(1,4);reg("abcdefg");'
  const res = splitRule(str)
  t.deepEqual(res, [
    ['required'],
    ['empty'],
    ['min', 2],
    ['length', 1, 4],
    ['reg', 'abcdefg'],
  ])

  t.deepEqual(splitRule('required;'), [['required']])
  t.deepEqual(splitRule('max(10)'), [['max', 10]])
})

test('should ignore space', (t) => {
  const str = 'required ; empty( ) ; min( 2) ; length(1 ,4 ); reg( "abcdefg") ;'
  const res = splitRule(str)
  t.deepEqual(res, [
    ['required'],
    ['empty'],
    ['min', 2],
    ['length', 1, 4],
    ['reg', 'abcdefg'],
  ])
})

test('escape quote', (t) => {
  t.deepEqual(splitRule('say("hello \'world\'")'), [['say', 'hello \'world\'']])
  t.deepEqual(splitRule('say ("hello \\"world\\"")'), [['say', 'hello "world"']])
})

test('convert single rule', (t) => {
  const rule = Rule()
  const crt = convertRule(rule)
  let res = crt(splitRule('required;')[0])
  t.deepEqual(res, { required: true, message: requiredMessage })

  res = crt(splitRule('min(1)')[0])
  t.deepEqual(res, { min: 1, message: lengthMessage.min })

  res = crt(splitRule('max(10)')[0])
  t.deepEqual(res, { max: 10, message: lengthMessage.max })

  res = crt(splitRule('length(1, 20)')[0])
  t.deepEqual(res, [{ min: 1, message: lengthMessage.min }, { max: 20, message: lengthMessage.max }])

  res = crt(splitRule('regExp("abcdefg")')[0])
  t.deepEqual(res, { regExp: 'abcdefg', message: getLocale('rules.reg') });

  // type
  (['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']).forEach((type) => {
    t.deepEqual(crt(splitRule(type)), { type, message: typeMessage })
  })
})

test('custom rule message', (t) => {
  const message = {
    required: { message: 'is required ....' },
    min: { message: () => 'min message' },
    max: { message: 'max message' },
  }
  const rule = Rule(message)
  const crt = convertRule(rule)

  t.deepEqual(crt(splitRule('required')[0]), { required: true, message: message.required.message })
  t.deepEqual(crt(splitRule('min(1)')[0]), { min: 1, message: message.min.message })
  t.deepEqual(crt(splitRule('max(10)')[0]), { max: 10, message: message.max.message })
  t.deepEqual(crt(splitRule('length(1,10)')[0]), [{ min: 1, message: message.min.message }, { max: 10, message: message.max.message }])
})

const invalid = (rule, t) => (str, message) => new Promise((resolve) => {
  convertRule(rule, splitRule(str)[0])
  resolve(true)
}).then((res) => {
  console.log(res)
  t.fail('promise should failed.')
}).catch((e) => {
  t.true(e.message === message)
})

test('rule invalid or not existed.', async (t) => {
  const rule = Rule()
  const invalidFunc = invalid(rule, t)
  invalidFunc('min(', '"min(" is not a valid rule.')
  invalidFunc('notExist', 'Method "notExist" is not existed.')
  invalidFunc('notExist()', 'Method "notExist" is not existed.')
  invalidFunc('max)', 'Method "max)" is not existed.')
  invalidFunc('min(ss,1)', 'Rule argument expect a number or a string. Do you missing the quotes of "ss"?')
})

test('convert full list of rule.', async (t) => {
  const rule = Rule()
  const res = convert(rule, 'required;min(2);max(4);regExp("abcdefg");')
  t.deepEqual(res, [
    { required: true, message: requiredMessage },
    { min: 2, message: lengthMessage.min },
    { max: 4, message: lengthMessage.max },
    { regExp: 'abcdefg', message: getLocale('rules.reg') },
  ])
})

test('should throw error when convert full list of rule not exist.', async (t) => {
  const rule = Rule()
  const str = 'reg("abcdefg");'
  new Promise((resolve) => {
    convert(rule, str)
    resolve(true)
  }).then(() => {
    t.fail('promise should failed.')
  }).catch((e) => {
    t.true(e.message === `Conver string "${str}" to rules failed. Method "reg" is not existed.`)
  })
})

