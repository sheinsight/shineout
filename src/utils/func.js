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

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

export function curry(f, ...args) {
  if (args.length >= f.length) {
    return f(...args)
  }

  return (...next) => curry(f.bind(f, ...args), ...next)
}

export function empty(e) {
  e.preventDefault()
}

export function memoize(fn) {
  return (key) => {
    fn.cache = fn.cache || {}

    if (!(key in fn.cache)) {
      fn.cache[key] = fn(key)
    }

    return fn.cache[key]
  }
}
