import { substitute } from '../strings'
import range from './range'
import rangeLength from './rangeLength'
import required from './required'
import typeOf from './type'
import regTest from './regExp'

function getRule(rules, inputType) {
  if (typeof rules === 'function') return rules

  const {
    type = inputType, message, regExp, ...other
  } = rules
  other.message = substitute(message, other)

  if (type === 'required') return required(other)

  if (regExp) return regTest(regExp, other)

  if (other.min !== undefined || other.max !== undefined) {
    if (type === 'number' || type === 'integer') {
      return range(other)
    }
    return rangeLength(other)
  }

  return typeOf(type, other.message)
}

const validate = (value, formdata, rules, type) => new Promise((resolve, reject) => {
  const rule = rules.shift()
  if (rule) {
    getRule(rule, type)(value, formdata, (result) => {
      if (result !== true) {
        reject(result)
        return
      }

      validate(value, formdata, rules, type).then(resolve, reject)
    })
  } else {
    resolve(true)
  }
})

export default validate

