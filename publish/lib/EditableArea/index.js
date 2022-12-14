"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _func = require("../utils/func");

var _delay = _interopRequireDefault(require("../hoc/delay"));

var _trim = _interopRequireDefault(require("../hoc/trim"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _EditableArea = _interopRequireDefault(require("./EditableArea"));

var EditableArea = (0, _func.compose)(_inputable.default, (0, _delay.default)(400), _trim.default)(_EditableArea.default);
EditableArea.displayName = 'ShineoutEditableArea';
var _default = EditableArea;
exports.default = _default;