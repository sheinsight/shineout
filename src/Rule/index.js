import { deepMerge, objectValues } from '../utils/objects'
import { isObject } from '../utils/is'
import required from './required'
import length from './length'
import type from './type'
import regExp from './regExp'

export const RULE_TYPE = 'RULE_OBJECT'
const innerType = ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']

const mergeOptions = (opts = {}, ...args) => {
  if (!isObject(opts)) {
    console.error(new Error(`rules expect an object, got ${typeof options}`))
    return {}
  }

  if (args.length === 0) return opts
  const arg = args.shift()
  Object.keys(arg).forEach((k) => {
    if (typeof arg[k] === 'function') arg[k] = { func: arg[k] }
  })
  return mergeOptions(deepMerge(opts, arg), ...args)
}

export default function (...opts) {
  const options = mergeOptions({}, ...opts)
  const rules = {
    required: required(options.required),
    max: length('max', options.max),
    min: length('min', options.min),
    regExp: regExp(options.regExp),
    type: t => type(t, options.type),
  }

  rules.length = (min, max, msg) => [rules.min(min, msg), rules.max(max, msg)]
  rules.range = (min, max, msg) => [rules.min(min, msg), rules.max(max, msg)]

  innerType.forEach((k) => {
    rules[k] = type(k, options[k] || options.type)
  })

  const ruleKeys = Object.keys(rules)
  Object.keys(options).forEach((k) => {
    if (!ruleKeys.includes(k)) {
      if (isObject(options[k])) {
        rules[k] = args => Object.assign({}, options[k], { args })
      } else {
        console.error(new Error(`Rule ${k} is invalid, expect a function or an object.`))
      }
    }
  })

  objectValues(rules).forEach((rule) => { rule.isInnerValidator = true })

  rules.$$type = RULE_TYPE
  return rules
}
