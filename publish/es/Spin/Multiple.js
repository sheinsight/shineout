import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Spin from './Spin';
import { defaultClass, chasingDotsClass, doubleBounceClass, waveClass, cubeGridClass, chasingRingClass, scaleCircleClass, threeBounceClass, fourDotsClass } from './styles';

function formatSize(size) {
  var ss = /^(\d+)([%|\w]*)$/.exec(size);
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px'
  };
}

function simpleRender(classname, i, _ref) {
  var color = _ref.color,
      itemStyle = _ref.itemStyle;
  var style = Object.assign({
    backgroundColor: color
  }, itemStyle);
  return React.createElement("div", {
    key: i,
    style: style,
    className: classname('item')
  });
}

export function DoubleBounce(props) {
  return React.createElement(Spin, _extends({}, props, {
    count: 2,
    spinClass: doubleBounceClass,
    render: simpleRender
  }));
}
export function Wave(prop) {
  var _formatSize = formatSize(prop.size),
      value = _formatSize.value,
      unit = _formatSize.unit;

  var width = value / 7;
  var margin = value / 20;

  if (unit === 'px') {
    width = Math.floor(width);
    margin = Math.ceil(margin) + unit;
  } else {
    margin = '2px';
  }

  return React.createElement(Spin, _extends({}, prop, {
    itemStyle: {
      width: width + unit,
      marginRight: margin
    },
    count: 5,
    spinClass: waveClass,
    render: simpleRender
  }));
}
export function CubeGrid(props) {
  return React.createElement(Spin, _extends({}, props, {
    count: 9,
    spinClass: cubeGridClass,
    render: simpleRender
  }));
}
export function ChasingRing(prop) {
  var _formatSize2 = formatSize(prop.size),
      value = _formatSize2.value,
      unit = _formatSize2.unit;

  var borderWidth = "" + value / 10 + unit;
  var style = {
    borderWidth: borderWidth,
    borderTopColor: prop.color,
    backgroundColor: 'transparent'
  };
  return React.createElement(Spin, _extends({}, prop, {
    count: 4,
    itemStyle: style,
    spinClass: chasingRingClass,
    render: simpleRender
  }));
} // =============================================================================

function multRenderDiv(className, i, _ref2) {
  var color = _ref2.color,
      itemStyle = _ref2.itemStyle,
      itemClass = _ref2.itemClass;
  var style = Object.assign({
    backgroundColor: color
  }, itemStyle);
  return React.createElement("div", {
    key: i,
    className: className('item', itemClass)
  }, React.createElement("div", {
    style: style
  }));
}

export function Default(prop) {
  var _formatSize3 = formatSize(prop.size),
      value = _formatSize3.value,
      unit = _formatSize3.unit;

  var size = Math.ceil(value / 12.5) + unit;
  return React.createElement(Spin, _extends({}, prop, {
    count: 12,
    itemStyle: {
      width: size,
      borderRadius: size
    },
    spinClass: defaultClass,
    render: multRenderDiv
  }));
} // =============================================================================

function multRenderSvg(className, i, _ref3) {
  var color = _ref3.color,
      itemSize = _ref3.itemSize,
      itemClass = _ref3.itemClass;
  return React.createElement("div", {
    key: i,
    className: className('item', itemClass)
  }, React.createElement("svg", {
    width: itemSize,
    height: itemSize,
    viewBox: "0 0 100 100"
  }, React.createElement("circle", {
    fill: color,
    cx: 50,
    cy: 50,
    r: 50
  })));
}

function twelveCircle(prop, type) {
  var _formatSize4 = formatSize(prop.size),
      value = _formatSize4.value,
      unit = _formatSize4.unit;

  var itemSize = (value / 7).toFixed(3) + unit;
  return React.createElement(Spin, _extends({}, prop, {
    count: 12,
    itemSize: itemSize,
    itemClass: type,
    spinClass: scaleCircleClass,
    render: multRenderSvg
  }));
}

export var ScaleCircle = function ScaleCircle(opt) {
  return twelveCircle(opt, 'scale');
};
export var FadingCircle = function FadingCircle(opt) {
  return twelveCircle(opt, 'fade');
};
export function ThreeBounce(prop) {
  var _formatSize5 = formatSize(prop.size),
      value = _formatSize5.value,
      unit = _formatSize5.unit;

  return React.createElement(Spin, _extends({}, prop, {
    count: 3,
    style: {
      width: value * 2 + unit,
      height: 'auto'
    },
    itemSize: value / 2 + unit,
    spinClass: threeBounceClass,
    render: multRenderSvg
  }));
}
export function ChasingDots(props) {
  return React.createElement(Spin, _extends({}, props, {
    count: 2,
    spinClass: chasingDotsClass,
    render: multRenderSvg
  }));
}
export function FourDots(props) {
  return React.createElement(Spin, _extends({}, props, {
    count: 4,
    spinClass: fourDotsClass,
    render: multRenderSvg
  }));
}