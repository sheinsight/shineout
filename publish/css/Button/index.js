"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Button = _interopRequireDefault(require("./Button"));

var _Once = _interopRequireDefault(require("./Once"));

var _Group = _interopRequireDefault(require("./Group"));

_Button.default.Group = _Group.default;
_Button.default.Once = _Once.default;
_Button.default.displayName = 'ShineoutButton';
var _default = _Button.default;
exports.default = _default;