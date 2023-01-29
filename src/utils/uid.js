import { v4 as getUUid } from 'uuid'

export function getUidStr(...args) {
  // dom id  cannot start with number
  return `a${getUUid(...args)}`
}

function $getKey(d, gen, index) {
  if (gen === true) return d
  if (typeof gen === 'string') return d[gen]
  if (typeof gen === 'function') return gen(d, index)

  return index
}

export function getKey(...args) {
  const key = $getKey(...args)
  if (typeof key !== 'string' && typeof key !== 'number') {
    console.error(new Error(`keygen result expect a string or a number, get '${typeof key}'`))
  }

  return key
}

export const defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout
