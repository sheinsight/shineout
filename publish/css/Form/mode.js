"use strict";

exports.__esModule = true;
exports.default = void 0;

var _formContext = require("./formContext");

var _func = require("../utils/func");

var createMode = (0, _func.memoize)(function (mode) {
  return (0, _formContext.formConsumer)(['formMode'], function (props) {
    var isMatch = mode === props.formMode;
    if (props.reverse) isMatch = !isMatch;
    return isMatch ? props.children : true;
  });
});

var _default = function _default() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.map(createMode);
};

exports.default = _default;