import nullable from './nullable'
import { RuleProps } from './index'

export default (regExp: string | RegExp, options: RuleProps) =>
  nullable((value: unknown, formdata: any, callback: (is: boolean | Error) => void) => {
    const { message } = options

    const reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp
    if (reg.global) reg.lastIndex = 0
    if (typeof value === 'string' && reg.test(value)) {
      callback(true)
    } else {
      if (typeof message === 'string') {
        callback(new Error(message))
      }

      if (typeof message === 'function') {
        callback(new Error(message()))
      }

      return
    }
  })
