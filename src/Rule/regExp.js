import { deepMerge } from '../utils/objects'
import { getLocale } from '../locale'

const options = { skipUndefined: true }

export default ({ message } = {}) => (regExp, msg) => {
  if (typeof regExp !== 'string' && !(regExp instanceof RegExp)) {
    console.error(new Error(`Rule "reg" param expect a RegExp object or a string, get ${typeof regExp}`))
    return null
  }
  return deepMerge(
    { message: getLocale('rules.reg') },
    deepMerge({ message, regExp }, { message: msg }, options),
    options,
  )
}
