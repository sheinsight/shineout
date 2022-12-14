"use strict";

exports.__esModule = true;
exports.isFirefox = exports.isMacOS = exports.isEnterPress = exports.isLink = exports.isInseparable = exports.isPercent = exports.isOne = exports.isMergeable = exports.isBuffer = exports.isEmpty = exports.isInPath = exports.isPromise = exports.isSymbol = exports.isSet = exports.isMap = exports.isRegexp = exports.isError = exports.isDate = exports.isString = exports.isObject = exports.isNumber = exports.isFunc = exports.isNan = exports.isNotUndef = exports.isUndef = exports.isArray = void 0;

var _react = require("react");

var _func = require("./func");

var nameIs = (0, _func.curry)(function (name, val) {
  return val && val.constructor && val.constructor.name === name;
}); // eslint-disable-next-line

var isArray = Array.isArray;
exports.isArray = isArray;

var isUndef = function isUndef(v) {
  return v == null;
};

exports.isUndef = isUndef;

var isNotUndef = function isNotUndef(v) {
  return v != null;
}; // eslint-disable-next-line


exports.isNotUndef = isNotUndef;

var isNan = function isNan(a) {
  return a !== a;
};

exports.isNan = isNan;

var isFunc = function isFunc(f) {
  return typeof f === 'function';
};

exports.isFunc = isFunc;

var isNumber = function isNumber(n) {
  return typeof n === 'number';
};

exports.isNumber = isNumber;

var isObject = function isObject(val) {
  return val && typeof val === 'object' && !isArray(val);
};

exports.isObject = isObject;

var isString = function isString(s) {
  return typeof s === 'string';
};

exports.isString = isString;

var isDate = function isDate(val) {
  return val instanceof Date;
};

exports.isDate = isDate;

var isError = function isError(val) {
  return val instanceof Error;
};

exports.isError = isError;

var isRegexp = function isRegexp(val) {
  return val instanceof RegExp;
};

exports.isRegexp = isRegexp;
var isMap = nameIs('Map');
exports.isMap = isMap;
var isSet = nameIs('Set');
exports.isSet = isSet;
var isSymbol = nameIs('Symbol');
exports.isSymbol = isSymbol;

var isPromise = function isPromise(p) {
  return p && (nameIs('Promise', p) || isFunc(p.then));
};

exports.isPromise = isPromise;

var isInPath = function isInPath(val, path) {
  if (val === path) return true;
  return path.indexOf(val + "[") === 0 || path.indexOf(val + ".") === 0;
};

exports.isInPath = isInPath;

var isEmpty = function isEmpty(val) {
  if (val == null) return true;
  if (isNan(val)) return true;
  if (val.length !== undefined) return val.length === 0;
  if (val instanceof Date) return false;
  if (typeof val === 'object') return Object.keys(val).length === 0;
  return false;
};

exports.isEmpty = isEmpty;

var isBuffer = function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }

  return false;
};

exports.isBuffer = isBuffer;

var isMergeable = function isMergeable(val) {
  if (!isObject(val)) return false;
  var fns = [isDate, isError, isRegexp, isMap, isSet, isBuffer];

  for (var i = 0; i < fns.length; i++) {
    if (fns[i](val)) return false;
  }

  return true;
};

exports.isMergeable = isMergeable;

var isOne = function isOne(val) {
  if (val === 1) return true;
  return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1;
}; // /\d{1,3}%$/


exports.isOne = isOne;

var isPercent = function isPercent(n) {
  return typeof n === 'string' && /\d{1,3}%$/.test(n);
};

exports.isPercent = isPercent;

var isInseparable = function isInseparable(val) {
  return Object(val) !== val || isFunc(val) || isDate(val) || isError(val) || isSet(val) || isMap(val) || isRegexp(val);
};

exports.isInseparable = isInseparable;

var isLink = function isLink(el) {
  if (!(0, _react.isValidElement)(el)) return false;
  if (!el.type) return false;
  if (el.type === 'a') return true;
  if (el.props && el.props.to) return true;
  return false;
};

exports.isLink = isLink;

var isEnterPress = function isEnterPress(e) {
  return e.keyCode === 13;
};

exports.isEnterPress = isEnterPress;

var isMacOS = function isMacOS() {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

exports.isMacOS = isMacOS;

var isFirefox = function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};

exports.isFirefox = isFirefox;