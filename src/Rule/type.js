import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export default (type, { message, tip } = {}) => () => deepMerge(
  {
    type,
    message: (props) => {
      const path = props.title ? 'rules.type' : 'rules.reg'
      return substitute(getLocale(path), props)
    },
  },
  { message, tip },
  { skipUndefined: true },
)
