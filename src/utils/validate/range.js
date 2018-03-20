import nullable from './nullable'

export default options => nullable((value, formdata, callback) => {
  const { min, max, message } = options

  const val = parseFloat(value)
  if ((typeof min === 'number' && val < min) || (typeof max === 'number' && val > max)) {
    callback(new Error(message))
  } else {
    callback(true)
  }
})

