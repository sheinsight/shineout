// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects

import isEmpty from './validate/isEmpty'
import isObject from './validate/isObject'
import { shallowClone } from './objects'

export function flatten(data, skipArray) {
  if (isEmpty(data)) return data
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur || cur instanceof Date || cur instanceof Error || (skipArray && Array.isArray(cur))) {
      if (!(cur === undefined && /\.\[\d+\]$/.test(prop))) {
        result[prop] = cur
      }
    } else if (Array.isArray(cur)) {
      if (cur.length === 0) {
        result[prop] = []
      } else {
        for (let i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop ? `${prop}.[${i}]` : `[${i}]`)
        }
      }
    } else {
      let empty = true
      // eslint-disable-next-line
      for (const p in cur) {
        empty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (empty) { result[prop] = {} }
    }
  }
  recurse(data, '')
  return result
}

export function unflatten(rawdata) {
  if (Object(rawdata) !== rawdata || isEmpty(rawdata) || Array.isArray(rawdata)) {
    return rawdata
  }

  const data = { ...rawdata }

  const result = {}
  let {
    cur, prop, idx, last, temp, match,
  } = {}

  // eslint-disable-next-line
  for (const p in data) {
    cur = result
    prop = ''
    last = 0
    do {
      idx = p.indexOf('.', last)
      temp = p.substring(last, idx !== -1 ? idx : undefined)
      match = /^\[(\d+)\]$/.exec(temp)
      cur = cur[prop] || (cur[prop] = match ? [] : {})
      prop = match ? match[1] : temp
      last = idx + 1
    } while (idx >= 0)
    const dp = data[p]
    if (isObject(dp) && !(dp instanceof Error || dp instanceof Date)) {
      cur[prop] = shallowClone(dp)
    } else if (Array.isArray(dp)) {
      cur[prop] = [...dp]
    } else if (dp !== undefined) {
      cur[prop] = dp
    }
  }
  return result['']
}

export function insertValue(obj, name, index, value) {
  Object.keys(obj).filter(n => n.indexOf(`${name}.[`) === 0).sort().reverse()
    .forEach((n) => {
      const reg = new RegExp(`${name}.\\[(\\d+)\\]`)
      const match = reg.exec(n)
      const i = parseInt(match[1], 10)
      if (i < index) return
      const newName = n.replace(reg, `${name}.[${i + 1}]`)
      if (obj[n]) obj[newName] = obj[n]
      delete obj[n]
    })
  const newValue = flatten({ [`${name}.[${index}]`]: value })
  Object.keys(newValue).forEach((k) => {
    if (newValue[k] !== undefined) obj[k] = newValue[k]
  })
}

export function spliceValue(obj, name, index) {
  Object.keys(obj).filter(n => n.indexOf(`${name}.[`) === 0).sort().forEach((n) => {
    const reg = new RegExp(`${name}.\\[(\\d+)\\]`)
    const match = reg.exec(n)
    const i = parseInt(match[1], 10)
    if (i < index) return
    if (i === index) {
      delete obj[n]
      return
    }
    const newName = n.replace(reg, `${name}.[${i - 1}]`)
    obj[newName] = obj[n]
    delete obj[n]
  })
}

export const getSthByName = (name, source = {}) => {
  if (source[name]) return source[name]

  let result = unflatten(source)

  name.split('.').forEach((n) => {
    const match = /^\[(\d+)\]$/.exec(n)
    // eslint-disable-next-line
    if (match) n = match[1]
    if (result) result = result[n]
    else result = undefined
  })

  return result
}

export const removeSthByName = (name, source) => {
  const match = /(.*)\.\[(\d+)\]$/.exec(name)
  if (match) {
    spliceValue(source, match[1], parseInt(match[2], 10))
  } else {
    Object.keys(source).forEach((n) => {
      if (n === name || n.indexOf(`${name}.`) === 0) {
        delete source[n]
      }
    })
  }
}
