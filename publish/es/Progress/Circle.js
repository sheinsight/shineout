import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { progressClass } from './styles';
import analyzeColor from './analyzeColor';
import { isRTL } from '../config';

function Circle(props) {
  var children = props.children,
      strokeWidth = props.strokeWidth,
      type = props.type,
      color = props.color,
      size = props.size,
      value = props.value,
      background = props.background,
      strokeLinecap = props.strokeLinecap;
  var className = classnames(progressClass('circle', type, isRTL() && 'rtl'), props.className);
  var r = 100 - Math.ceil(strokeWidth / size * 100);
  var p = Math.PI * 2 * r;
  var dasharray = [p * (value / 100), p * (1 - value / 100)];
  var style = Object.assign({
    width: size,
    height: size
  }, props.style);
  var width = value === 0 && strokeLinecap === 'round' ? 0 : strokeWidth * 2;
  var objColor = color && typeof color === 'object';
  return React.createElement("div", {
    className: className,
    style: style
  }, React.createElement("svg", {
    viewBox: "0 0 200 200"
  }, objColor ? React.createElement("defs", null, React.createElement("linearGradient", {
    id: "progress-linear",
    x1: "50%",
    x2: "50%",
    y1: "0%",
    y2: "100%"
  }, analyzeColor(color).map(function (c) {
    return React.createElement("stop", {
      key: c.pos,
      offset: c.pos,
      stopColor: c.color
    });
  }))) : null, React.createElement("circle", {
    className: progressClass('background'),
    cx: "100",
    cy: "100",
    r: r,
    strokeWidth: strokeWidth * 2,
    fill: "transparent",
    style: {
      stroke: background
    }
  }), React.createElement("circle", {
    className: progressClass('front'),
    cx: "100",
    cy: "100",
    r: r,
    fill: "transparent",
    style: {
      stroke: objColor ? "url('#progress-linear')" : color
    },
    strokeDasharray: dasharray,
    strokeLinecap: strokeLinecap,
    strokeWidth: width
  })), children && React.createElement("div", {
    className: progressClass('content')
  }, children));
}

Circle.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  strokeLinecap: PropTypes.string,
  strokeWidth: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: PropTypes.number
};
Circle.defaultProps = {
  strokeLinecap: 'round',
  strokeWidth: 8,
  size: 100
};
export default Circle;