import { keygenType } from '../@types/common'

let uid = Date.now()

export function getUid() {
  uid += 1
  return uid
}

export function getUidStr() {
  return getUid().toString(36)
}

function $getKey<T>(d: T, gen: keygenType<T>, index?: number) {
  if (gen === true) return d
  if (typeof gen === 'string') return d[gen]
  if (typeof gen === 'function') return gen(d, index)

  return index
}

export function getKey<T>(...args: [T, keygenType<T>, number?]) {
  const key = $getKey(...args)
  if (typeof key !== 'string' && typeof key !== 'number') {
    console.error(new Error(`keygen result expect a string or a number, get '${typeof key}'`))
  }

  return key
}

export const defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout
