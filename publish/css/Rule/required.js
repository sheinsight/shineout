"use strict";

exports.__esModule = true;
exports.default = exports.requiredMessage = void 0;

var _objects = require("../utils/objects");

var _strings = require("../utils/strings");

var _locale = require("../locale");

var options = {
  skipUndefined: true
};

var requiredMessage = function requiredMessage(props) {
  var type = props.type === 'array' ? 'array' : 'string';
  return (0, _strings.substitute)((0, _locale.getLocale)("rules.required." + type), props);
};

exports.requiredMessage = requiredMessage;

var _default = function _default(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message,
      tip = _ref.tip;

  return function (msg) {
    return (0, _objects.deepMerge)({
      required: true,
      message: requiredMessage
    }, (0, _objects.deepMerge)({
      message: message,
      tip: tip
    }, {
      message: msg
    }, options), options);
  };
};

exports.default = _default;