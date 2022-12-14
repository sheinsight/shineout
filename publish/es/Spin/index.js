import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import config from '../config';
import configable from '../hoc/config';
import { spinClass } from './styles';
import { ChasingDots, DoubleBounce, ThreeBounce, ScaleCircle, FadingCircle, CubeGrid, ChasingRing, Wave, FourDots, Default } from './Multiple';
import { Ring, Plane, Pulse } from './Simple';
import { getProps } from '../utils/proptypes';
var spins = {
  plane: Plane,
  pulse: Pulse,
  ring: Ring,
  wave: Wave,
  default: Default,
  'chasing-ring': ChasingRing,
  'chasing-dots': ChasingDots,
  'cube-grid': CubeGrid,
  'double-bounce': DoubleBounce,
  'fading-circle': FadingCircle,
  'four-dots': FourDots,
  'scale-circle': ScaleCircle,
  'three-bounce': ThreeBounce
};

function renderContainer(Loading, props) {
  // eslint-disable-next-line react/prop-types
  var loading = props.loading,
      children = props.children;
  return React.createElement("div", {
    className: spinClass('container', loading && 'show')
  }, React.createElement("div", {
    className: spinClass('content')
  }, children), loading && React.createElement("div", {
    className: spinClass('loading')
  }, Loading));
}

function getName(name) {
  if (name !== undefined) return name;
  if (config.spin !== undefined) return config.spin;
  return 'default';
}

function Spin(props) {
  var children = props.children,
      style = props.style,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["children", "style", "className"]);

  var name = getName(props.name);
  var Component = spins[name];

  if (!Component) {
    console.warn("Spin type '" + name + "' not existed.");
    return null;
  }

  var classes = classnames(spinClass('_'), className);
  var wrapperStyle = Object.assign({
    margin: props.margin,
    color: props.color
  }, style);
  var Content;

  if (!('tip' in props)) {
    Content = React.createElement(Component, _extends({}, rest, {
      sry: true,
      wrapperStyle: wrapperStyle,
      wrapperClass: className
    }));
  } else {
    Content = React.createElement("div", {
      className: classes,
      style: wrapperStyle
    }, React.createElement(Component, rest), props.tip && React.createElement("div", {
      className: spinClass('tip')
    }, typeof props.tip === 'string' ? React.createElement("span", null, props.tip) : props.tip));
  }

  if (children) return renderContainer(Content, props);
  return Content;
}

Spin.displayName = 'ShineoutSpin';
Spin.propTypes = _objectSpread({}, getProps(PropTypes), {
  color: PropTypes.string,
  tip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  children: PropTypes.node,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.oneOf(['default', 'chasing-ring', 'chasing-dots', 'cube-grid', 'double-bounce', 'fading-circle', 'four-dots', 'plane', 'pulse', 'ring', 'scale-circle', 'three-bounce', 'wave'])
});
Spin.defaultProps = {
  color: '#6c757d',
  size: 40
};
export default configable(Spin, 'spin');