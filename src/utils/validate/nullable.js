import required from './required'

export default fn => (value, formdata, callback) => {
  if (!required(value)) {
    console.log('null', value)
    callback(true)
    return
  }

  fn(value, formdata, callback)
}
