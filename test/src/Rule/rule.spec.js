import { Rule } from 'shineout'

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
})
