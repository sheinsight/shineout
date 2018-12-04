// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects

import isEmpty from './validate/isEmpty'
import isObject from './validate/isObject'

export function flatten(data, skipArray) {
  if (isEmpty(data)) return data
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur || cur instanceof Date || cur instanceof Error || (skipArray && Array.isArray(cur))) {
      result[prop] = cur
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
      cur[prop] = { ...dp }
    } else if (Array.isArray(dp)) {
      cur[prop] = [...dp]
    } else {
      cur[prop] = data[p]
    }
  }
  return result['']
}

export const objectValues = (obj) => {
  if (!obj) return []
  return Object.keys(obj).map(k => obj[k])
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
    obj[k] = newValue[k]
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
