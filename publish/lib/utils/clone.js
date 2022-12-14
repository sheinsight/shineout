"use strict";

exports.__esModule = true;
exports.deepClone = exports.shallowClone = exports.fastClone = void 0;

var _is = require("./is");

// eslint-disable-next-line
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

var fastClone = function fastClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.fastClone = fastClone;

var shallowClone = function shallowClone(val) {
  if (!val) return val;
  if ((0, _is.isDate)(val)) return new Date(val);
  if ((0, _is.isMap)(val)) return new Map(val);
  if ((0, _is.isSet)(val)) return new Set(val);
  if ((0, _is.isRegexp)(val)) return new RegExp(val);
  if ((0, _is.isError)(val)) return cloneObject(val, ['message']);
  return val;
};

exports.shallowClone = shallowClone;

var deepClone = function deepClone(source) {
  if ((0, _is.isArray)(source)) return cloneArray(source);
  if ((0, _is.isMergeable)(source)) return cloneObject(source);
  return shallowClone(source);
};

exports.deepClone = deepClone;