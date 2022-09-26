import nullable from './nullable'

export default options =>
  nullable((value, formdata, callback) => {
    const { min, max, message } = options

    if (value === undefined || value === '') {
      callback(true)
      return
    }

    const val = parseFloat(value)
    if (Number.isNaN(val)) {
      // console.error(new Error(`Can not convert value '${value}' to Number, validate failed.`))
      callback(new Error(message))
    }

    if ((typeof min === 'number' && val < min) || (typeof max === 'number' && val > max)) {
      callback(new Error(message))
    } else {
      callback(true)
    }
  })
