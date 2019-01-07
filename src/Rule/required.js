import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

const options = { skipUndefined: true }

export const requiredMessage = (props) => {
  const type = props.type === 'array' ? 'array' : 'string'
  return substitute(getLocale(`rules.required.${type}`), props)
}

export default ({ message, tip } = {}) => msg => deepMerge(
  {
    required: true,
    message: requiredMessage,
  },
  deepMerge({ message, tip }, { message: msg }, options),
  options,
)
