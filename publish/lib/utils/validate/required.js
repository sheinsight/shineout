"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = function _default(options) {
  return function (value, formdata, callback) {
    var message = options.message,
        required = options.required;

    if (required === false) {
      callback(true);
      return;
    }

    if (value == null || value.length === 0) {
      callback(new Error(message));
    } else {
      callback(true);
    }
  };
};

exports.default = _default;