"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _required = _interopRequireDefault(require("./required"));

var _default = function _default(fn) {
  return function (value, formdata, callback) {
    if (value == null || value.length === 0) {
      callback(true);
      return;
    }

    fn(value, formdata, callback);
  };
};

exports.default = _default;