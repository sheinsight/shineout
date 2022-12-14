"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.menuClass = void 0;

require("../../styles/normalize.css");

var _menu = _interopRequireDefault(require("./menu.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var menuClass = (0, _classname.default)(_menu.default, 'menu');
exports.menuClass = menuClass;