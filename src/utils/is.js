import { isValidElement } from 'react'
import { curry } from './func'

const nameIs = curry((name, val) => val && val.constructor && val.constructor.name === name)

// eslint-disable-next-line
export const isArray = Array.isArray
export const isUndef = v => v == null
export const isNotUndef = v => v != null
// eslint-disable-next-line
export const isNan = a => a !== a
export const isFunc = f => typeof f === 'function'
export const isNumber = n => typeof n === 'number'
export const isObject = val => val && typeof val === 'object' && !isArray(val)
export const isString = s => typeof s === 'string'
export const isDate = val => val instanceof Date
export const isError = val => val instanceof Error
export const isRegexp = val => val instanceof RegExp
export const isMap = nameIs('Map')
export const isSet = nameIs('Set')
export const isSymbol = nameIs('Symbol')
export const isPromise = p => p && (nameIs('Promise', p) || isFunc(p.then))

export const isInPath = (val, path) => {
  if (val === path) return true
  return path.indexOf(`${val}[`) === 0 || path.indexOf(`${val}.`) === 0
}

export const isEmpty = val => {
  if (val == null) return true
  if (isNan(val)) return true
  if (val.length !== undefined) return val.length === 0
  if (val instanceof Date) return false
  if (typeof val === 'object') return Object.keys(val).length === 0

  return false
}

export const isBuffer = val => {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val)
  }
  return false
}

export const isMergeable = val => {
  if (!isObject(val)) return false
  const fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer]

  for (let i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false
  }

  return true
}

export const isOne = val => {
  if (val === 1) return true
  return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1
}

// /\d{1,3}%$/
export const isPercent = n => typeof n === 'string' && /\d{1,3}%$/.test(n)
export const isInseparable = val =>
  Object(val) !== val || isFunc(val) || isDate(val) || isError(val) || isSet(val) || isMap(val) || isRegexp(val)

export const isLink = el => {
  if (!isValidElement(el)) return false
  if (!el.type) return false
  if (el.type === 'a') return true
  if (el.props && el.props.to) return true
  return false
}

export const isEnterPress = e => e.keyCode === 13

export const isMacOS = () => /macintosh|mac os x/i.test(navigator.userAgent)

export const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') > -1
