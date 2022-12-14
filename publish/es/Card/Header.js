import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from '../icons';
import { cardClass } from './styles';
import { isRTL } from '../config';

var Header =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Header, _PureComponent);

  function Header() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.renderIndicator = function renderIndicator() {
    var collapsed = this.props.collapsed;
    if (collapsed === undefined) return undefined;
    var className = cardClass('indicator');
    return React.createElement("span", {
      className: className
    }, icons.AngleRight);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        align = _this$props.align,
        className = _this$props.className,
        children = _this$props.children,
        onCollapse = _this$props.onCollapse,
        collapsed = _this$props.collapsed;
    var newClassName = classnames(cardClass('header', align, isRTL() && 'header-rtl'), className);
    var onClick = typeof collapsed === 'boolean' ? onCollapse : undefined;
    return React.createElement("div", {
      style: style,
      onClick: onClick,
      className: newClassName
    }, this.renderIndicator(), children);
  };

  return Header;
}(PureComponent);

_defineProperty(Header, "propTypes", {
  align: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  style: PropTypes.object
});

export { Header as default };