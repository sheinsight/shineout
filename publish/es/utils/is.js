import { isValidElement } from 'react';
import { curry } from './func';
var nameIs = curry(function (name, val) {
  return val && val.constructor && val.constructor.name === name;
}); // eslint-disable-next-line

export var isArray = Array.isArray;
export var isUndef = function isUndef(v) {
  return v == null;
};
export var isNotUndef = function isNotUndef(v) {
  return v != null;
}; // eslint-disable-next-line

export var isNan = function isNan(a) {
  return a !== a;
};
export var isFunc = function isFunc(f) {
  return typeof f === 'function';
};
export var isNumber = function isNumber(n) {
  return typeof n === 'number';
};
export var isObject = function isObject(val) {
  return val && typeof val === 'object' && !isArray(val);
};
export var isString = function isString(s) {
  return typeof s === 'string';
};
export var isDate = function isDate(val) {
  return val instanceof Date;
};
export var isError = function isError(val) {
  return val instanceof Error;
};
export var isRegexp = function isRegexp(val) {
  return val instanceof RegExp;
};
export var isMap = nameIs('Map');
export var isSet = nameIs('Set');
export var isSymbol = nameIs('Symbol');
export var isPromise = function isPromise(p) {
  return p && (nameIs('Promise', p) || isFunc(p.then));
};
export var isInPath = function isInPath(val, path) {
  if (val === path) return true;
  return path.indexOf(val + "[") === 0 || path.indexOf(val + ".") === 0;
};
export var isEmpty = function isEmpty(val) {
  if (val == null) return true;
  if (isNan(val)) return true;
  if (val.length !== undefined) return val.length === 0;
  if (val instanceof Date) return false;
  if (typeof val === 'object') return Object.keys(val).length === 0;
  return false;
};
export var isBuffer = function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }

  return false;
};
export var isMergeable = function isMergeable(val) {
  if (!isObject(val)) return false;
  var fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer];

  for (var i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false;
  }

  return true;
};
export var isOne = function isOne(val) {
  if (val === 1) return true;
  return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1;
}; // /\d{1,3}%$/

export var isPercent = function isPercent(n) {
  return typeof n === 'string' && /\d{1,3}%$/.test(n);
};
export var isInseparable = function isInseparable(val) {
  return Object(val) !== val || isFunc(val) || isDate(val) || isError(val) || isSet(val) || isMap(val) || isRegexp(val);
};
export var isLink = function isLink(el) {
  if (!isValidElement(el)) return false;
  if (!el.type) return false;
  if (el.type === 'a') return true;
  if (el.props && el.props.to) return true;
  return false;
};
export var isEnterPress = function isEnterPress(e) {
  return e.keyCode === 13;
};
export var isMacOS = function isMacOS() {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};
export var isFirefox = function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};