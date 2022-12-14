"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.resizableClass = exports.moveableClass = exports.hidableClass = void 0;

require("../../styles/normalize.less");

var _resizable = _interopRequireDefault(require("./resizable.less"));

var _moveable = _interopRequireDefault(require("./moveable.less"));

var _hidable = _interopRequireDefault(require("./hidable.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var hidableClass = (0, _classname.default)(_hidable.default, 'hidable');
exports.hidableClass = hidableClass;
var moveableClass = (0, _classname.default)(_moveable.default, 'moveable');
exports.moveableClass = moveableClass;
var resizableClass = (0, _classname.default)(_resizable.default, 'resizable');
exports.resizableClass = resizableClass;