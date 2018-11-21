// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects

import isEmpty from './validate/isEmpty'

export function flatten(data) {
  if (isEmpty(data)) return {}
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur || cur instanceof Date) {
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

export function unflatten(data) {
  if (Object(data) !== data || isEmpty(data) || Array.isArray(data)) {
    return data
  }

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
    cur[prop] = data[p]
  }
  return result['']
}
