"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setLocale = setLocale;
exports.getLocale = getLocale;

var _objects = require("../utils/objects");

var _config = _interopRequireDefault(require("../config"));

var _zhCN = _interopRequireDefault(require("./zh-CN"));

var _en_US = _interopRequireDefault(require("./en_US"));

var locale = _config.default.locale === 'zh-CN' ? _zhCN.default : _en_US.default;

function setLocale(arg) {
  if (typeof arg === 'string') {
    locale = arg === 'zh-CN' ? _zhCN.default : _en_US.default;
  } else if (typeof arg === 'object') {
    locale = (0, _objects.deepMerge)(locale, arg, {
      clone: true
    });
  }
}

function getLocale(name, def) {
  if (!name) return locale;
  if (def && def[name]) return def[name];
  return (0, _objects.deepGet)(locale, name);
}