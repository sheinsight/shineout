"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.buttonClass = void 0;

require("../../styles/normalize.less");

var _button = _interopRequireDefault(require("./button.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var buttonClass = (0, _classname.default)(_button.default, 'button');
exports.buttonClass = buttonClass;