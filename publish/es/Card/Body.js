import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import List from '../AnimationList';
import { cardClass } from './styles';
import { isRTL } from '../config';
var CollapseList = List(['collapse'], 'fast');

var Body =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Body, _PureComponent);

  function Body() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Body.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        collapsed = _this$props.collapsed,
        collapsible = _this$props.collapsible,
        onCollapse = _this$props.onCollapse,
        other = _objectWithoutPropertiesLoose(_this$props, ["className", "collapsed", "collapsible", "onCollapse"]);

    var newClassName = classnames(cardClass('body', isRTL() && 'body-rtl'), className);
    if (!collapsible) return React.createElement("div", _extends({}, other, {
      className: newClassName
    }));
    var onClick = typeof collapsed === 'boolean' ? onCollapse : undefined;
    return React.createElement(CollapseList, {
      show: !collapsed
    }, React.createElement("div", _extends({}, other, {
      className: newClassName
    }), other.children, collapsible === 'bottom' && React.createElement("div", {
      className: cardClass('foldup'),
      onClick: onClick
    }, React.createElement("span", null))));
  };

  return Body;
}(PureComponent);

_defineProperty(Body, "propTypes", {
  children: PropTypes.any,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsible: PropTypes.bool,
  style: PropTypes.object,
  onCollapse: PropTypes.func
});

Body.propTypes = {};
export default Body;