"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.listClass = void 0;

require("../../styles/normalize.css");

var _classname = _interopRequireDefault(require("../../utils/classname"));

var _list = _interopRequireDefault(require("./list.css"));

var listClass = (0, _classname.default)(_list.default, 'list');
exports.listClass = listClass;