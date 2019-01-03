import { curry } from './func'

// eslint-disable-next-line
export const isArray = Array.isArray

export const isObject = val => val && typeof val === 'object' && !isArray(val)

export const isDate = val => val instanceof Date

export const isError = val => val instanceof Error

export const isRegexp = val => val instanceof RegExp

const nameIs = curry((name, val) => val && val.constructor && val.constructor.name === name)

export const isMap = nameIs('Map')

export const isSet = nameIs('Set')

export const isSymbol = nameIs('Symbol')

export const isPromise = nameIs('Promise')

export const isInPath = (val, path) => {
  if (val === path) return true
  return path.indexOf(`${val}[`) === 0 || path.indexOf(`${val}.`) === 0
}

export const isEmpty = (val) => {
  if (val === null || val === undefined) return true
  // NaN
  // eslint-disable-next-line
  if (val !== val) return true
  if (val.length !== undefined) return val.length === 0
  if (val instanceof Date) return false
  if (typeof val === 'object') return Object.keys(val).length === 0

  return false
}

export const isBuffer = (val) => {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val)
  }
  return false
}

export const isMergeable = (val) => {
  if (!isObject(val)) return false
  const fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer]

  for (let i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false
  }

  return true
}

export const isOne = (val) => {
  if (val === 1) return true
  return typeof n === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1
}

export const isPercent = n => typeof n === 'string' && n.indexOf('%') !== -1
