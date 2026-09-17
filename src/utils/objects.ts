import { isObject, isMergeable } from './is'
import { insertPoint } from './flat'
import { shallowClone } from './clone'
import { ObjectType } from '../@types/common'

const { hasOwnProperty } = Object.prototype
const PATH_MODE = {
  loose: '?',
  strict: '!',
  insert: '^',
  append: '$',
}

interface deepOptions {
  clone?: boolean
  forceSet?: boolean
  strictMode?: boolean
  defaultValue?: any
  skipUndefined?: boolean
  removeUndefined?: boolean
}

export function filterProps<T extends ObjectType>(obj: T, props: (keyof T)[] | ((prop: any) => boolean) = []) {
  if (!isObject(obj)) return obj

  if (typeof props === 'function') {
    const prediction = props
    props = []

    Object.keys(obj).forEach(k => {
      if (prediction(obj[k as keyof T])) (props as (keyof T)[]).push(k as keyof T)
    })
  }
  const newObj: Partial<T> = {}

  props.forEach(k => {
    newObj[k] = obj[k]
  })

  return newObj
}

// Object.values()
export const objectValues = (obj: ObjectType) => {
  if (!obj) return []
  return Object.keys(obj).map(k => obj[k])
}

// object only, not handle array.
export const deepMerge = (target: ObjectType = {}, source: ObjectType, options: deepOptions = {}) => {
  const { clone, removeUndefined, skipUndefined } = options
  if (!isMergeable(source)) return source

  const dest: ObjectType = {}
  if (isMergeable(target)) {
    Object.keys(target).forEach(k => {
      dest[k] = clone ? deepMerge({}, target[k], options) : target[k]
      if (removeUndefined && dest[k] === undefined) delete dest[k]
    })
  }

  Object.keys(source).forEach(k => {
    if (isMergeable(source[k]) && isMergeable(target[k])) {
      dest[k] = deepMerge(target[k], source[k], options)
    } else {
      if (skipUndefined && source[k] === undefined) return
      dest[k] = deepMerge({}, source[k], options)
      if (removeUndefined && dest[k] === undefined) delete dest[k]
    }
  })

  return dest
}

export function pathGenerator(raw: string) {
  const path = insertPoint(raw)
  const reg = /^\[(\d+)\]$/
  const pathModeValues = objectValues(PATH_MODE)
  let index = 0
  let last = 0
  let prop: string | number = ''
  const results: Array<[string | number, string | undefined, string | undefined]> = []
  while (index >= 0) {
    index = path.indexOf('.', last)
    prop = path.substring(last, index === -1 ? undefined : index)

    let mode
    const lastChar = prop.charAt(prop.length - 1)
    if (pathModeValues.includes(lastChar)) {
      mode = lastChar
      prop = prop.substring(0, prop.length - 1)
    }

    // array index
    const match = reg.exec(prop)
    // eslint-disable-next-line
    if (match) prop = parseInt(match[1], 10)

    last = index + 1
    results.push([prop, index === -1 ? undefined : path.substring(last), mode])
  }
  return results
}

export const deepSet = (target: ObjectType, path: string, value: any, options: deepOptions = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')

  const { removeUndefined, skipUndefined } = options
  const mergeOptions = { clone: true, removeUndefined, skipUndefined }

  // empty root
  if (path === '') {
    const dest = deepMerge(target, value, mergeOptions)
    Object.keys(dest).forEach(k => {
      ;((target as unknown) as ObjectType)[k] = dest[k]
    })
    return target
  }

  let current: any = target
  for (const [prop, next, mode] of pathGenerator(path)) {
    if (next) {
      const nextIsArray = /^\[\d+\]/.test(next as string)
      if (!current[prop]) current[prop] = nextIsArray ? [] : {}
      if (nextIsArray && !Array.isArray(current[prop])) {
        throw new Error(`Path ${path} expect an array.`)
      } else if (Array.isArray(current[prop]) && !nextIsArray) {
        throw new Error(`Path ${path} is an array, expect an object.`)
      }

      current = current[prop]
      continue
    }

    if (options.forceSet) {
      current[prop] = value
    } else if (mode === PATH_MODE.insert) {
      current.splice(prop, 0, value)
    } else if (mode === PATH_MODE.append) {
      current.splice((prop as number) + 1, 0, value)
    } else {
      if (skipUndefined && value === undefined) break

      current[prop] =
        isMergeable(current[prop]) && isMergeable(value) ? deepMerge(current[prop], value, mergeOptions) : value
    }
    if (removeUndefined && value === undefined) delete current[prop]
  }
  return target
}

// shallow copy for the nodes on the path, keeping the prototype for class instances
const shallowCopy = (node: any) => {
  if (Array.isArray(node)) return node.slice()
  if (isMergeable(node)) {
    const copy = Object.create(Object.getPrototypeOf(node))
    return Object.assign(copy, node)
  }
  return shallowClone(node)
}

/**
 * Immutable version of `deepSet`, based on path-based shallow copy.
 *
 * It walks down the path and shallow copies every node **on that path**, while all the
 * sibling nodes outside the path are reused by reference. The `target` is never mutated,
 * a new root is returned instead.
 *
 * The path syntax, the options and the semantic are the same as `deepSet`, so both of them
 * produce the same value, `deepSet` mutating `target` in place and this one returning a copy.
 *
 * @example
 * const target = { user: { info: { city: 'SH', age: 18 } }, list: [1, 2] }
 * const next = deepSetImmutable(target, 'user.info.city', 'BJ')
 * next.user.info.city // 'BJ'
 * next.user !== target.user // true, on the path
 * next.list === target.list // true, sibling reused
 */
export const deepSetImmutable = (target: ObjectType, path: string, value: any, options: deepOptions = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')

  const { removeUndefined, skipUndefined } = options
  const mergeOptions = { clone: true, removeUndefined, skipUndefined }

  // empty root, only the root is copied
  if (path === '') {
    return deepMerge(target, value, { clone: false, removeUndefined, skipUndefined })
  }

  const root = shallowCopy(target)
  let current: any = root

  for (const [prop, next, mode] of pathGenerator(path)) {
    if (!next) {
      if (options.forceSet) {
        current[prop] = value
      } else if (mode === PATH_MODE.insert) {
        current.splice(prop, 0, value)
      } else if (mode === PATH_MODE.append) {
        current.splice((prop as number) + 1, 0, value)
      } else {
        if (skipUndefined && value === undefined) break

        current[prop] =
          isMergeable(current[prop]) && isMergeable(value) ? deepMerge(current[prop], value, mergeOptions) : value
      }
      if (removeUndefined && value === undefined) delete current[prop]
      break
    }

    // same rule as deepSet: only the `[n]` syntax means an array index, so a plain numeric
    // segment like `users.0.name` is an object key instead
    const nextIsArray = /^\[\d+\]/.test(next)
    const child = current[prop]

    if (!child) {
      current[prop] = nextIsArray ? [] : {}
    } else if (nextIsArray && !Array.isArray(child)) {
      throw new Error(`Path ${path} expect an array.`)
    } else if (Array.isArray(child) && !nextIsArray) {
      throw new Error(`Path ${path} is an array, expect an object.`)
    } else {
      current[prop] = shallowCopy(child)
    }

    current = current[prop]
  }
  return root
}

export const deepGet = (target: ObjectType, path: string, options: deepOptions = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')

  // empty root
  if (path === '') return target
  const { defaultValue, strictMode } = options

  let current: unknown = target
  for (const [prop, , mode] of pathGenerator(path)) {
    const isStrict = mode === PATH_MODE.strict || (strictMode && defaultValue === undefined && mode !== PATH_MODE.loose)
    if (current != null && hasOwnProperty.call(current, prop)) {
      current = (current as ObjectType)[prop]
    } else if (isStrict) {
      throw new Error(`Path ${path} is not exist.`)
    } else {
      current = defaultValue
      break
    }
  }

  return current
}

export const deepRemove = (target: ObjectType, path: string) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string' || !path) throw new Error('Path must be a string.')

  let current: ObjectType = target
  let nextIsArray = false
  for (const [prop, next] of pathGenerator(path)) {
    if (current == null || !hasOwnProperty.call(current, prop)) {
      break
    }
    if (next) {
      current = current[prop as string]
      nextIsArray = /^\[\d+\]/.test(next)
    } else if (isObject(current)) {
      if (nextIsArray) throw new Error('Target is an object, expect array')
      delete (current as ObjectType)[prop]
    } else {
      if (!nextIsArray) {
        throw new Error('Target is an array, expect object')
      }
      ;(current as any[]).splice(prop as number, 1)
    }
  }

  return target
}

/**
 * Immutable version of `deepRemove`, based on path-based shallow copy.
 *
 * Like `deepSetImmutable`, it shallow copies the nodes on the path and reuses the siblings,
 * so the `target` is never mutated and a new root is returned. An array item is spliced out
 * of the copied array and an object key is deleted from the copied object.
 *
 * When the path does not exist there is nothing to remove, so the very same `target` is
 * returned instead of a copy, which matches the `deepRemove` behaviour.
 *
 * @example
 * const target = { a: { b: 1, c: 2 }, list: [1, 2, 3] }
 * const next = deepRemoveImmutable(target, 'a.b')
 * next.a // { c: 2 }
 * next.a !== target.a // true, on the path
 * next.list === target.list // true, sibling reused
 */
export const deepRemoveImmutable = (target: ObjectType, path: string) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string' || !path) throw new Error('Path must be a string.')

  const segments = pathGenerator(path)

  // same as deepRemove: a path that does not exist leaves the target untouched,
  // returning the target itself avoids a pointless new reference
  let probe: any = target
  for (const [prop] of segments) {
    if (probe == null || !hasOwnProperty.call(probe, prop)) return target
    probe = probe[prop]
  }

  const root = shallowCopy(target)
  let current: any = root
  let nextIsArray = false

  for (const [prop, next] of segments) {
    if (next) {
      current[prop] = shallowCopy(current[prop])
      current = current[prop]
      nextIsArray = /^\[\d+\]/.test(next)
    } else if (isObject(current)) {
      if (nextIsArray) throw new Error('Target is an object, expect array')
      delete current[prop]
    } else {
      if (!nextIsArray) throw new Error('Target is an array, expect object')
      current.splice(prop as number, 1)
    }
  }

  return root
}

export const deepHas = (target: ObjectType, path: string) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')
  if (path === '') return true

  let current: any = target
  for (const [prop, ,] of pathGenerator(path)) {
    if (!current || !hasOwnProperty.call(current, prop)) return false
    current = current[prop]
  }

  return true
}

export const entries = (obj: ObjectType) => {
  if (!obj) return []
  const keys = Object.keys(obj)
  return keys.map(key => [key, obj[key]])
}
