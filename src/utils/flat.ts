// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects

import { isEmpty, isObject } from './is'
import { deepClone } from './clone'

export function insertPoint(name: string) {
  const reg = /(\[\d+\])/gi
  return name.replace(reg, (s, m, i) => s.replace(m, i === 0 ? m : `.${m}`))
}

type Result = {
  [x: string]: unknown
}
export function flatten(data: Result, skipArray?: boolean) {
  if (isEmpty(data)) return data
  const result: Result = {}
  function recurse(cur: unknown, prop: keyof Result) {
    if (
      Object(cur) !== cur ||
      typeof cur === 'function' ||
      cur instanceof Date ||
      cur instanceof Error ||
      (skipArray && Array.isArray(cur))
    ) {
      if (!(cur === undefined && /\[\d+\]$/.test(prop as string))) {
        result[prop] = cur
      }
    } else if (Array.isArray(cur)) {
      if (cur.length === 0) {
        result[prop] = []
      } else {
        for (let i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop ? `${prop}[${i}]` : `[${i}]`)
        }
      }
    } else {
      let empty = true
      if (typeof cur === 'object') {
        // eslint-disable-next-line
        for (const p in cur) {
          empty = false
          recurse(cur[p as keyof typeof cur], prop ? `${prop}.${p}` : p)
        }

        if (empty) {
          result[prop] = {}
        }
      }
    }
  }
  recurse(data, '')
  return result
}

export function unflatten<T extends {}>(rawdata: T) {
  if (Object(rawdata) !== rawdata || isEmpty(rawdata) || Array.isArray(rawdata)) {
    return rawdata
  }

  const data: Result = { ...rawdata }

  const result: Result = {}
  // let { cur, prop, idx, last, temp, match } = {}
  let cur: any
  let prop: keyof typeof cur
  let idx: number
  let last: number
  let temp: string
  let match: RegExpExecArray | null

  // eslint-disable-next-line
  Object.keys(data)
    .sort()
    .forEach(p => {
      const pathWithPoint = insertPoint(p)
      cur = result
      prop = ''
      last = 0
      do {
        idx = pathWithPoint.indexOf('.', last)
        temp = pathWithPoint.substring(last, idx !== -1 ? idx : undefined)
        match = /^\[(\d+)\]$/.exec(temp)
        cur = cur[prop] || (cur[prop] = match ? [] : {})
        prop = match ? match[1] : temp
        last = idx + 1
      } while (idx >= 0)
      cur[prop] = deepClone(data[p])
    })
  return result[''] as { [name: string]: any }
}

type insertObject = {
  [x: string]: unknown
}
export function insertValue(obj: insertObject, name: string, index: number, value: any) {
  Object.keys(obj)
    .filter(n => n.indexOf(`${name}[`) === 0)
    .sort()
    .reverse()
    .forEach(n => {
      // const reg = new RegExp(`${name}\\[(\\d+)\\]`)
      const reg = new RegExp(`${name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}\\[(\\d+)\\]`)
      const match = reg.exec(n)
      const i = parseInt((match as RegExpExecArray)[1], 10)
      if (i < index) return
      const newName = n.replace(reg, `${name}[${i + 1}]`)
      if (obj[n]) obj[newName] = obj[n]
      delete obj[n]
    })
  const newValue = flatten({ [`${name}[${index}]`]: value })
  Object.keys(newValue).forEach(k => {
    if (newValue[k] !== undefined) obj[k] = newValue[k]
  })
}

type SpliceValue = {
  [x: string]: []
}

export function spliceValue(obj: SpliceValue, name: keyof SpliceValue & string, index: number) {
  const names = Object.keys(obj)
    .filter(n => n === name || n.indexOf(`${name}[`) === 0)
    .sort()

  names.forEach(n => {
    if (n === name && !Array.isArray(obj[name])) return

    if (n === name) {
      obj[name].splice(index, 1)
      return
    }

    const reg = new RegExp(`${name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}\\[(\\d+)\\]`)
    const match = reg.exec(n)
    const i = parseInt((match as RegExpExecArray)[1], 10)
    if (i < index) return
    if (i === index) {
      delete obj[n]
      return
    }
    const newName = n.replace(reg, `${name}[${i - 1}]`)
    obj[newName] = obj[n]
    delete obj[n]
  })
}

const isNameWithPath = (name: string, path: string) => {
  if (name.indexOf(path) !== 0) return false
  const remain = name.replace(path, '')[0]
  return [undefined, '[', '.'].includes(remain)
}

type Source = {
  [x: string]: any
}
export const getSthByName = (name: keyof Source & string, source: Source) => {
  if (source[name]) return source[name]

  let result: any = unflatten(source)
  name = insertPoint(name)

  name.split('.').forEach((n: keyof typeof result) => {
    const match = /^\[(\d+)\]$/.exec(n as string)
    // eslint-disable-next-line
    if (match) n = match[1] as keyof typeof result
    if (result) result = result[n]
    else result = undefined
  })

  // get from form-error
  if (!result && isObject(source[''])) result = source['' as keyof Source][name]

  return result
}

export const removeSthByName = (name: string, source: { [x: string]: any }) => {
  const match = /(.*)\[(\d+)\]$/.exec(name)
  if (match) {
    spliceValue(source, match[1], parseInt(match[2], 10))
  } else {
    Object.keys(source).forEach(n => {
      if (isNameWithPath(n, name)) delete source[n]
    })
  }
}

export const flattenArray = <T>(arr1: any[]): T[] =>
  arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)), [])
