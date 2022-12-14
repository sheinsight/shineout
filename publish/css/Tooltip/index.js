"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Container = _interopRequireDefault(require("./Container"));

var events = _interopRequireWildcard(require("./events"));

var Tooltip = (0, _Container.default)(events);
Tooltip.displayName = 'ShineoutTooltip';
var _default = Tooltip;
exports.default = _default;