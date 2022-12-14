"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _is = require("../utils/is");

var Link =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Link, _PureComponent);

  function Link() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Link.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        href = _this$props.href,
        className = _this$props.className,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "href", "className"]);
    var mergeClass = (0, _classnames.default)(className, (0, _styles.tabsClass)('link'));
    var props = (0, _objectSpread2.default)({
      className: mergeClass,
      href: href
    }, other);

    if ((0, _is.isLink)(children)) {
      if (children.props.onClick) {
        props.onClick = function () {
          children.props.onClick();
          other.onClick();
        };
      }

      return _react.default.cloneElement(children, (0, _objectSpread2.default)({}, props));
    }

    return _react.default.createElement("a", props, children);
  };

  return Link;
}(_react.PureComponent);

Link.isTabLink = true;
Link.propTypes = {
  className: _propTypes.default.string,
  href: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
};
var _default = Link;
exports.default = _default;