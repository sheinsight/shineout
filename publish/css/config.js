"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.set = set;
exports.setConfig = setConfig;
exports.isRTL = isRTL;
exports.default = exports.noti = void 0;

var _objects = require("./utils/objects");

var _notification = _interopRequireDefault(require("./utils/notification"));

var noti = new _notification.default();
exports.noti = noti;
var config = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: process.env.LOCALE || 'en-US',
  autoSSL: false,
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
  caret: undefined,
  direction: 'ltr'
};
var _default = config;
exports.default = _default;

function set(name, value) {
  if (value !== undefined && name in config) config[name] = value;
  noti.dispatch(name);
}

function setConfig(conf) {
  for (var _iterator = (0, _objects.entries)(conf), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _ref2 = _ref,
        key = _ref2[0],
        value = _ref2[1];
    set(key, value);
  }
}

function isRTL() {
  return config.direction === 'rtl';
}