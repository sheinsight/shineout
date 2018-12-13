import isObject from '../utils/validate/isObject'
import { deepMerge } from '../utils/objects'
import required from './required'

export default function (rules = {}) {
  const innerRules = {
    required,
  }

  if (!isObject(rules)) {
    console.error(`rules expect an object, got ${typeof rules}`)
    return innerRules
  }

  return deepMerge(innerRules, rules)
}
