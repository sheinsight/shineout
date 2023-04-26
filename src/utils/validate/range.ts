import nullable from './nullable'

export default (options: { min?: number; max?: number; message: string }) =>
  nullable((value: unknown, _formdata: any, callback: (x: boolean | Error) => void) => {
    const { min, max, message } = options

    if (value === undefined || value === '') {
      callback(true)
      return
    }

    const val = parseFloat(String(value))

    if (Number.isNaN(val)) {
      // console.error(new Error(`Can not convert value '${value}' to Number, validate failed.`))
      callback(new Error(message))
      return
    }

    if ((typeof min === 'number' && val < min) || (typeof max === 'number' && val > max)) {
      callback(new Error(message))
    } else {
      callback(true)
    }
  })
