import { isEmpty } from '../is'

export default (options: {min?: number, max?: number, message: string}) => (value: any, _formdata: object, callback: (x: boolean | Error) => void) => {
  const { min, max, message } = options
  const error = new Error(message)

  if (isEmpty(value)) {
    if (min) callback(error)
    else callback(true)
    return
  }

  const len = typeof value === 'number' ? value.toString().length : value.length

  if (
    (len !== undefined && typeof min === 'number' && len < min) ||
    (len !== undefined && typeof max === 'number' && len > max)
  ) {
    callback(error)
  } else {
    callback(true)
  }
}
