"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Panel = _interopRequireDefault(require("./Panel"));

function Content(props) {
  // eslint-disable-next-line
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({}, props, {
    useTextStyle: true
  }));
}

var _default = Content;
exports.default = _default;