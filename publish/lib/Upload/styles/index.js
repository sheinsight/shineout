"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.uploadClass = void 0;

require("../../styles/normalize.less");

var _upload = _interopRequireDefault(require("./upload.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var uploadClass = (0, _classname.default)(_upload.default, 'upload');
exports.uploadClass = uploadClass;