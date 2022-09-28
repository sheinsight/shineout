import { Required } from '../../Rule'
interface UnknownValue {
  length?: number
}

type Message = Error | string | boolean

export default (options: Required) => (value: UnknownValue, _formdata: any, callback: (msg: Message) => void) => {
  const { message, required } = options
  required
  if (required === false) {
    callback(true)
    return
  }
  if (value == null || value.length === 0) {
    callback(new Error(message))
    return
  } else {
    callback(true)
  }
}
