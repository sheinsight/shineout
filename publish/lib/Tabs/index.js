"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Link = _interopRequireDefault(require("./Link"));

_Tabs.default.Panel = _Panel.default;
_Tabs.default.Link = _Link.default;
_Tabs.default.displayName = 'ShineoutTabs';
var _default = _Tabs.default;
exports.default = _default;