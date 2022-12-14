import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tabsClass } from './styles';
import { isLink } from '../utils/is';

var Link =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Link, _PureComponent);

  function Link() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Link.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        href = _this$props.href,
        className = _this$props.className,
        other = _objectWithoutPropertiesLoose(_this$props, ["children", "href", "className"]);

    var mergeClass = classnames(className, tabsClass('link'));

    var props = _objectSpread({
      className: mergeClass,
      href: href
    }, other);

    if (isLink(children)) {
      if (children.props.onClick) {
        props.onClick = function () {
          children.props.onClick();
          other.onClick();
        };
      }

      return React.cloneElement(children, _objectSpread({}, props));
    }

    return React.createElement("a", props, children);
  };

  return Link;
}(PureComponent);

Link.isTabLink = true;
Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
export default Link;