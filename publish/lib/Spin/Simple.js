"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Ring = Ring;
exports.Plane = Plane;
exports.Pulse = Pulse;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Spin = _interopRequireDefault(require("./Spin"));

var _styles = require("./styles");

function formatSize(size) {
  var ss = /^(\d+)([%|\w]*)$/.exec(size);
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px'
  };
}

function Ring(obj) {
  var _formatSize = formatSize(obj.size),
      value = _formatSize.value,
      unit = _formatSize.unit;

  var style = {
    borderWidth: value / 10 + unit,
    borderTopColor: obj.color
  };
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, obj, {
    style: style,
    spinClass: _styles.ringClass
  }));
}

function Plane(obj) {
  var style = {
    backgroundColor: obj.color
  };
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, obj, {
    style: style,
    spinClass: _styles.planeClass
  }));
}

function Pulse(obj) {
  var style = {
    backgroundColor: obj.color
  };
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, obj, {
    style: style,
    spinClass: _styles.pulseClass
  }));
}