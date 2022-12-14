import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps, defaultProps } from '../utils/proptypes';
import Spin from '../Spin';
import { wrapSpan } from '../utils/dom/element';
import { buttonClass } from './styles';
import { isRTL } from '../config';
import { getDirectionClass } from '../utils/classname';

var Button =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Button, _PureComponent);

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
    var parsed = React.Children.map(wrapSpan(children, space), function (item) {
      if (loading && isValidElement(item) && item.type.isShineoutIcon) return null;
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
        others = _objectWithoutPropertiesLoose(_this$props2, ["outline", "type", "size", "href", "htmlType", "loading", "disabled", "onRef", "shape", "text", "space"]);

    var isSecondary = typeProp === 'secondary' && !outlineProp && !text;
    var type = isSecondary ? 'primary' : typeProp;
    var outline = outlineProp || isSecondary;
    var color = outline || type === 'default' ? undefined : '#fff';
    if (text) color = 'currentColor';
    var className = classnames(buttonClass('_', shape, type, outline && 'outline', {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
      rtl: isRTL(),
      disabled: disabled
    }), this.props.className);

    if (href && !disabled) {
      return React.createElement("a", _extends({
        href: href
      }, others, {
        className: className
      }), this.props.children);
    }

    var children = this.getChildren();
    return (// eslint-disable-next-line
      React.createElement("button", _extends({}, others, {
        ref: onRef,
        disabled: disabled || loading,
        type: htmlType,
        className: className
      }), loading && React.createElement("span", {
        className: buttonClass(getDirectionClass('spin'))
      }, React.createElement(Spin, {
        size: 12,
        name: "ring",
        color: color
      })), children)
    );
  };

  return Button;
}(PureComponent);

Button.propTypes = _objectSpread({}, getProps(PropTypes, 'disabled', 'size', 'type'), {
  children: PropTypes.any,
  href: PropTypes.string,
  htmlType: PropTypes.oneOf(['button', 'reset', 'submit']),
  loading: PropTypes.bool,
  onRef: PropTypes.func,
  shape: PropTypes.oneOf(['round', 'circle']),
  outline: PropTypes.bool,
  text: PropTypes.bool,
  space: PropTypes.bool
});
Button.defaultProps = _objectSpread({}, defaultProps, {
  htmlType: 'button',
  outline: false,
  type: 'default'
});
export default Button;