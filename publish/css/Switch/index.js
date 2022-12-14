"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _func = require("../utils/func");

var _Switch = _interopRequireDefault(require("./Switch"));

var _context = require("../Checkbox/context");

var _exports = (0, _func.compose)(_inputable.default, _context.consumer)(_Switch.default);

_exports.displayName = 'ShineoutSwitch';
_exports.Switch = _Switch.default;
var _default = _exports;
exports.default = _default;