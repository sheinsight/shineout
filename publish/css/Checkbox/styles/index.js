"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.checkinputClass = void 0;

require("../../styles/normalize.css");

var _checkinput = _interopRequireDefault(require("./checkinput.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var checkinputClass = (0, _classname.default)(_checkinput.default, 'checkinput');
exports.checkinputClass = checkinputClass;