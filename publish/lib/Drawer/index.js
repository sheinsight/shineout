"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Modal = _interopRequireDefault(require("../Modal"));

var Drawer = function Drawer(props) {
  return _react.default.createElement(_Modal.default, (0, _extends2.default)({}, props, {
    drawer: true
  }));
};

Drawer.defaultProps = {
  position: 'right',
  width: 'auto'
};
Drawer.displayName = 'ShineoutDrawer';
Drawer.Submit = _Modal.default.Submit;
var _default = Drawer;
exports.default = _default;