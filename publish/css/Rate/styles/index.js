"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.rateClass = void 0;

require("../../styles/normalize.css");

var _rate = _interopRequireDefault(require("./rate.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var rateClass = (0, _classname.default)(_rate.default, 'rate');
exports.rateClass = rateClass;