"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.selectClass = void 0;

require("../../styles/normalize.css");

var _select = _interopRequireDefault(require("./select.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var selectClass = (0, _classname.default)(_select.default, 'select');
exports.selectClass = selectClass;