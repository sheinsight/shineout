"use strict";

exports.__esModule = true;
exports.default = exports.typeMessage = void 0;

var _objects = require("../utils/objects");

var _strings = require("../utils/strings");

var _locale = require("../locale");

var typeMessage = function typeMessage(props) {
  var path = props.title ? 'rules.type' : 'rules.reg';
  return (0, _strings.substitute)((0, _locale.getLocale)(path), props);
};

exports.typeMessage = typeMessage;
var options = {
  skipUndefined: true
};

var _default = function _default(type, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message,
      tip = _ref.tip;

  return function (msg) {
    return (0, _objects.deepMerge)({
      type: type,
      message: typeMessage
    }, (0, _objects.deepMerge)({
      message: message,
      tip: tip
    }, {
      message: msg
    }, options), options);
  };
};

exports.default = _default;