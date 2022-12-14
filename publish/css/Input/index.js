"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _func = require("../utils/func");

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _delay = _interopRequireDefault(require("../hoc/delay"));

var _trim = _interopRequireDefault(require("../hoc/trim"));

var _coin = _interopRequireDefault(require("../hoc/coin"));

var _Input = _interopRequireDefault(require("./Input"));

var _Number = _interopRequireDefault(require("./Number"));

var _Group = _interopRequireDefault(require("./Group"));

var _Password = _interopRequireDefault(require("./Password"));

var _exports = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({}), (0, _delay.default)(400), _trim.default, (0, _coin.default)('input'))(_Input.default);

_exports.Group = (0, _inputBorder.default)({
  tag: 'div',
  isGroup: true,
  from: 'input'
})(_Group.default);
_exports.Number = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({}), (0, _coin.default)())(_Number.default);
_exports.Password = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({}))(_Password.default);
_exports.displayName = 'ShineoutInput';
_exports.Number.displayName = 'ShineoutInputNumber';
_exports.Password.displayName = 'ShineoutInputPassword';
_exports.Group.displayName = 'ShineoutInputGroup';
var _default = _exports;
exports.default = _default;