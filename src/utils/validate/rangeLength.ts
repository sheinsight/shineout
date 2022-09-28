import { isEmpty } from '../is'
import { Range } from '../../Rule'
interface UnknownValue {
  length?: number
}

export default (options: Range) => (value: UnknownValue, _formdata: any, callback: Function) => {
  const { min, max, message } = options
  const error =  new Error(message)

  if (isEmpty(value)) {
    if (min) callback(error)
    else callback(true)
    return
  }

  const len = typeof value === 'number' ? String(value).length : value.length

  if (
    (len !== undefined && typeof min === 'number' && len < min) ||
    (len !== undefined && typeof max === 'number' && len > max)
  ) {
    callback(error)
  } else {
    callback(true)
  }
}
