"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Image = _interopRequireDefault(require("./Image"));

var _Group = _interopRequireDefault(require("./Group"));

_Image.default.Group = _Group.default;
_Image.default.displayName = 'ShineoutImage';
_Image.default.Group.displayName = 'ShineoutImageGroup';
var _default = _Image.default;
exports.default = _default;