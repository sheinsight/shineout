"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.tableClass = void 0;

require("../../styles/normalize.less");

var _table = _interopRequireDefault(require("./table.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var tableClass = (0, _classname.default)(_table.default, 'table');
exports.tableClass = tableClass;