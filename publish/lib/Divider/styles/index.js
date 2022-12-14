"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.dividerClass = void 0;

require("../../styles/normalize.less");

var _divider = _interopRequireDefault(require("./divider.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var dividerClass = (0, _classname.default)(_divider.default, 'divider');
exports.dividerClass = dividerClass;