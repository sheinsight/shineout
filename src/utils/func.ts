/**
 * from redux.compose https://github.com/reactjs/redux/blob/master/src/compose.js
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

type AnyFunction = (...args: any) => any
export { compose } from './compose'
export * from './curry'

export function curry<U extends AnyFunction>(f: U, ...args: any) {
  if (args.length >= f.length) {
    return f(...args)
  }

  return (...next: any) => curry(f.bind(f, ...args), ...next)
}

export function empty(e: { preventDefault: () => void }) {
  e.preventDefault()
}

export function memoize<T extends Function>(
  fn: T & {
    cache?: {
      [name: string]: any
    }
  }
) {
  return (key: string) => {
    fn.cache = fn.cache || {}

    if (!(key in fn.cache)) {
      fn.cache[key] = fn(key)
    }

    return fn.cache[key]
  }
}

export function createFunc(func?: Function | string) {
  if (typeof func === 'function') return func
  return (data: { [x: string]: any }) => (func ? data[func] : data)
}

export const throttle = function(func: Function, timer?: number) {
  const that: {
    timer?: NodeJS.Timeout | null
  } = {}
  const cleanTimer = () => {
    if (that.timer) {
      clearTimeout(that.timer)
      that.timer = null
    }
  }
  if (!timer) return [func, cleanTimer]
  return [
    (...args: any) => {
      cleanTimer()
      that.timer = setTimeout(() => {
        func(...args)
      }, timer)
    },
    cleanTimer,
  ]
}
