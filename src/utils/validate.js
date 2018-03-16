export function isEmpty(obj) {
  if (obj === null || obj === undefined) return true
  // NaN
  // eslint-disable-next-line
  if (obj !== obj) return true
  if (obj.length !== undefined) return obj.length === 0
  if (obj instanceof Date) return false
  if (typeof obj === 'object') return Object.keys(obj).length === 0

  return false
}

export default (value, options = {}) => new Promise((resolve, reject) => {
  const { required } = options
  if (required && (value === undefined || value === null || value.length === 0)) {
    return reject(new Error('不能为空'))
  }

  return resolve(true)
})
