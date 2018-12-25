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

  res = crt(splitRule('regExp("^[\\d\\s ().-]+$")')[0])
  t.deepEqual(res, { regExp: '^[\\d\\s ().-]+$', message: getLocale('rules.reg') });

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
  const res = convert(rule, 'required;min(2);max(4);regExp("^[\\d\\s ().-]+$");')
  t.deepEqual(res, [
    { required: true, message: requiredMessage },
    { min: 2, message: lengthMessage.min },
    { max: 4, message: lengthMessage.max },
    { regExp: '^[\\d\\s ().-]+$', message: getLocale('rules.reg') },
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

test('convert rule to object rule', (t) => {
  const rule = Rule()
  const customMessage = 'custom message'
  t.deepEqual(rule.required(), { required: true, message: requiredMessage })
  t.deepEqual(rule.required(customMessage), { required: true, message: customMessage })

  t.deepEqual(rule.min(1), { min: 1, message: lengthMessage.min })
  t.deepEqual(rule.min(1, customMessage), { min: 1, message: customMessage })

  t.deepEqual(rule.max(10), { max: 10, message: lengthMessage.max })
  t.deepEqual(rule.max(10, customMessage), { max: 10, message: customMessage })

  t.deepEqual(rule.length(1, 10), [{ min: 1, message: lengthMessage.min }, { max: 10, message: lengthMessage.max }])
  t.deepEqual(rule.length(1, 10, customMessage), [{ min: 1, message: customMessage }, { max: 10, message: customMessage }]);

  (['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']).forEach((type) => {
    t.deepEqual(rule[type](), { type, message: typeMessage })
    t.deepEqual(rule[type](customMessage), { type, message: customMessage })
  })
})

test('should equal function and string', (t) => {
  const rule = Rule()
  t.deepEqual(rule.required(), convert(rule, 'required')[0])
  t.deepEqual(rule.min(1), convert(rule, 'min(1)')[0])
  t.deepEqual(rule.max(10), convert(rule, 'max(10)')[0])
  t.deepEqual(rule.length(1, 10), convert(rule, 'length(1, 10)')[0])
  t.deepEqual(rule.regExp('^[\\d\\s ().-]+$'), convert(rule, 'regExp("^[\\d\\s ().-]+$")')[0])
})
