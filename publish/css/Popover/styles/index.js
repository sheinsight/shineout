"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.popoverClass = void 0;

require("../../styles/normalize.css");

var _popover = _interopRequireDefault(require("./popover.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var popoverClass = (0, _classname.default)(_popover.default, 'popover');
exports.popoverClass = popoverClass;