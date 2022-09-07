export default options => (value, formdata, callback) => {
  const { message, required } = options
  if (required === false) {
    callback(true)
    return
  }
  if (value == null || value.length === 0) {
    callback(new Error(message))
  } else {
    callback(true)
  }
}
