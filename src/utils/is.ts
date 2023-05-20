import React from 'react'
import { curry } from './func'

const nameIs = curry((name: unknown, val: unknown) => {
  if (typeof val === 'object') {
    return val && val.constructor && val.constructor.name === name
  }
  return false
})
// eslint-disable-next-line
export const isArray = Array.isArray
export const isUndef = (v: unknown): boolean => v == null
export const isNotUndef = (v: unknown): boolean => v != null
// eslint-disable-next-line
export const isNan = (a: unknown): boolean => a !== a
export const isFunc = (f: unknown): f is Function => typeof f === 'function'
export const isNumber = (n: unknown): n is number => typeof n === 'number'
export const isObject = (val: unknown): val is Object => !!val && typeof val === 'object' && !isArray(val)
export const isString = (s: unknown): s is string => typeof s === 'string'
export const isDate = (val: unknown): boolean => val instanceof Date
export const isError = (val: unknown): boolean => val instanceof Error
export const isRegexp = (val: unknown): boolean => val instanceof RegExp
export const isMap = nameIs('Map')
export const isSet = nameIs('Set')
export const isSymbol = nameIs('Symbol')
export const isPromise = (p: unknown): p is Promise<any> =>
  p && (nameIs('Promise', p) || isFunc((p as Promise<unknown>).then))

export const isValidKey = (key: string | number | symbol, object: object): key is keyof typeof object => key in object

export const isInPath = (val: unknown, path: string): boolean => {
  if (val === path) return true
  return path.indexOf(`${val}[`) === 0 || path.indexOf(`${val}.`) === 0
}
export const isEmpty = (val: unknown): boolean => {
  if (val == null) return true

  if (isNan(val)) return true

  if ((val as ArrayLike<unknown>).length !== undefined) return (val as ArrayLike<unknown>).length === 0

  if (val instanceof Date) return false

  if (typeof val === 'object') return Object.keys(val).length === 0

  return false
}

export const isBuffer = (val: unknown): boolean => {
  if (val && typeof val === 'object' && val.constructor && typeof (val.constructor as any).isBuffer === 'function') {
    return (val.constructor as any).isBuffer(val)
  }
  return false
}

export const isMergeable = (val: unknown): boolean => {
  if (!isObject(val)) return false
  const fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer]

  for (let i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false
  }

  return true
}

export const isOne = (val: unknown): boolean => {
  if (val === 1) return true
  return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1
}

// /\d{1,3}%$/
export const isPercent = (n: unknown): boolean => typeof n === 'string' && /\d{1,3}%$/.test(n)
export const isInseparable = (val: unknown): boolean =>
  Object(val) !== val || isFunc(val) || isDate(val) || isError(val) || isSet(val) || isMap(val) || isRegexp(val)

export const isLink = (el: unknown): el is React.ReactElement => {
  if (typeof el === 'object') {
    if (!React.isValidElement(el)) return false
    if (!el.type) return false
    if (el.type === 'a') return true
    if (el.props && (el as React.ReactElement).props.to) return true
  }

  return false
}

type EnterPress = {
  keyCode: number
}

export const isEnterPress = (e: unknown): boolean => {
  if (typeof e !== 'object') return false
  return (e as EnterPress).keyCode === 13
}

export const isMacOS = (): boolean => /macintosh|mac os x/i.test(navigator.userAgent)

export const isFirefox = (): boolean => navigator.userAgent.toLowerCase().indexOf('firefox') > -1
