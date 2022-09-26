interface UnknownValue {
  length?: number
}

type Nullable = (fn: Function) => (value: UnknownValue | null, formdata: any, callback: (is: boolean) => void) => void

const nullable: Nullable = fn => (value, formdata, callback) => {
  if (value == null || value.length === 0) {
    callback(true)
    return
  }

  fn(value, formdata, callback)
}

export default nullable
