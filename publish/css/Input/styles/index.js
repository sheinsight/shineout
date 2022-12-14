"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.inputClass = void 0;

require("../../styles/normalize.css");

var _form = _interopRequireDefault(require("../../Form/styles/form.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var inputClass = (0, _classname.default)(_form.default, 'input');
exports.inputClass = inputClass;