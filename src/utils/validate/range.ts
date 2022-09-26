import nullable from './nullable'
import { RuleProps } from './index'

export default (options: RuleProps) =>
  nullable((value: unknown, _formdata: any, callback: (x: boolean | Error) => void) => {
    const { min, max, message } = options

    if (value === undefined || value === '') {
      callback(true)
      return
    }

    const val = parseFloat(String(value))

    if (Number.isNaN(val)) {
      // console.error(new Error(`Can not convert value '${value}' to Number, validate failed.`))
      if (typeof message === 'string') {
        callback(new Error(message))
      }

      if (typeof message === 'function') {
        callback(new Error(message()))
      }
      return
    }

    if ((min !== undefined && val < min) || (max !== undefined && val > max)) {
      if (typeof message === 'string') {
        callback(new Error(message))
      }

      if (typeof message === 'function') {
        callback(new Error(message()))
      }

      return
    } else {
      callback(true)
      return
    }
  })
