import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export const requiredMessage = (props) => {
  const type = props.type === 'array' ? 'array' : 'string'
  return substitute(getLocale(`rules.required.${type}`), props)
}

export default ({ message, tip } = {}) => () => deepMerge(
  {
    required: true,
    message: requiredMessage,
  },
  { message, tip },
  { skipUndefined: true },
)
