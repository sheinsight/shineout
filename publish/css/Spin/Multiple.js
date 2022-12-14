"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.DoubleBounce = DoubleBounce;
exports.Wave = Wave;
exports.CubeGrid = CubeGrid;
exports.ChasingRing = ChasingRing;
exports.Default = Default;
exports.ThreeBounce = ThreeBounce;
exports.ChasingDots = ChasingDots;
exports.FourDots = FourDots;
exports.FadingCircle = exports.ScaleCircle = void 0;

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

function simpleRender(classname, i, _ref) {
  var color = _ref.color,
      itemStyle = _ref.itemStyle;
  var style = Object.assign({
    backgroundColor: color
  }, itemStyle);
  return _react.default.createElement("div", {
    key: i,
    style: style,
    className: classname('item')
  });
}

function DoubleBounce(props) {
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, props, {
    count: 2,
    spinClass: _styles.doubleBounceClass,
    render: simpleRender
  }));
}

function Wave(prop) {
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

  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, prop, {
    itemStyle: {
      width: width + unit,
      marginRight: margin
    },
    count: 5,
    spinClass: _styles.waveClass,
    render: simpleRender
  }));
}

function CubeGrid(props) {
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, props, {
    count: 9,
    spinClass: _styles.cubeGridClass,
    render: simpleRender
  }));
}

function ChasingRing(prop) {
  var _formatSize2 = formatSize(prop.size),
      value = _formatSize2.value,
      unit = _formatSize2.unit;

  var borderWidth = "" + value / 10 + unit;
  var style = {
    borderWidth: borderWidth,
    borderTopColor: prop.color,
    backgroundColor: 'transparent'
  };
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, prop, {
    count: 4,
    itemStyle: style,
    spinClass: _styles.chasingRingClass,
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
  return _react.default.createElement("div", {
    key: i,
    className: className('item', itemClass)
  }, _react.default.createElement("div", {
    style: style
  }));
}

function Default(prop) {
  var _formatSize3 = formatSize(prop.size),
      value = _formatSize3.value,
      unit = _formatSize3.unit;

  var size = Math.ceil(value / 12.5) + unit;
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, prop, {
    count: 12,
    itemStyle: {
      width: size,
      borderRadius: size
    },
    spinClass: _styles.defaultClass,
    render: multRenderDiv
  }));
} // =============================================================================


function multRenderSvg(className, i, _ref3) {
  var color = _ref3.color,
      itemSize = _ref3.itemSize,
      itemClass = _ref3.itemClass;
  return _react.default.createElement("div", {
    key: i,
    className: className('item', itemClass)
  }, _react.default.createElement("svg", {
    width: itemSize,
    height: itemSize,
    viewBox: "0 0 100 100"
  }, _react.default.createElement("circle", {
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
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, prop, {
    count: 12,
    itemSize: itemSize,
    itemClass: type,
    spinClass: _styles.scaleCircleClass,
    render: multRenderSvg
  }));
}

var ScaleCircle = function ScaleCircle(opt) {
  return twelveCircle(opt, 'scale');
};

exports.ScaleCircle = ScaleCircle;

var FadingCircle = function FadingCircle(opt) {
  return twelveCircle(opt, 'fade');
};

exports.FadingCircle = FadingCircle;

function ThreeBounce(prop) {
  var _formatSize5 = formatSize(prop.size),
      value = _formatSize5.value,
      unit = _formatSize5.unit;

  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, prop, {
    count: 3,
    style: {
      width: value * 2 + unit,
      height: 'auto'
    },
    itemSize: value / 2 + unit,
    spinClass: _styles.threeBounceClass,
    render: multRenderSvg
  }));
}

function ChasingDots(props) {
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, props, {
    count: 2,
    spinClass: _styles.chasingDotsClass,
    render: multRenderSvg
  }));
}

function FourDots(props) {
  return _react.default.createElement(_Spin.default, (0, _extends2.default)({}, props, {
    count: 4,
    spinClass: _styles.fourDotsClass,
    render: multRenderSvg
  }));
}