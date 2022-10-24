import { Required } from '../../Rule'

type Message = Error | string | boolean

export default (options: Required) => (value: any, _formdata: any, callback: (msg: Message) => void) => {
  const { message, required } = options
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
