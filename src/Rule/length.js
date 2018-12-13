import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export default ({ message } = {}) => (min, max) => deepMerge(
  {
    message: (props) => {
      let limit = ''
      const { type = 'string' } = props
      min = parseFloat(min)
      max = parseFloat(max)
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        limit = 'range'
      } else if (!Number.isNaN(min)) {
        limit = 'min'
      } else if (!Number.isNaN(max)) {
        limit = 'max'
      }
      if (!limit) return ''
      return substitute(getLocale(`rules.length.${limit}.${type}`), props)
    },
  },
  { message, min, max },
  { skipUndefined: true },
)

