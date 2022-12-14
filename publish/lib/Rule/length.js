"use strict";

exports.__esModule = true;
exports.default = exports.lengthMessage = void 0;

var _objects = require("../utils/objects");

var _strings = require("../utils/strings");

var _locale = require("../locale");

var createMessage = function createMessage(key) {
  return function (props) {
    var lt = '';

    switch (props.type) {
      case 'integer':
      case 'number':
        lt = 'number';
        break;

      case 'array':
        lt = 'array';
        break;

      default:
        lt = 'string';
    }

    return (0, _strings.substitute)((0, _locale.getLocale)("rules.length." + key + "." + lt), props);
  };
};

var options = {
  skipUndefined: true
};
var lengthMessage = {
  max: createMessage('max'),
  min: createMessage('min')
};
exports.lengthMessage = lengthMessage;

var _default = function _default(key, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message;

  return function (len, msg) {
    var _deepMerge;

    if (typeof len !== 'number') {
      console.error(new Error("Rule \"" + key + "\" param expect a number, get " + typeof len));
      return null;
    }

    return (0, _objects.deepMerge)({
      message: lengthMessage[key]
    }, (0, _objects.deepMerge)((_deepMerge = {
      message: message
    }, _deepMerge[key] = len, _deepMerge), {
      message: msg
    }, options), options);
  };
};

exports.default = _default;