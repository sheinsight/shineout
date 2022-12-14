import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cardClass } from './styles';
import { isRTL } from '../config';

var Footer =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Footer, _PureComponent);

  function Footer() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Footer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        align = _this$props.align,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["align", "className"]);

    var newClassName = classnames(cardClass('footer', align, isRTL() && 'footer-rtl'), className);
    return React.createElement("div", _extends({}, props, {
      className: newClassName
    }));
  };

  return Footer;
}(PureComponent);

_defineProperty(Footer, "propTypes", {
  align: PropTypes.string,
  className: PropTypes.string
});

export { Footer as default };