"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox/Checkbox"));

var _styles = require("./styles");

var _Lazyload = _interopRequireDefault(require("../Lazyload"));

var Item =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Item, _React$Component);

  function Item() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Item.prototype;

  _proto.handleChange = function handleChange(value, _, checked) {
    var onChange = this.props.onChange;
    if (onChange) onChange(checked, value);
  };

  _proto.renderChildren = function renderChildren(content) {
    var _this$props = this.props,
        placeholder = _this$props.placeholder,
        container = _this$props.container;
    if (!placeholder) return content;
    return _react.default.createElement(_Lazyload.default, {
      container: container,
      placeholder: placeholder
    }, content);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        style = _this$props2.style,
        className = _this$props2.className,
        container = _this$props2.container,
        children = _this$props2.children,
        placeholder = _this$props2.placeholder,
        value = _this$props2.value,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["style", "className", "container", "children", "placeholder", "value"]);
    var cls = (0, _classnames.default)((0, _styles.cardGroupClass)('item'), className);
    var showCheck = others.checked !== undefined;

    var content = _react.default.createElement(_react.Fragment, null, children, showCheck && _react.default.createElement(_Checkbox.default, (0, _extends2.default)({}, others, {
      onChange: this.handleChange.bind(this, value),
      className: (0, _styles.cardGroupClass)('checkbox')
    })));

    return _react.default.createElement("div", {
      style: style,
      className: cls
    }, this.renderChildren(content));
  };

  return Item;
}(_react.default.Component);

Item.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  container: _propTypes.default.object,
  children: _propTypes.default.element,
  placeholder: _propTypes.default.element,
  onChange: _propTypes.default.func,
  value: _propTypes.default.any,
  checked: _propTypes.default.oneOfType([_propTypes.default.oneOf([true, false, 'indeterminate']), _propTypes.default.func])
};
var _default = Item;
exports.default = _default;