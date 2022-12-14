"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.getDirectionClass = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _config = _interopRequireWildcard(require("../config"));

var getDirectionClass = function getDirectionClass(c) {
  return c + " " + c + "-" + ((0, _config.isRTL)() ? 'rtl' : 'ltr');
};
/**
 * create a new className generate function, add namespace, handle css module
 * @param style - object; for css module
 * @param module - string
 * @param prefix - string, default value is 'shineout'
 * * */


exports.getDirectionClass = getDirectionClass;

var _default = function _default(style, module, prefix) {
  if (prefix === void 0) {
    prefix = _config.default.prefix;
  }

  return function () {
    var className = _classnames.default.apply(void 0, arguments);

    if (!className) return '';
    var ns = "" + prefix + (module ? "-" + module : '-');
    var list = className.split(' ').map(function (c) {
      return c === '_' ? ns : ns + "-" + c;
    });

    if (_config.default.cssModule) {
      list = list.map(function (c) {
        return style[c] || c;
      });
    }

    return list.join(' ');
  };
};

exports.default = _default;