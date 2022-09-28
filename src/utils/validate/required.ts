import { RuleProps } from './index'

interface UnknownValue {
  length?: number
}

type Message = Error | string | boolean

export default (options: RuleProps) => (value: UnknownValue, _formdata: any, callback: (msg: Message) => void) => {
  const { message, required } = options
  if (required === false) {
    callback(true)
    return
  }
  if (value == null || value.length === 0) {
    if (typeof message === 'string') {
      callback(new Error(message))
    }

    if (typeof message === 'function') {
      callback(new Error(message()))
    }
    return
  } else {
    callback(true)
  }
}
