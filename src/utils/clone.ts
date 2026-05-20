import { isArray, isDate, isMap, isSet, isRegexp, isMergeable, isError } from './is'

type ArraySource<T> = T[] | ArrayLike<T>

// eslint-disable-next-line
const cloneArray = (source: ArraySource<any>): any[] => Array.from(source, (x: any) => deepClone(x))

const cloneObject = (source: { [x: string]: any }, specialKeys: string[] = []) => {
  let target = Object.create(Object.getPrototypeOf(source))
  /* File or Response (non-serializable data) will throw error */
  try {
    // eslint-disable-next-line guard-for-in
    for (const key in target) {
      target[key] = target[key]
    }
  } catch (e) {
    console.error('should not pass non-serializable data', source)
    console.error(e)
    target = {}
  }
  ;[...specialKeys, ...Object.keys(source)].forEach(k => {
    // eslint-disable-next-line
    target[k] = deepClone(source[k])
  })
  return target
}

export const fastClone = <U>(obj: U) => JSON.parse(JSON.stringify(obj)) as U

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

export const safeDeepClone = (source: any, seen?: WeakMap<object, any>): any => {
  if (source === null || typeof source !== 'object') return source
  if (isDate(source)) return new Date(source.getTime())
  if (isRegexp(source)) return new RegExp(source)
  if ((source as any).$$typeof !== undefined) return source
  if (typeof Node !== 'undefined' && source instanceof Node) return source

  if (!seen) seen = new WeakMap()
  if (seen.has(source)) return seen.get(source)

  if (isArray(source)) {
    const arr: any[] = []
    seen.set(source, arr)
    for (let i = 0; i < source.length; i++) {
      arr[i] = safeDeepClone(source[i], seen)
    }
    return arr
  }

  const proto = Object.getPrototypeOf(source)
  if (proto !== Object.prototype && proto !== null) return source

  const clone: any = {}
  seen.set(source, clone)
  const keys = Object.keys(source)
  for (let i = 0; i < keys.length; i++) {
    clone[keys[i]] = safeDeepClone(source[keys[i]], seen)
  }
  return clone
}
