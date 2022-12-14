import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { progressClass } from './styles';
import analyzeColor from './analyzeColor';
import Popup from './Popup';
import { isRTL } from '../config';

function Line(props) {
  var children = props.children,
      strokeWidth = props.strokeWidth,
      type = props.type,
      value = props.value,
      color = props.color,
      style = props.style,
      background = props.background,
      popup = props.popup;
  var hasChildren = children !== undefined;
  var isPopup = popup && hasChildren;
  var className = classnames(progressClass('line', type, isPopup && 'line-popup', isRTL() && 'rtl'), props.className);
  var innerStyle = {
    width: value / 100 * 100 + "%",
    borderRadius: strokeWidth / 2
  };

  if (typeof color === 'string') {
    innerStyle.background = color;
    innerStyle.backgroundSize = '1em 1em';
  } else if (typeof color === 'object') {
    innerStyle.background = "linear-gradient(to right, " + analyzeColor(color).reduce(function (p, v) {
      var col = v.color + " " + v.pos;
      return p ? p + "," + col : col;
    }, '') + ")";
  }

  return React.createElement("div", {
    className: className,
    style: style
  }, React.createElement("div", {
    className: progressClass('background'),
    style: {
      height: strokeWidth,
      background: background,
      borderRadius: strokeWidth / 2
    }
  }, React.createElement("div", {
    className: progressClass('front'),
    style: innerStyle
  })), hasChildren && (popup ? React.createElement(Popup, _extends({}, props, {
    value: value
  })) : React.createElement("div", {
    className: progressClass('content')
  }, children)));
}

Line.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  strokeWidth: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: PropTypes.number,
  popup: PropTypes.bool
};
Line.defaultProps = {
  strokeWidth: 8
};
export default Line;