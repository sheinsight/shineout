"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.exposeClass = void 0;

var _expose = _interopRequireDefault(require("./expose.less"));

var _classname = _interopRequireDefault(require("../utils/classname"));

var exposeClass = (0, _classname.default)(_expose.default, 'expose');
exports.exposeClass = exposeClass;