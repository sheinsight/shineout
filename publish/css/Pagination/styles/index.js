"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.paginationClass = void 0;

require("../../styles/normalize.css");

var _pagination = _interopRequireDefault(require("./pagination.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var paginationClass = (0, _classname.default)(_pagination.default, 'pagination');
exports.paginationClass = paginationClass;