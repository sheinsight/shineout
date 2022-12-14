"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _nullable = _interopRequireDefault(require("./nullable"));

var _default = function _default(options) {
  return (0, _nullable.default)(function (value, formdata, callback) {
    var min = options.min,
        max = options.max,
        message = options.message;

    if (value === undefined || value === '') {
      callback(true);
      return;
    }

    var val = parseFloat(value);

    if (Number.isNaN(val)) {
      // console.error(new Error(`Can not convert value '${value}' to Number, validate failed.`))
      callback(new Error(message));
    }

    if (typeof min === 'number' && val < min || typeof max === 'number' && val > max) {
      callback(new Error(message));
    } else {
      callback(true);
    }
  });
};

exports.default = _default;