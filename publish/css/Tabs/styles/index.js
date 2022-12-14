"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.tabsClass = void 0;

require("../../styles/normalize.css");

var _tabs = _interopRequireDefault(require("./tabs.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var tabsClass = (0, _classname.default)(_tabs.default, 'tabs');
exports.tabsClass = tabsClass;