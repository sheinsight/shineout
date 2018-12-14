import { deepMerge } from '../utils/objects'
import { getLocale } from '../locale'

export default ({ message } = {}) => (regExp) => {
  if (typeof regExp !== 'string' && !(regExp instanceof RegExp)) {
    console.error(new Error(`Rule "reg" param expect a RegExp object or a string, get ${typeof regExp}`))
    return null
  }
  return deepMerge(
    { message: getLocale('rules.reg') },
    { message, regExp },
    { skipUndefined: true },
  )
}
