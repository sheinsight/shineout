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

// based on klona/full (MIT) https://github.com/lukeed/klona
function klonaSet(obj: any, key: any, val: PropertyDescriptor, seen: WeakMap<object, any>) {
  if (typeof val.value === 'object') val.value = safeDeepClone(val.value, seen)
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === '__proto__') {
    Object.defineProperty(obj, key, val)
  } else {
    obj[key] = val.value
  }
}

export const safeDeepClone = (x: any, seen?: WeakMap<object, any>): any => {
  if (typeof x !== 'object' || x === null) return x

  // keep references that must not be cloned
  if ((x as any).$$typeof !== undefined) return x
  if (typeof Node !== 'undefined' && x instanceof Node) return x

  if (!seen) seen = new WeakMap()
  if (seen.has(x)) return seen.get(x)

  let i = 0
  let k: any
  let list: any[]
  let tmp: any
  const str = Object.prototype.toString.call(x)

  if (str === '[object Object]') {
    tmp = Object.create(x.__proto__ || null)
  } else if (str === '[object Array]') {
    tmp = Array(x.length)
  } else if (str === '[object Set]') {
    tmp = new Set()
    ;(x as Set<any>).forEach(val => tmp.add(safeDeepClone(val, new WeakMap())))
  } else if (str === '[object Map]') {
    tmp = new Map()
    ;(x as Map<any, any>).forEach((val, key) => tmp.set(safeDeepClone(key, seen), safeDeepClone(val, seen)))
  } else if (str === '[object Date]') {
    tmp = new Date(+x)
  } else if (str === '[object RegExp]') {
    tmp = new RegExp(x.source, x.flags)
  } else if (str === '[object DataView]') {
    tmp = new (x.constructor as any)(safeDeepClone(x.buffer, seen))
  } else if (str === '[object ArrayBuffer]') {
    tmp = x.slice(0)
  } else if (str.slice(-6) === 'Array]') {
    tmp = new (x.constructor as any)(x)
  }

  if (tmp) {
    seen.set(x, tmp)

    if (str === '[object Array]') {
      // each element gets its own seen scope so that sibling elements sharing the same
      // object reference are cloned into independent copies instead of the same shared clone
      for (i = 0; i < x.length; i++) {
        tmp[i] = safeDeepClone(x[i], new WeakMap())
      }
      return tmp
    }

    list = Object.getOwnPropertySymbols(x)
    for (i = 0; i < list.length; i++) {
      klonaSet(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i])!, seen)
    }
    list = Object.getOwnPropertyNames(x)
    for (i = 0; i < list.length; i++) {
      k = list[i]
      if (Object.hasOwnProperty.call(tmp, k) && tmp[k] === x[k]) continue
      klonaSet(tmp, k, Object.getOwnPropertyDescriptor(x, k)!, seen)
    }
  }

  return tmp || x
}
