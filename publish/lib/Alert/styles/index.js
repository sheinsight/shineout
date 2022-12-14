"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.alertClass = void 0;

require("../../styles/normalize.less");

var _classname = _interopRequireDefault(require("../../utils/classname"));

var _alert = _interopRequireDefault(require("./alert.less"));

var alertClass = (0, _classname.default)(_alert.default, 'alert');
exports.alertClass = alertClass;