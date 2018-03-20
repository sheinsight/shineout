import nullable from './nullable'

export default options => nullable((value, formdata, callback) => {
  const { min, max, message } = options
  const len = value.length

  if ((typeof min === 'number' && len < min) || (typeof max === 'number' && len > max)) {
    callback(new Error(message))
  } else {
    callback(true)
  }
})

