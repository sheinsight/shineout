import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tabsClass } from './styles';
import { getUidStr } from '../utils/uid';
import { defer } from '../utils/uid';
import getDataset from '../utils/dom/getDataset';
import { getDirectionClass } from '../utils/classname';

var Tab =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tab, _PureComponent);

  function Tab(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.getActiveStyle = _this.getActiveStyle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.uid = "tab_unique_" + getUidStr();
    return _this;
  }

  var _proto = Tab.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    defer(function () {
      if (_this2.props.isActive) _this2.handleClick(true);
    });
  };

  _proto.getActiveStyle = function getActiveStyle() {
    var _this$props = this.props,
        shape = _this$props.shape,
        align = _this$props.align,
        background = _this$props.background,
        color = _this$props.color,
        border = _this$props.border,
        isActive = _this$props.isActive,
        isVertical = _this$props.isVertical;
    if (shape === 'line' || shape === 'dash') return {};
    var style = {
      background: background,
      color: color
    };
    if (shape === 'bordered') return {
      background: background
    };
    if (shape !== 'line' && !isVertical) style.borderColor = border + " " + border + " " + (isActive ? background : border) + " " + border;
    if (shape !== 'line' && align === 'vertical-left') style.borderColor = border + " " + (isActive ? background : border) + "  " + border + " " + border;
    if (shape !== 'line' && align === 'vertical-right') style.borderColor = border + " " + border + " " + border + " " + (isActive ? background : border);
    return style;
  };

  _proto.handleClick = function handleClick(init) {
    var _this$props2 = this.props,
        onClick = _this$props2.onClick,
        id = _this$props2.id,
        isActive = _this$props2.isActive,
        disabled = _this$props2.disabled,
        last = _this$props2.last;
    if (disabled) return;
    if (init !== true) onClick(id, isActive);

    if (!this.element) {
      this.element = document.querySelector("." + this.uid);
    }

    if (this.element && this.element.getBoundingClientRect) {
      this.props.moveToCenter(this.element.getBoundingClientRect(), last, id === 0);
    }
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        isActive = _this$props3.isActive,
        disabled = _this$props3.disabled,
        children = _this$props3.children,
        shape = _this$props3.shape,
        otherProps = _objectWithoutPropertiesLoose(_this$props3, ["isActive", "disabled", "children", "shape"]);

    var style = this.getActiveStyle();
    var isBordered = shape === 'bordered';

    var props = _objectSpread({
      className: classnames(tabsClass('tab', isActive && (isBordered ? 'tab-bordered-active' : 'active'), disabled && 'disabled', isBordered && getDirectionClass('tab-bordered')), this.uid),
      onClick: this.handleClick,
      style: style
    }, getDataset(otherProps));

    if (children.type && children.type.isTabLink) {
      return React.cloneElement(children, _objectSpread({}, props));
    }

    return React.createElement("div", props, children);
  };

  return Tab;
}(PureComponent);

Tab.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  isVertical: PropTypes.bool,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  moveToCenter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  shape: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right', 'vertical-left', 'vertical-right']),
  last: PropTypes.bool
};
Tab.defaultProps = {// border: 'transparent',
};
export default Tab;