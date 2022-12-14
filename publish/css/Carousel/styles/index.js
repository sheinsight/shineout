"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.carouselClass = void 0;

require("../../styles/normalize.css");

var _carousel = _interopRequireDefault(require("./carousel.css"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var carouselClass = (0, _classname.default)(_carousel.default, 'carousel');
exports.carouselClass = carouselClass;