"use strict";

exports.__esModule = true;
exports.default = void 0;

var _is = require("../is");

var _default = function _default(options) {
  return function (value, formdata, callback) {
    var min = options.min,
        max = options.max,
        message = options.message;
    var error = new Error(message);

    if ((0, _is.isEmpty)(value)) {
      if (min) callback(error);else callback(true);
      return;
    }

    var len = typeof value === 'number' ? value.toString().length : value.length;

    if (typeof min === 'number' && len < min || typeof max === 'number' && len > max) {
      callback(error);
    } else {
      callback(true);
    }
  };
};

exports.default = _default;