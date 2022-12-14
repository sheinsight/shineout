"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _func = require("../utils/func");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Datum = _interopRequireDefault(require("../Datum"));

var _Group = _interopRequireDefault(require("./Group"));

var _context = require("./context");

var _exports = (0, _func.compose)(_inputable.default, _context.consumer)(_Checkbox.default);

_exports.Group = (0, _func.compose)(_inputable.default, _Datum.default.hoc({
  bindProps: ['disabled', 'format', 'prediction', 'separator']
}))(_Group.default);
_exports.Checkbox = _Checkbox.default;
_exports.displayName = 'ShineoutCheckbox';
_exports.Group.displayName = 'ShineoutCheckboxGroup';
var _default = _exports;
exports.default = _default;