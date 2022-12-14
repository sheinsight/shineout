import { isArray, isDate, isMap, isSet, isRegexp, isMergeable, isError } from './is'; // eslint-disable-next-line

var cloneArray = function cloneArray(source) {
  return Array.from(source, function (x) {
    return deepClone(x);
  });
};

var cloneObject = function cloneObject(source, specialKeys) {
  if (specialKeys === void 0) {
    specialKeys = [];
  }

  var target = Object.create(Object.getPrototypeOf(source));
  [].concat(specialKeys, Object.keys(source)).forEach(function (k) {
    // eslint-disable-next-line
    target[k] = deepClone(source[k]);
  });
  return target;
};

export var fastClone = function fastClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};
export var shallowClone = function shallowClone(val) {
  if (!val) return val;
  if (isDate(val)) return new Date(val);
  if (isMap(val)) return new Map(val);
  if (isSet(val)) return new Set(val);
  if (isRegexp(val)) return new RegExp(val);
  if (isError(val)) return cloneObject(val, ['message']);
  return val;
};
export var deepClone = function deepClone(source) {
  if (isArray(source)) return cloneArray(source);
  if (isMergeable(source)) return cloneObject(source);
  return shallowClone(source);
};