import required from './required'

export default fn => (value, formdata, callback) => {
  if (value == null || value.length === 0) {
    callback(true)
    return
  }

  fn(value, formdata, callback)
}
