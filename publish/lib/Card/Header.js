"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = _interopRequireDefault(require("../icons"));

var _styles = require("./styles");

var _config = require("../config");

var Header =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Header, _PureComponent);

  function Header() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.renderIndicator = function renderIndicator() {
    var collapsed = this.props.collapsed;
    if (collapsed === undefined) return undefined;
    var className = (0, _styles.cardClass)('indicator');
    return _react.default.createElement("span", {
      className: className
    }, _icons.default.AngleRight);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        align = _this$props.align,
        className = _this$props.className,
        children = _this$props.children,
        onCollapse = _this$props.onCollapse,
        collapsed = _this$props.collapsed;
    var newClassName = (0, _classnames.default)((0, _styles.cardClass)('header', align, (0, _config.isRTL)() && 'header-rtl'), className);
    var onClick = typeof collapsed === 'boolean' ? onCollapse : undefined;
    return _react.default.createElement("div", {
      style: style,
      onClick: onClick,
      className: newClassName
    }, this.renderIndicator(), children);
  };

  return Header;
}(_react.PureComponent);

exports.default = Header;
(0, _defineProperty2.default)(Header, "propTypes", {
  align: _propTypes.default.string,
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  collapsed: _propTypes.default.bool,
  onCollapse: _propTypes.default.func,
  style: _propTypes.default.object
});