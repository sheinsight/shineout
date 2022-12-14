"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.consumer = exports.Provider = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../context"));

var context = (0, _context.default)();
var Consumer = context.Consumer; // eslint-disable-next-line

var Provider = context.Provider;
exports.Provider = Provider;

var consumer = function consumer(Origin) {
  return function (props) {
    return _react.default.createElement(Consumer, null, function (_ref) {
      var bindItem = _ref.bindItem,
          unbindItem = _ref.unbindItem;
      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        unbindItem: unbindItem,
        bindItem: bindItem
      }));
    });
  };
};

exports.consumer = consumer;