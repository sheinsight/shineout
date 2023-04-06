import nullable from './nullable'

export default (regExp: string | RegExp | undefined, options: {message: string}) =>
  nullable((value: unknown, _formdata: any, callback: (x: boolean | Error) => void) => {
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
