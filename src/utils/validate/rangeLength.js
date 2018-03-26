import isEmpty from './isEmpty'

export default options => (value, formdata, callback) => {
  const { min, max, message } = options
  const error = new Error(message)

  if (isEmpty(value)) {
    if (min) callback(error)
    else callback(true)
    return
  }

  const len = value.length
  if ((typeof min === 'number' && len < min) || (typeof max === 'number' && len > max)) {
    callback(error)
  } else {
    callback(true)
  }
}

