"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("../Tooltip/Container"));

var events = _interopRequireWildcard(require("./events"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Confirm = _interopRequireDefault(require("./Confirm"));

var _Content = _interopRequireDefault(require("./Content"));

var Component = (0, _Container.default)(events);

function Popover(props) {
  // eslint-disable-next-line
  if (props.content) return _react.default.createElement(Component, props);
  return _react.default.createElement(_Panel.default, props);
}

Popover.displayName = 'ShineoutPopover';
Popover.Confirm = _Confirm.default;
Popover.Confirm.displayName = 'ShineoutPopoverConfirm';
Popover.Content = _Content.default;
var _default = Popover;
exports.default = _default;