"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.progressClass = void 0;

require("../../styles/normalize.less");

var _progress = _interopRequireDefault(require("./progress.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var progressClass = (0, _classname.default)(_progress.default, 'progress');
exports.progressClass = progressClass;