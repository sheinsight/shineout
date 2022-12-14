"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _func = require("../utils/func");

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _Datum = _interopRequireDefault(require("../Datum"));

var _context = require("../Checkbox/context");

var _Group = _interopRequireDefault(require("./Group"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _exports = (0, _context.consumer)(_Radio.default);

_exports.Group = (0, _func.compose)(_inputable.default, _Datum.default.hoc({
  limit: 1,
  bindProps: ['disabled', 'format', 'prediction'],
  pure: false
}))(_Group.default);
_exports.displayName = 'ShineoutRadio';
_exports.Group.displayName = 'ShineoutRadioGroup';
var _default = _exports;
exports.default = _default;