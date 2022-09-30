export default (fn: (...args: unknown[]) => void) => (
  value: any,
  formdata: object,
  callback: (...args: (boolean | Error)[]) => void
) => {
  if (value == null || value.length === 0) {
    callback(true)
    return
  }

  fn(value, formdata, callback)
}
