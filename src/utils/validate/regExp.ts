import nullable from './nullable'
import { RegExpParams } from '../../Rule'

export default (regExp: string | RegExp | undefined, options: RegExpParams) =>
  nullable((value: unknown, _formdata: any, callback: (is: boolean | Error) => void) => {
    const { message } = options

    const reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp
    if (!reg) {
      callback(new Error(message))
      return
    }
    if (reg.global) reg.lastIndex = 0
    if (typeof value === 'string' && reg.test(value)) {
      callback(true)
    } else {
      callback(new Error(message))
      return
    }
  })
