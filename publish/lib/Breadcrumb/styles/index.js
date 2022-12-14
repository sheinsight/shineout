"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.breadcrumbClass = void 0;

require("../../styles/normalize.less");

var _breadcrumb = _interopRequireDefault(require("./breadcrumb.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var breadcrumbClass = (0, _classname.default)(_breadcrumb.default, 'breadcrumb');
exports.breadcrumbClass = breadcrumbClass;