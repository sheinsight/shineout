import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export const typeMessage = (props) => {
  const path = props.title ? 'rules.type' : 'rules.reg'
  return substitute(getLocale(path), props)
}

const options = { skipUndefined: true }

export default (type, { message, tip } = {}) => msg => deepMerge(
  {
    type,
    message: typeMessage,
  },
  deepMerge({ message, tip }, { message: msg }, options),
  options,
)
