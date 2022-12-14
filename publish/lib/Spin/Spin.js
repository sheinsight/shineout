"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = Spin;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _numbers = require("../utils/numbers");

function Spin(props) {
  var spinClass = props.spinClass,
      count = props.count,
      render = props.render,
      size = props.size,
      wrapperClass = props.wrapperClass,
      wrapperStyle = props.wrapperStyle;
  var style = Object.assign({
    width: size,
    height: size
  }, props.style, wrapperStyle);
  var className = (0, _classnames.default)(spinClass('_'), wrapperClass);

  if (count < 1) {
    return _react.default.createElement("div", {
      style: style,
      className: className
    });
  }

  return _react.default.createElement("div", {
    style: style,
    className: className
  }, (0, _numbers.range)(count + 1, 1).map(function (i) {
    return render(spinClass, i, props);
  }));
}

Spin.propTypes = {
  count: _propTypes.default.number,
  render: _propTypes.default.func,
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  spinClass: _propTypes.default.func,
  style: _propTypes.default.object,
  wrapperClass: _propTypes.default.string,
  wrapperStyle: _propTypes.default.object
};
Spin.defaultProps = {
  count: 0
};