"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _Upload = _interopRequireDefault(require("./Upload"));

var _Image = _interopRequireWildcard(require("./Image"));

var _Progress = _interopRequireDefault(require("./Progress"));

var _Dragger = _interopRequireDefault(require("./Dragger"));

var _context = require("./context");

var _exports = (0, _inputable.default)(_Upload.default);

_exports.Image = (0, _inputable.default)(_Image.default);
_exports.ImageHandler = _Image.Handler;
_exports.Button = (0, _inputable.default)(_Progress.default);
_exports.Dragger = (0, _context.consumer)(_Dragger.default);
_exports.displayName = 'ShineoutUpload';
_exports.Image.displayName = 'ShineoutImageUpload';
_exports.Button.displayName = 'ShineoutButtonUpload';
_exports.Dragger.displayName = 'ShineoutDraggerUpload';
var _default = _exports;
exports.default = _default;