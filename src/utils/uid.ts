import { v4 as getUUid } from 'uuid'
import { KeygenType } from '../@types/common'

export function getUidStr(...args: Parameters<typeof getUUid>) {
  // dom id  cannot start with number
  return `a${getUUid(...args)}`
}

function $getKey<T>(d: T, gen: KeygenType<T>, index?: number) {
  if (gen === true) return d
  if (typeof gen === 'string') return d[gen]
  if (typeof gen === 'function') return gen(d, index)

  return index
}

export function getKey<T>(...args: [T, KeygenType<T>, number?]) {
  const key = $getKey(...args) as string | number
  if (typeof key !== 'string' && typeof key !== 'number') {
    console.error(new Error(`keygen result expect a string or a number, get '${typeof key}'`))
  }

  return key
}

export const defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout
