import isEmpty from '../../utils/isEmpty'

export default fn => (value, formdata, callback) => {
  if (isEmpty(value)) {
    callback(true)
    return
  }

  fn(value, formdata, callback)
}
