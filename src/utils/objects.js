import { isObject, isMergeable } from './is'
import { insertPoint } from './flat'

const { hasOwnProperty } = Object.prototype
const PATH_MODE = {
  loose: '?',
  strict: '!',
  insert: '^',
  append: '$',
}

export function filterProps(obj, props = []) {
  if (!isObject(obj)) return obj

  if (typeof props === 'function') {
    const prediction = props
    props = []
    Object.keys(obj).forEach((k) => {
      if (prediction(obj[k])) props.push(k)
    })
  }

  const newObj = {}
  props.forEach((k) => {
    newObj[k] = obj[k]
  })

  return newObj
}

// Object.values()
export const objectValues = (obj) => {
  if (!obj) return []
  return Object.keys(obj).map(k => obj[k])
}

// object only, not handle array.
export const deepMerge = (target = {}, source, { clone, removeUndefined, skipUndefined } = {}) => {
  if (!isMergeable(source)) return source

  const dest = {}
  if (isMergeable(target)) {
    Object.keys(target).forEach((k) => {
      dest[k] = clone ? deepMerge({}, target[k], clone) : target[k]
      if (removeUndefined && dest[k] === undefined) delete dest[k]
    })
  }

  Object.keys(source).forEach((k) => {
    if (isMergeable(source[k]) && isMergeable(target[k])) {
      dest[k] = deepMerge(target[k], source[k], clone)
    } else {
      if (skipUndefined && source[k] === undefined) return
      dest[k] = deepMerge({}, source[k], clone)
      if (removeUndefined && dest[k] === undefined) delete dest[k]
    }
  })

  return dest
}

export function* pathGenerator(raw) {
  const path = insertPoint(raw)
  const reg = /^\[(\d+)\]$/
  const pathModeValues = objectValues(PATH_MODE)
  let index = 0
  let last = 0
  let prop = ''
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
    yield [prop, index === -1 ? undefined : path.substring(last), mode]
  }
}

export const deepSet = (target, path, value, options = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')

  const { removeUndefined, skipUndefined } = options
  const mergeOptions = { clone: true, removeUndefined, skipUndefined }

  // empty root
  if (path === '') {
    const dest = deepMerge(target, value, mergeOptions)
    Object.keys(dest).forEach((k) => {
      target[k] = dest[k]
    })
    return target
  }

  let current = target
  for (const [prop, next, mode] of pathGenerator(path)) {
    if (next) {
      const nextIsArray = /^\[\d+\]/.test(next)
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
      current.splice(prop + 1, 0, value)
    } else {
      if (skipUndefined && value === undefined) break

      current[prop] = isMergeable(current[prop]) && isMergeable(value)
        ? deepMerge(current[prop], value, mergeOptions)
        : value
    }
    if (removeUndefined && value === undefined) delete current[prop]
  }
  return target
}

export const deepGet = (target, path, options = {}) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string') throw new Error('Path must be a string.')

  // empty root
  if (path === '') return target
  const { defaultValue, strictMode } = options

  let current = target
  for (const [prop, , mode] of pathGenerator(path)) {
    const isStrict = mode === PATH_MODE.strict || (strictMode && defaultValue === undefined && mode !== PATH_MODE.loose)
    if (hasOwnProperty.call(current, prop)) {
      current = current[prop]
    } else if (isStrict) {
      throw new Error(`Path ${path} is not exist.`)
    } else {
      current = defaultValue
      break
    }
  }

  return current
}

export const deepRemove = (target, path) => {
  if (!isObject(target)) throw new Error('Target must be an object.')
  if (typeof path !== 'string' || !path) throw new Error('Path must be a string.')

  let current = target
  let nextIsArray = false
  for (const [prop, next] of pathGenerator(path)) {
    if (next) {
      if (!hasOwnProperty.call(current, prop)) {
        break
      }
      current = current[prop]
      nextIsArray = /^\[\d+\]/.test(next)
    } else if (isObject(current)) {
      if (nextIsArray) throw new Error('Target is an object, expect array')
      delete current[prop]
    } else {
      if (!nextIsArray) throw new Error('Target is an array, expect object')
      current.splice(prop, 1)
    }
  }

  return target
}
