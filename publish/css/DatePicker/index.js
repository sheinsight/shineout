"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _func = require("../utils/func");

var _styles = require("./styles");

var _Container = _interopRequireDefault(require("./Container"));

var _value = _interopRequireDefault(require("./value"));

var _context = _interopRequireDefault(require("../Table/context"));

var getClassName = function getClassName(opt) {
  return (0, _styles.datepickerClass)('_', (opt.range ? 'r' : 'c') + "-" + (opt.type || 'date'));
};

var Datepicker = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({
  className: getClassName,
  innerWidth: true
}), _value.default, _context.default)(_Container.default);
Datepicker.displayName = 'ShineoutDatepicker';
var _default = Datepicker;
exports.default = _default;