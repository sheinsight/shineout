import nullable from './nullable'

export default (regExp, options) =>
  nullable((value, formdata, callback) => {
    const { message } = options

    const reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp
    if (reg.global) reg.lastIndex = 0
    if (reg.test(value)) {
      callback(true)
    } else {
      callback(new Error(message))
    }
  })
