"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.iconClass = void 0;

require("../../styles/normalize.less");

var _icon = _interopRequireDefault(require("./icon.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var iconClass = (0, _classname.default)(_icon.default, 'icon');
exports.iconClass = iconClass;