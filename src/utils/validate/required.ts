import { RuleProps } from './index'

interface UnknownValue {
  length?: number
}

export default (options: RuleProps) => (value: UnknownValue, formdata: any, callback: Function) => {
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
