import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import List from '../AnimationList';
import { tabsClass } from './styles';
var CollapseList = List(['collapse'], 'fast');

var Panel =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Panel, _PureComponent);

  function Panel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.isPristine = true;
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        background = _this$props.background,
        color = _this$props.color,
        isActive = _this$props.isActive,
        collapsible = _this$props.collapsible,
        collapsed = _this$props.collapsed,
        lazy = _this$props.lazy;
    if (!isActive && this.isPristine && lazy) return null;
    this.isPristine = false;
    var style = Object.assign({
      background: background || '#fff',
      color: color
    }, this.props.style);
    var className = classnames(tabsClass('panel', isActive && 'show'), this.props.className);
    var result = React.createElement("div", {
      style: style,
      className: className
    }, children);
    if (!collapsible) return result;
    return React.createElement(CollapseList, {
      show: !collapsed
    }, result);
  };

  return Panel;
}(PureComponent);

Panel.isTabPanel = true;
Panel.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsible: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.any,
  isActive: PropTypes.bool,
  style: PropTypes.object,
  lazy: PropTypes.bool
};
export default Panel;