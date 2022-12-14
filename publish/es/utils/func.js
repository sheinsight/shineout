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
export function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(void 0, arguments));
  };
}
export function curry(f) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  if (args.length >= f.length) {
    return f.apply(void 0, args);
  }

  return function () {
    for (var _len3 = arguments.length, next = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      next[_key3] = arguments[_key3];
    }

    return curry.apply(void 0, [f.bind.apply(f, [f].concat(args))].concat(next));
  };
}
export function empty(e) {
  e.preventDefault();
}
export function memoize(fn) {
  return function (key) {
    fn.cache = fn.cache || {};

    if (!(key in fn.cache)) {
      fn.cache[key] = fn(key);
    }

    return fn.cache[key];
  };
}
export function createFunc(func) {
  if (typeof func === 'function') return func;
  return function (data) {
    return func ? data[func] : data;
  };
}
export var throttle = function throttle(func, timer) {
  var that = {};

  var cleanTimer = function cleanTimer() {
    if (that.timer) {
      clearTimeout(that.timer);
      that.timer = '';
    }
  };

  if (!timer) return [func, cleanTimer];
  return [function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    cleanTimer();
    that.timer = setTimeout(function () {
      func.apply(void 0, args);
    }, timer);
  }, cleanTimer];
};