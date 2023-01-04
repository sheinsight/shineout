import { Rule } from 'shineout'
import validate from 'shineout/utils/validate'

const innerType = ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']
describe('Rule', () => {
  test('should have inner validate', () => {
    const rule = Rule()
    const types = [...innerType, 'required', 'max', 'min', 'regExp', 'type', 'length', 'range']
    types.forEach(type => {
      expect(rule[type] instanceof Function).toBeTruthy()
    })
  })
  test('should combine same keys', () => {
    const funcs = {
      customRequired: {
        func: (value, formData, callback, props) => {
          callback(value ? true : new Error(`${props.title} is required.`))
        },
      },
    }
    const messages = {
      customRequired: {
        message: 'The field is required.',
      },
    }
    const rule = Rule(funcs, messages)
    const required = rule.customRequired()
    expect(required.message).toBe('The field is required.')
    expect(required.func instanceof Function).toBeTruthy()
  })
  test('should support custom validate', () => {
    const validateFn = (value, formData, callback, props) => {
      if (formData.list.includes(value)) {
        callback(new Error(props.message.replace('{title}', props.title)))
      } else {
        callback(true)
      }
    }
    const rule = Rule({
      isExisted: {
        func: validateFn,
        message: '{title} is existed.',
      },
    })
    expect(rule.isExisted().func).toBe(validateFn)
    expect(rule.isExisted().message).toBe('{title} is existed.')
  })
  test('should options be object', () => {
    console.error = jest.fn()
    Rule('test')
    expect(console.error.mock.calls[0][0].message).toBe('rules expect an object, got string')
  })
  test('should rule item be a  function or object', () => {
    console.error = jest.fn()
    Rule({ test: 'test' })
    expect(console.error.mock.calls[0][0].message).toBe('Rule test is invalid, expect a function or an object.')
  })
  test('should support function rule', () => {
    const validateFn = (value, formData, callback, props) => {
      if (formData.list.includes(value)) {
        callback(new Error(props.message.replace('{title}', props.title)))
      } else {
        callback(true)
      }
    }
    const rule = Rule({
      isExisted: validateFn,
    })
    expect(rule.isExisted().func).toBe(validateFn)
  })
})

describe('test type', () => {
  // const types = ['email', 'json', 'url', 'hex', 'number']
  test('should check email', async () => {
    jest.useRealTimers()
    const rule = Rule()
    try {
      await validate('1234', {}, [rule.type('email')()], { title: 'email' })
    } catch (e) {
      expect(e.message).toBe('Please enter a valid email')
    }
    const b = await validate('123@aa.com', {}, [rule.type('email')()], { title: 'email' })
    expect(b).toBeTruthy()
  })
  test('should check integer', async () => {
    jest.useRealTimers()
    const rule = Rule()
    try {
      await validate('123.111', {}, [rule.type('integer')('you are wrong')])
    } catch (e) {
      expect(e.message).toBe('you are wrong')
    }
    const b = await validate('123', {}, [rule.type('integer')()], { title: 'integer' })
    expect(b).toBeTruthy()
  })
  test('should check number', async () => {
    jest.useRealTimers()
    const rule = Rule()
    try {
      await validate('aaa', {}, [rule.type('number')('you are wrong')])
    } catch (e) {
      expect(e.message).toBe('you are wrong')
    }
    const b = await validate('123.1', {}, [rule.type('number')()], {})
    expect(b).toBeTruthy()
  })
  test('should check url', async () => {
    jest.useRealTimers()
    const rule = Rule()
    try {
      await validate('1234', {}, [rule.type('url')('you are wrong')])
    } catch (e) {
      expect(e.message).toBe('you are wrong')
    }
    const b = await validate('http://www.baidu.com', {}, [rule.type('url')()], {})
    expect(b).toBeTruthy()
  })
  test('should check json', async () => {
    jest.useRealTimers()
    const rule = Rule()
    try {
      await validate('{a}', {}, [rule.type('json')('you are wrong')], { title: 'json' })
    } catch (e) {
      expect(e.message).toBe('you are wrong')
    }
    const b = await validate('{"a": 123}', {}, [rule.type('json')()], {})
    expect(b).toBeTruthy()
  })
  test('should check json', async () => {
    jest.useRealTimers()
    const rule = Rule()
    try {
      await validate('{a}', {}, [rule.type('json')('you are wrong')], { title: 'json' })
    } catch (e) {
      expect(e.message).toBe('you are wrong')
    }
    const b = await validate('{"a": 123}', {}, [rule.type('json')()], {})
    expect(b).toBeTruthy()
  })
})

describe('test range', () => {
  const rule = Rule()
  it('should range', async () => {
    jest.useRealTimers()
    const range = rule.range(1, 100, 'Nubmer must between 1 - 100.')
    expect(range[0].min).toBe(1)
    expect(range[0].message).toBe('Nubmer must between 1 - 100.')
    expect(range[1].max).toBe(100)
    expect(range[1].message).toBe('Nubmer must between 1 - 100.')
  })
  it('range type number', async () => {
    try {
      await validate(3, {}, [rule.range(1, 2)], { type: 'number' })
    } catch (e) {
      expect(e.message).toBe(' must less than 2')
    }
    try {
      await validate(0, {}, [rule.range(1, 2)], { type: 'number' })
    } catch (e) {
      expect(e.message).toBe(' must greater than 1')
    }
  })
  it('range type array', async () => {
    try {
      await validate([], {}, [rule.range(1, 2)], { type: 'array' })
    } catch (e) {
      expect(e.message).toBe(' must select at least 1 choices')
    }
    try {
      await validate([1, 2, 3], {}, [rule.range(1, 2)], { type: 'array' })
    } catch (e) {
      expect(e.message).toBe(' must select less than 2 choices')
    }
  })

  it('range type string', async () => {
    try {
      await validate('', {}, [rule.range(1, 2)], { type: 'string' })
    } catch (e) {
      expect(e.message).toBe(' must be at least 1 characters')
    }
    try {
      await validate('234', {}, [rule.range(1, 2)], { type: 'string' })
    } catch (e) {
      expect(e.message).toBe(' must less than 2 choices')
    }
  })

  it('length is same as range', async () => {
    try {
      await validate('', {}, [rule.length(1, 2)], { type: 'string' })
    } catch (e) {
      expect(e.message).toBe(' must be at least 1 characters')
    }
    try {
      await validate('234', {}, [rule.length(1, 2)], { type: 'string' })
    } catch (e) {
      expect(e.message).toBe(' must less than 2 choices')
    }
  })
})

describe('test regExp', () => {
  const rule = Rule()
  it('should regExp params valid', () => {
    console.error = jest.fn()
    rule.regExp({})
    expect(console.error.mock.calls[0][0].message).toBe(
      'Rule "reg" param expect a RegExp object or a string, get object'
    )
  })
  it('should ues reg test', () => {
    const regRule = rule.regExp('^[\\d\\s ().-]+$', '格式错误')
    expect(regRule.message).toBe('格式错误')
    expect(regRule.regExp).toBe('^[\\d\\s ().-]+$')
  })
})

describe('test required', () => {
  const rule = Rule()
  test('should type array', async () => {
    jest.useRealTimers()
    try {
      await validate([], {}, [rule.required()], { title: 'hello', type: 'array' })
    } catch (e) {
      expect(e.message).toBe('Please select hello')
    }
    const b = validate([1], {}, [rule.required()], { title: 'hello' })
    expect(b).toBeTruthy()
  })
  test('should type string', async () => {
    jest.useRealTimers()
    try {
      await validate('', {}, [rule.required()], { title: 'hello' })
    } catch (e) {
      expect(e.message).toBe('Please enter hello')
    }
    const b = validate('123', {}, [rule.required()], { title: 'hello' })
    expect(b).toBeTruthy()
  })
})
