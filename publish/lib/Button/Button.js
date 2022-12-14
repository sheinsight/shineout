"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _Spin = _interopRequireDefault(require("../Spin"));

var _element = require("../utils/dom/element");

var _styles = require("./styles");

var _config = require("../config");

var _classname = require("../utils/classname");

var Button =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Button, _PureComponent);

  function Button() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.getChildren = function getChildren() {
    var _this$props = this.props,
        children = _this$props.children,
        loading = _this$props.loading,
        space = _this$props.space;
    if (!children) return children;

    var parsed = _react.default.Children.map((0, _element.wrapSpan)(children, space), function (item) {
      if (loading && (0, _react.isValidElement)(item) && item.type.isShineoutIcon) return null;
      return item;
    }).filter(function (v) {
      return v !== null;
    });

    return parsed;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        outlineProp = _this$props2.outline,
        typeProp = _this$props2.type,
        size = _this$props2.size,
        href = _this$props2.href,
        htmlType = _this$props2.htmlType,
        loading = _this$props2.loading,
        disabled = _this$props2.disabled,
        onRef = _this$props2.onRef,
        shape = _this$props2.shape,
        text = _this$props2.text,
        space = _this$props2.space,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["outline", "type", "size", "href", "htmlType", "loading", "disabled", "onRef", "shape", "text", "space"]);
    var isSecondary = typeProp === 'secondary' && !outlineProp && !text;
    var type = isSecondary ? 'primary' : typeProp;
    var outline = outlineProp || isSecondary;
    var color = outline || type === 'default' ? undefined : '#fff';
    if (text) color = 'currentColor';
    var className = (0, _classnames.default)((0, _styles.buttonClass)('_', shape, type, outline && 'outline', {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
      rtl: (0, _config.isRTL)(),
      disabled: disabled
    }), this.props.className);

    if (href && !disabled) {
      return _react.default.createElement("a", (0, _extends2.default)({
        href: href
      }, others, {
        className: className
      }), this.props.children);
    }

    var children = this.getChildren();
    return (// eslint-disable-next-line
      _react.default.createElement("button", (0, _extends2.default)({}, others, {
        ref: onRef,
        disabled: disabled || loading,
        type: htmlType,
        className: className
      }), loading && _react.default.createElement("span", {
        className: (0, _styles.buttonClass)((0, _classname.getDirectionClass)('spin'))
      }, _react.default.createElement(_Spin.default, {
        size: 12,
        name: "ring",
        color: color
      })), children)
    );
  };

  return Button;
}(_react.PureComponent);

Button.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'disabled', 'size', 'type'), {
  children: _propTypes.default.any,
  href: _propTypes.default.string,
  htmlType: _propTypes.default.oneOf(['button', 'reset', 'submit']),
  loading: _propTypes.default.bool,
  onRef: _propTypes.default.func,
  shape: _propTypes.default.oneOf(['round', 'circle']),
  outline: _propTypes.default.bool,
  text: _propTypes.default.bool,
  space: _propTypes.default.bool
});
Button.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  htmlType: 'button',
  outline: false,
  type: 'default'
});
var _default = Button;
exports.default = _default;