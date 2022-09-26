export interface UnknownValue {
  length?: number
}

export default (fn: (...args: unknown[]) => void) => (
  value: UnknownValue,
  formdata: any,
  callback: (...args: any) => void
) => {
  if (value == null || value.length === 0) {
    callback(true)
    return
  }

  fn(value, formdata, callback)
}
