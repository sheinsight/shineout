"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.datepickerClass = void 0;

require("../../styles/normalize.css");

var _datepicker = _interopRequireDefault(require("./datepicker.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var datepickerClass = (0, _classname.default)(_datepicker.default, 'datepicker');
exports.datepickerClass = datepickerClass;