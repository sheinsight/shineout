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

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

function Icon(props) {
  var children = props.children,
      prefix = props.prefix,
      type = props.type,
      name = props.name,
      fontFamily = props.fontFamily,
      fontSize = props.fontSize,
      ext = props.ext,
      otherProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "prefix", "type", "name", "fontFamily", "fontSize", "ext"]);
  var className = (0, _classnames.default)((0, _styles.iconClass)('_', type), props.className, prefix + "-" + name);
  var style = Object.assign({}, {
    fontFamily: fontFamily,
    fontSize: fontSize
  }, props.style);

  if (ext === 'js') {
    return _react.default.createElement("i", (0, _extends2.default)({}, otherProps, {
      className: className,
      style: style
    }), _react.default.createElement("svg", {
      className: (0, _styles.iconClass)('svg'),
      "aria-hidden": "true"
    }, _react.default.createElement("use", {
      xlinkHref: "#" + prefix + "-" + name
    })));
  }

  return _react.default.createElement("i", (0, _extends2.default)({}, otherProps, {
    className: className,
    style: style
  }), children);
}

Icon.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'children', 'size', 'type'), {
  prefix: _propTypes.default.string,
  name: _propTypes.default.string,
  fontFamily: _propTypes.default.string,
  fontSize: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});
Icon.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  prefix: 'icon',
  fontFamily: 'iconfont',
  name: '',
  type: 'default'
});
Icon.displayName = 'ShineoutIcon';
var _default = Icon;
exports.default = _default;