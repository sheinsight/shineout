"use strict";

exports.__esModule = true;
exports.default = void 0;

var _objects = require("../utils/objects");

var _locale = require("../locale");

var options = {
  skipUndefined: true
};

var _default = function _default(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message;

  return function (regExp, msg) {
    if (typeof regExp !== 'string' && !(regExp instanceof RegExp)) {
      console.error(new Error("Rule \"reg\" param expect a RegExp object or a string, get " + typeof regExp));
      return null;
    }

    return (0, _objects.deepMerge)({
      message: (0, _locale.getLocale)('rules.reg')
    }, (0, _objects.deepMerge)({
      message: message,
      regExp: regExp
    }, {
      message: msg
    }, options), options);
  };
};

exports.default = _default;