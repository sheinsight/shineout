"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function Group(props) {
  var children = props.children,
      style = props.style,
      inputFocus = props.inputFocus,
      other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "style", "inputFocus"]);
  return _react.Children.toArray(children).map(function (child, i) {
    if (typeof child === 'string') {
      return _react.default.createElement("span", {
        key: i
      }, child);
    }

    return (0, _react.cloneElement)(child, other);
  });
}

Group.propTypes = {
  children: _propTypes.default.any
};
var _default = Group;
exports.default = _default;