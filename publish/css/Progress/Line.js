"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _analyzeColor = _interopRequireDefault(require("./analyzeColor"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _config = require("../config");

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
  var className = (0, _classnames.default)((0, _styles.progressClass)('line', type, isPopup && 'line-popup', (0, _config.isRTL)() && 'rtl'), props.className);
  var innerStyle = {
    width: value / 100 * 100 + "%",
    borderRadius: strokeWidth / 2
  };

  if (typeof color === 'string') {
    innerStyle.background = color;
    innerStyle.backgroundSize = '1em 1em';
  } else if (typeof color === 'object') {
    innerStyle.background = "linear-gradient(to right, " + (0, _analyzeColor.default)(color).reduce(function (p, v) {
      var col = v.color + " " + v.pos;
      return p ? p + "," + col : col;
    }, '') + ")";
  }

  return _react.default.createElement("div", {
    className: className,
    style: style
  }, _react.default.createElement("div", {
    className: (0, _styles.progressClass)('background'),
    style: {
      height: strokeWidth,
      background: background,
      borderRadius: strokeWidth / 2
    }
  }, _react.default.createElement("div", {
    className: (0, _styles.progressClass)('front'),
    style: innerStyle
  })), hasChildren && (popup ? _react.default.createElement(_Popup.default, (0, _extends2.default)({}, props, {
    value: value
  })) : _react.default.createElement("div", {
    className: (0, _styles.progressClass)('content')
  }, children)));
}

Line.propTypes = {
  background: _propTypes.default.string,
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  color: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  strokeWidth: _propTypes.default.number,
  style: _propTypes.default.object,
  type: _propTypes.default.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: _propTypes.default.number,
  popup: _propTypes.default.bool
};
Line.defaultProps = {
  strokeWidth: 8
};
var _default = Line;
exports.default = _default;