"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.tagClass = void 0;

require("../../styles/normalize.css");

var _tag = _interopRequireDefault(require("./tag.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var tagClass = (0, _classname.default)(_tag.default, 'tag');
exports.tagClass = tagClass;