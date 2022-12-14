"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.imageClass = void 0;

require("../../styles/normalize.css");

var _image = _interopRequireDefault(require("./image.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var imageClass = (0, _classname.default)(_image.default, 'image');
exports.imageClass = imageClass;