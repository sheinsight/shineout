"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _analyzeColor = _interopRequireDefault(require("./analyzeColor"));

var _config = require("../config");

function Circle(props) {
  var children = props.children,
      strokeWidth = props.strokeWidth,
      type = props.type,
      color = props.color,
      size = props.size,
      value = props.value,
      background = props.background,
      strokeLinecap = props.strokeLinecap;
  var className = (0, _classnames.default)((0, _styles.progressClass)('circle', type, (0, _config.isRTL)() && 'rtl'), props.className);
  var r = 100 - Math.ceil(strokeWidth / size * 100);
  var p = Math.PI * 2 * r;
  var dasharray = [p * (value / 100), p * (1 - value / 100)];
  var style = Object.assign({
    width: size,
    height: size
  }, props.style);
  var width = value === 0 && strokeLinecap === 'round' ? 0 : strokeWidth * 2;
  var objColor = color && typeof color === 'object';
  return _react.default.createElement("div", {
    className: className,
    style: style
  }, _react.default.createElement("svg", {
    viewBox: "0 0 200 200"
  }, objColor ? _react.default.createElement("defs", null, _react.default.createElement("linearGradient", {
    id: "progress-linear",
    x1: "50%",
    x2: "50%",
    y1: "0%",
    y2: "100%"
  }, (0, _analyzeColor.default)(color).map(function (c) {
    return _react.default.createElement("stop", {
      key: c.pos,
      offset: c.pos,
      stopColor: c.color
    });
  }))) : null, _react.default.createElement("circle", {
    className: (0, _styles.progressClass)('background'),
    cx: "100",
    cy: "100",
    r: r,
    strokeWidth: strokeWidth * 2,
    fill: "transparent",
    style: {
      stroke: background
    }
  }), _react.default.createElement("circle", {
    className: (0, _styles.progressClass)('front'),
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
  })), children && _react.default.createElement("div", {
    className: (0, _styles.progressClass)('content')
  }, children));
}

Circle.propTypes = {
  background: _propTypes.default.string,
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  color: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  strokeLinecap: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  size: _propTypes.default.number,
  style: _propTypes.default.object,
  type: _propTypes.default.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: _propTypes.default.number
};
Circle.defaultProps = {
  strokeLinecap: 'round',
  strokeWidth: 8,
  size: 100
};
var _default = Circle;
exports.default = _default;