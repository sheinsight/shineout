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
type Funcs = Function[]

export function compose(...funcs: Funcs) {
  if (funcs.length === 0) {
    return (arg: any) => arg
  }
  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args: Funcs) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

export function curry(f: Function, ...args: any[]) {
  if (args.length >= f.length) {
    return f(...args)
  }

  return (...next: any) => curry(f.bind(f, ...args), ...next)
}

export function empty(e: Event) {
  e.preventDefault()
}

export function memoize(fn: any) {
  return (key: string) => {
    fn.cache = fn.cache || {}

    if (!(key in fn.cache)) {
      fn.cache[key] = fn(key)
    }

    return fn.cache[key]
  }
}

export function createFunc(func: Function) {
  if (typeof func === 'function') return func
  return (data: { [x: string]: any }) => (func ? data[func] : data)
}

export const throttle = function(func: Function, timer: number) {
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
