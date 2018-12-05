export const shallowClone = obj => Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)

export const objectValues = (obj) => {
  if (!obj) return []
  return Object.keys(obj).map(k => obj[k])
}
