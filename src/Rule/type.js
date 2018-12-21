import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'

export const typeMessage = (props) => {
  const path = props.title ? 'rules.type' : 'rules.reg'
  return substitute(getLocale(path), props)
}

export default (type, { message, tip } = {}) => () => deepMerge(
  {
    type,
    message: typeMessage,
  },
  { message, tip },
  { skipUndefined: true },
)
