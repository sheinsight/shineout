import { deepMerge } from '../utils/objects'
import { getLocale } from '../locale'

export default (type, { message, tip } = {}) => () => deepMerge(
  {
    type,
    message: getLocale('rules.type'),
  },
  { message, tip },
  { skipUndefined: true },
)
