"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fourDotsClass = exports.threeBounceClass = exports.scaleCircleClass = exports.chasingRingClass = exports.cubeGridClass = exports.doubleBounceClass = exports.chasingDotsClass = exports.waveClass = exports.pulseClass = exports.planeClass = exports.ringClass = exports.defaultClass = exports.spinClass = void 0;

require("../../styles/normalize.less");

var _spin = _interopRequireDefault(require("./spin.less"));

var _classname = _interopRequireDefault(require("../../utils/classname"));

var _default = _interopRequireDefault(require("./default.less"));

var _ring = _interopRequireDefault(require("./ring.less"));

var _plane = _interopRequireDefault(require("./plane.less"));

var _pulse = _interopRequireDefault(require("./pulse.less"));

var _wave = _interopRequireDefault(require("./wave.less"));

var _chasingDots = _interopRequireDefault(require("./chasing-dots.less"));

var _doubleBounce = _interopRequireDefault(require("./double-bounce.less"));

var _cubeGrid = _interopRequireDefault(require("./cube-grid.less"));

var _chasingRing = _interopRequireDefault(require("./chasing-ring.less"));

var _scaleCircle = _interopRequireDefault(require("./scale-circle.less"));

var _threeBounce = _interopRequireDefault(require("./three-bounce.less"));

var _fourDots = _interopRequireDefault(require("./four-dots.less"));

var spinClass = (0, _classname.default)(_spin.default, 'spin');
exports.spinClass = spinClass;
var defaultClass = (0, _classname.default)(_default.default, 'spin-default');
exports.defaultClass = defaultClass;
var ringClass = (0, _classname.default)(_ring.default, 'spin-ring');
exports.ringClass = ringClass;
var planeClass = (0, _classname.default)(_plane.default, 'spin-plane');
exports.planeClass = planeClass;
var pulseClass = (0, _classname.default)(_pulse.default, 'spin-pulse');
exports.pulseClass = pulseClass;
var waveClass = (0, _classname.default)(_wave.default, 'spin-wave');
exports.waveClass = waveClass;
var chasingDotsClass = (0, _classname.default)(_chasingDots.default, 'chasing-dots');
exports.chasingDotsClass = chasingDotsClass;
var doubleBounceClass = (0, _classname.default)(_doubleBounce.default, 'double-bounce');
exports.doubleBounceClass = doubleBounceClass;
var cubeGridClass = (0, _classname.default)(_cubeGrid.default, 'cube-grid');
exports.cubeGridClass = cubeGridClass;
var chasingRingClass = (0, _classname.default)(_chasingRing.default, 'chasing-ring');
exports.chasingRingClass = chasingRingClass;
var scaleCircleClass = (0, _classname.default)(_scaleCircle.default, 'scale-circle');
exports.scaleCircleClass = scaleCircleClass;
var threeBounceClass = (0, _classname.default)(_threeBounce.default, 'three-bounce');
exports.threeBounceClass = threeBounceClass;
var fourDotsClass = (0, _classname.default)(_fourDots.default, 'four-dots');
exports.fourDotsClass = fourDotsClass;