import isObject from './validate/isObject'
import { insertPoint, flatten, unflatten } from './flat'

export const shallowClone = obj => Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)

export const objectValues = (obj) => {
  if (!obj) return []
  return Object.keys(obj).map(k => obj[k])
}

export const isMergeable = (target) => {
  if (!isObject(target)) return false
  return !(target instanceof Date || target instanceof Error || target instanceof RegExp)
}

export const deepMerge = (target = {}, source = {}, clone) => {
  if (!isMergeable(source)) return source

  const dest = {}
  if (isMergeable(target)) {
    Object.keys(target).forEach((k) => {
      // dest[k] = clone ? deepMerge({}, target[k], clone) : target[k]
      dest[k] = deepMerge({}, target[k], clone)
    })
  }

  Object.keys(source).forEach((k) => {
    if (isMergeable(source[k]) && isMergeable(target[k])) {
      dest[k] = deepMerge(target[k], source[k], clone)
    } else {
      dest[k] = deepMerge({}, source[k], clone)
    }
  })

  return dest
}

export const deepSet = (obj, path, value, merge) => {
  if (!isObject(obj) || !path || typeof path !== 'string') return obj

  // change a[0] to a.[0]
  path = insertPoint(path)
}

export const deepGet = () => {

}
