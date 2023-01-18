import deepEqual from 'deep-eql'

type Options = {
  [x: string]: any
}

const { hasOwnProperty } = Object.prototype

function is(x: unknown, y: unknown) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  }
  // eslint-disable-next-line
  return x !== x && y !== y
}

function getOption(options: Options, key: keyof Options) {
  if (!options[key]) return []
  const val = options[key]
  return Array.isArray(val) ? val : [val]
}
interface Column {
  group?: any
  width?: number | string
}
export function compareColumns(columns1?: Column[], columns2?: Column[]) {
  if (!columns1 || !columns2) return true
  if (columns1.length !== columns2.length) return false
  const simpleCompare = columns1.every(
    (c, i) => c.width === columns2[i].width || (Number.isNaN(c.width) && Number.isNaN(columns2[i].width))
  )
  if (!simpleCompare) return false
  const complexCompare = columns1.every((c, i) => {
    if (Array.isArray(c.group) && Array.isArray(columns2[i].group))
      return c.group.every((d, index) => d === columns2[i].group[index])
    return c.group === columns2[i].group
  })
  return complexCompare
}

export default function(objA: any, objB?: any, options = {}) {
  if (is(objA, objB)) {
    return true
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  const skip = getOption(options, 'skip')
  const deep = getOption(options, 'deep')

  if (keysA.length !== keysB.length) {
    return false
  }

  keysA.sort((a, b) => deep.indexOf(a) - deep.indexOf(b))

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const k = keysA[i]
    if (skip.includes(k)) continue

    if (!hasOwnProperty.call(objB, k) || !is(objA[k], objB[k])) {
      if (objA[k] instanceof Error && objB[k] instanceof Error) {
        if (objA[k].message !== objB[k].message) return false
        continue
      }

      if (deep.includes(k)) {
        if (!deepEqual(objA[k], objB[k])) return false
      } else {
        return false
      }
    }
  }

  return true
}
