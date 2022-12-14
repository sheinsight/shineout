"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.selectClass = void 0;

require("../../styles/normalize.less");

var _select = _interopRequireDefault(require("./select.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var selectClass = (0, _classname.default)(_select.default, 'select');
exports.selectClass = selectClass;