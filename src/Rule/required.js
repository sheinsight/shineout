import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export default ({ message, tip } = {}) => () => deepMerge(
  {
    required: true,
    message: (props) => {
      const type = props.type === 'array' ? 'array' : 'string'
      return substitute(getLocale(`rules.required.${type}`), props)
    },
  },
  { message, tip },
  { skipUndefined: true },
)
