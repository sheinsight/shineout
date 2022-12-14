"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _config = _interopRequireDefault(require("../config"));

var _config2 = _interopRequireDefault(require("../hoc/config"));

var _styles = require("./styles");

var _Multiple = require("./Multiple");

var _Simple = require("./Simple");

var _proptypes = require("../utils/proptypes");

var spins = {
  plane: _Simple.Plane,
  pulse: _Simple.Pulse,
  ring: _Simple.Ring,
  wave: _Multiple.Wave,
  default: _Multiple.Default,
  'chasing-ring': _Multiple.ChasingRing,
  'chasing-dots': _Multiple.ChasingDots,
  'cube-grid': _Multiple.CubeGrid,
  'double-bounce': _Multiple.DoubleBounce,
  'fading-circle': _Multiple.FadingCircle,
  'four-dots': _Multiple.FourDots,
  'scale-circle': _Multiple.ScaleCircle,
  'three-bounce': _Multiple.ThreeBounce
};

function renderContainer(Loading, props) {
  // eslint-disable-next-line react/prop-types
  var loading = props.loading,
      children = props.children;
  return _react.default.createElement("div", {
    className: (0, _styles.spinClass)('container', loading && 'show')
  }, _react.default.createElement("div", {
    className: (0, _styles.spinClass)('content')
  }, children), loading && _react.default.createElement("div", {
    className: (0, _styles.spinClass)('loading')
  }, Loading));
}

function getName(name) {
  if (name !== undefined) return name;
  if (_config.default.spin !== undefined) return _config.default.spin;
  return 'default';
}

function Spin(props) {
  var children = props.children,
      style = props.style,
      className = props.className,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "style", "className"]);
  var name = getName(props.name);
  var Component = spins[name];

  if (!Component) {
    console.warn("Spin type '" + name + "' not existed.");
    return null;
  }

  var classes = (0, _classnames.default)((0, _styles.spinClass)('_'), className);
  var wrapperStyle = Object.assign({
    margin: props.margin,
    color: props.color
  }, style);
  var Content;

  if (!('tip' in props)) {
    Content = _react.default.createElement(Component, (0, _extends2.default)({}, rest, {
      sry: true,
      wrapperStyle: wrapperStyle,
      wrapperClass: className
    }));
  } else {
    Content = _react.default.createElement("div", {
      className: classes,
      style: wrapperStyle
    }, _react.default.createElement(Component, rest), props.tip && _react.default.createElement("div", {
      className: (0, _styles.spinClass)('tip')
    }, typeof props.tip === 'string' ? _react.default.createElement("span", null, props.tip) : props.tip));
  }

  if (children) return renderContainer(Content, props);
  return Content;
}

Spin.displayName = 'ShineoutSpin';
Spin.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  color: _propTypes.default.string,
  tip: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  children: _propTypes.default.node,
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  name: _propTypes.default.oneOf(['default', 'chasing-ring', 'chasing-dots', 'cube-grid', 'double-bounce', 'fading-circle', 'four-dots', 'plane', 'pulse', 'ring', 'scale-circle', 'three-bounce', 'wave'])
});
Spin.defaultProps = {
  color: '#6c757d',
  size: 40
};

var _default = (0, _config2.default)(Spin, 'spin');

exports.default = _default;