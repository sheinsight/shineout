"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.tooltipClass = void 0;

require("../../styles/normalize.css");

var _tooltip = _interopRequireDefault(require("./tooltip.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var tooltipClass = (0, _classname.default)(_tooltip.default, 'tooltip');
exports.tooltipClass = tooltipClass;