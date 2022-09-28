import { isArray, isDate, isMap, isSet, isRegexp, isMergeable, isError } from './is'

type ArraySource<T> = T[] | ArrayLike<T>

const cloneArray = (source: ArraySource<any>): any[] => Array.from(source, (x: any) => deepClone(x))

const cloneObject = (source: { [x: string]: any }, specialKeys: string[] = []) => {
  const target = Object.create(Object.getPrototypeOf(source))
  ;[...specialKeys, ...Object.keys(source)].forEach(k => {
    target[k] = deepClone(source[k])
  })
  return target
}

export const fastClone = (obj: any) => JSON.parse(JSON.stringify(obj))

export const shallowClone = (val: any) => {
  if (!val) return val
  if (isDate(val)) return new Date(val)
  if (isMap(val)) return new Map(val)
  if (isSet(val)) return new Set(val)
  if (isRegexp(val)) return new RegExp(val)
  if (isError(val)) return cloneObject(val, ['message'])
  return val
}

export const deepClone = (source: any) => {
  if (isArray(source)) return cloneArray(source)
  if (isMergeable(source)) return cloneObject(source)
  return shallowClone(source)
}
