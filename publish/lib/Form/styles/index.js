"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.inputBorderClass = exports.formClass = void 0;

require("../../styles/normalize.less");

var _form = _interopRequireDefault(require("./form.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var formClass = (0, _classname.default)(_form.default, 'form');
exports.formClass = formClass;
var inputBorderClass = (0, _classname.default)(_form.default, 'inputBorder');
exports.inputBorderClass = inputBorderClass;