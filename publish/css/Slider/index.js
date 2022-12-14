"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _Container = _interopRequireDefault(require("./Container"));

var Slider = (0, _inputable.default)(_Container.default);
Slider.displayName = 'ShineoutSlider';
var _default = Slider;
exports.default = _default;