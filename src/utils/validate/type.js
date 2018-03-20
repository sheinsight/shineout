import nullable from './nullable'

/* eslint-disable */
const regs = {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
}
/* eslint-enable */

export default (type, message) => nullable((value, formdata, callback) => {
  const reg = regs[type]
  if (!reg) {
    console.error(`Type '${type}' not existed.`)
    callback(new Error(`Validate failured. Type '${type}' not existed.`))
  }

  if (reg.test(value)) {
    callback(true)
  } else {
    callback(new Error(message))
  }
})

