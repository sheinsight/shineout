"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.scrollClass = void 0;

require("../../styles/normalize.less");

var _scroll = _interopRequireDefault(require("./scroll.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var scrollClass = (0, _classname.default)(_scroll.default, 'scroll');
exports.scrollClass = scrollClass;