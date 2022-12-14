"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.scrollConsumer = exports.Provider = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../context"));

var context = (0, _context.default)();
var Consumer = context.Consumer; // eslint-disable-next-line

var Provider = context.Provider;
exports.Provider = Provider;

var scrollConsumer = function scrollConsumer(Origin) {
  return function (props) {
    return _react.default.createElement(Consumer, null, function (value) {
      if (value === void 0) {
        value = {};
      }

      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        scrollElement: value.element,
        scrollLeft: value.left,
        scrollTop: value.top
      }));
    });
  };
};

exports.scrollConsumer = scrollConsumer;