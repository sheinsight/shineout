import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export default (key, { message } = {}) => (len) => {
  if (typeof len !== 'number') {
    console.error(new Error(`Rule "${key}" param expect a number, get ${typeof len}`))
    return null
  }
  return deepMerge(
    {
      message: (props) => {
        let lt = ''
        switch (props.type) {
          case 'integer':
          case 'number':
            lt = 'number'
            break
          case 'array':
            lt = 'array'
            break
          default:
            lt = 'string'
        }

        return substitute(getLocale(`rules.length.${key}.${lt}`), props)
      },
    },
    { message, [key]: len },
    { skipUndefined: true },
  )
}
