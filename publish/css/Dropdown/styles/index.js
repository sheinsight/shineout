"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.dropdownClass = void 0;

require("../../styles/normalize.css");

var _dropdown = _interopRequireDefault(require("./dropdown.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var dropdownClass = (0, _classname.default)(_dropdown.default, 'dropdown');
exports.dropdownClass = dropdownClass;