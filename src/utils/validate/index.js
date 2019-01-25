import Datum from '../../Datum'
import { wrapFormError } from '../../utils/errors'
import { substitute } from '../strings'
import { flattenArray } from '../flat'
import range from './range'
import rangeLength from './rangeLength'
import required from './required'
import typeOf from './type'
import regTest from './regExp'

function getRule(rules, props = {}) {
  if (typeof rules === 'function') {
    if (rules.isInnerValidator) rules = rules()
    else return rules
  }
  if (typeof props === 'string') props = { type: props }

  const { type = props.type, message, regExp, func, ...other } = rules

  props = Object.assign({}, props, other)
  props.message = typeof message === 'function' ? message(props) : substitute(message, props)

  if (func) return (...args) => func(...args, props)

  if (other.required) return required(props)

  if (regExp) return regTest(regExp, props)

  if (other.min !== undefined || other.max !== undefined) {
    if (type === 'number' || type === 'integer') {
      return range(props)
    }
    return rangeLength(props)
  }

  if (type) return typeOf(type, props.message)

  const err = new Error(`Rule ${JSON.stringify(rules)} is not valid.`)
  console.error(err)
  throw err
}

const validate = (value, formdata, rules, props) =>
  new Promise((resolve, reject) => {
    const $rules = flattenArray(rules)
    const rule = $rules.shift()
    if (rule === undefined) {
      resolve(true)
      return
    } else if (!rule) {
      validate(value, formdata, $rules, props).then(resolve, reject)
      return
    }

    const callback = result => {
      if (result !== true) {
        reject(wrapFormError(result))
        return
      }

      validate(value, formdata, $rules, props).then(resolve, reject)
    }

    const fn = getRule(rule, props)
    let val = value
    if (fn === rule && (value instanceof Datum.List || value instanceof Datum.Form)) {
      val = value.getValue()
    }
    const cb = fn(val, formdata, callback)
    if (cb && cb.then) {
      cb.then(callback.bind(null, true)).catch(e => {
        reject(wrapFormError(e))
      })
    }
  })

export default validate
