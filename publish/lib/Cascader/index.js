"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Cascader = _interopRequireDefault(require("./Cascader"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _styles = require("../Select/styles");

var _func = require("../utils/func");

var _filter = _interopRequireDefault(require("./filter"));

var _context = _interopRequireDefault(require("../Table/context"));

var Cascader = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({
  className: (0, _styles.selectClass)('_'),
  tag: 'span'
}), _filter.default, _context.default)(_Cascader.default);
Cascader.displayName = 'ShineoutCascader';
var _default = Cascader;
exports.default = _default;