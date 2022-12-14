"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.Provider = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../context"));

var context = (0, _context.default)(); // eslint-disable-next-line

var Provider = context.Provider;
exports.Provider = Provider;

var consumer = function consumer(Origin) {
  return function (props) {
    return _react.default.createElement(context.Consumer, null, function (value) {
      // eslint-disable-next-line react/prop-types
      var mp = Object.assign({}, props, value && props.absolute && props.zIndex === undefined && {
        zIndex: 1051
      });
      return _react.default.createElement(Origin, mp);
    });
  };
};

var _default = consumer;
exports.default = _default;