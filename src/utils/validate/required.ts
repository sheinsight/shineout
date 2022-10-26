export default (options: {message: string, required: boolean}) => (value: any, _formdata: any, callback: (msg: true | Error) => void) => {
  const { message, required } = options
  if (required === false) {
    callback(true)
    return
  }
  if (value == null || value.length === 0) {
    callback(new Error(message))
    return
  } else {
    callback(true)
  }
}
