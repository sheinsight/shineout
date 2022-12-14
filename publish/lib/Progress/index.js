"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Line = _interopRequireDefault(require("./Line"));

var _Circle = _interopRequireDefault(require("./Circle"));

function Progress(props) {
  switch (props.shape) {
    case 'circle':
      return _react.default.createElement(_Circle.default, props);

    default:
      return _react.default.createElement(_Line.default, props);
  }
}

Progress.propTypes = {
  shape: _propTypes.default.oneOf(['line', 'circle'])
};
Progress.defaultProps = {
  shape: 'line'
};
Progress.displayName = 'ShineoutProgress';
var _default = Progress;
exports.default = _default;