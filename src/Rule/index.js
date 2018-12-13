import { deepMerge } from '../utils/objects'
import isObject from '../utils/validate/isObject'
import required from './required'
import length from './length'
import type from './type'

const mergeOptions = (opts = {}, ...args) => {
  if (!isObject(opts)) {
    console.error(`rules expect an object, got ${typeof options}`)
    return {}
  }

  if (args.length === 0) return opts
  const arg = args.shift()
  return mergeOptions(deepMerge(opts, arg), ...args)
}

export default function (...args) {
  const options = mergeOptions(...args)
  const rules = {
    required: required(options.required),
    length: length(options.length),
    type: t => type(t, options.type),
  };

  ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb'].forEach((k) => {
    rules[k] = type(k, options[k] || options.type)
  })

  const ruleKeys = Object.keys(rules)
  Object.keys(options).forEach((k) => {
    if (!ruleKeys.includes(k)) rules[k] = () => options[k]
  })

  return rules
}
