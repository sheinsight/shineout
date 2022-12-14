"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.sliderClass = void 0;

require("../../styles/normalize.less");

var _slider = _interopRequireDefault(require("./slider.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var sliderClass = (0, _classname.default)(_slider.default, 'slider');
exports.sliderClass = sliderClass;