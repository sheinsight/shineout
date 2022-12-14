import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Spin from './Spin';
import { ringClass, planeClass, pulseClass } from './styles';

function formatSize(size) {
  var ss = /^(\d+)([%|\w]*)$/.exec(size);
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px'
  };
}

export function Ring(obj) {
  var _formatSize = formatSize(obj.size),
      value = _formatSize.value,
      unit = _formatSize.unit;

  var style = {
    borderWidth: value / 10 + unit,
    borderTopColor: obj.color
  };
  return React.createElement(Spin, _extends({}, obj, {
    style: style,
    spinClass: ringClass
  }));
}
export function Plane(obj) {
  var style = {
    backgroundColor: obj.color
  };
  return React.createElement(Spin, _extends({}, obj, {
    style: style,
    spinClass: planeClass
  }));
}
export function Pulse(obj) {
  var style = {
    backgroundColor: obj.color
  };
  return React.createElement(Spin, _extends({}, obj, {
    style: style,
    spinClass: pulseClass
  }));
}