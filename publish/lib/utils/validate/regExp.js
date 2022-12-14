"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _nullable = _interopRequireDefault(require("./nullable"));

var _default = function _default(regExp, options) {
  return (0, _nullable.default)(function (value, formdata, callback) {
    var message = options.message;
    var reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp;
    if (reg.global) reg.lastIndex = 0;

    if (reg.test(value)) {
      callback(true);
    } else {
      callback(new Error(message));
    }
  });
};

exports.default = _default;