import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Fragment } from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';
import { cardGroupClass } from './styles';
import Lazyload from '../Lazyload';

var Item =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Item, _React$Component);

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
    return React.createElement(Lazyload, {
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
        others = _objectWithoutPropertiesLoose(_this$props2, ["style", "className", "container", "children", "placeholder", "value"]);

    var cls = classname(cardGroupClass('item'), className);
    var showCheck = others.checked !== undefined;
    var content = React.createElement(Fragment, null, children, showCheck && React.createElement(Checkbox, _extends({}, others, {
      onChange: this.handleChange.bind(this, value),
      className: cardGroupClass('checkbox')
    })));
    return React.createElement("div", {
      style: style,
      className: cls
    }, this.renderChildren(content));
  };

  return Item;
}(React.Component);

Item.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  container: PropTypes.object,
  children: PropTypes.element,
  placeholder: PropTypes.element,
  onChange: PropTypes.func,
  value: PropTypes.any,
  checked: PropTypes.oneOfType([PropTypes.oneOf([true, false, 'indeterminate']), PropTypes.func])
};
export default Item;