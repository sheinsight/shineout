import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import Header from './Header';
import getDataset from '../utils/dom/getDataset';
import Wrapper from './Wrapper';
import Sticky from '../Sticky';
import { tabsClass } from './styles';
import { isEmpty, isObject } from '../utils/is';
import { isRTL } from '../config';

var Tabs =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tabs, _PureComponent);

  function Tabs(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      active: props.defaultActive || 0,
      collapsed: props.defaultCollapsed
    };
    _this.getAlign = _this.getAlign.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCollapse = _this.handleCollapse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderContent = _this.renderContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindContainer = _this.bindContainer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setStickyStatus = _this.setStickyStatus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Tabs.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props = this.props,
        sticky = _this$props.sticky,
        switchToTop = _this$props.switchToTop,
        active = _this$props.active;

    if ((prevProps.active !== active || prevState.active !== this.state.active) && this.container && !isEmpty(sticky) && switchToTop && this.sticky) {
      // jump to active panel
      this.container.scrollIntoView(true);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.container = null;
  };

  _proto.getAlign = function getAlign() {
    var _this$props2 = this.props,
        shape = _this$props2.shape,
        collapsible = _this$props2.collapsible,
        align = _this$props2.align;
    var isVertical = align && align.indexOf('vertical') > -1;

    if (shape === 'button' && isVertical) {
      console.warn("align vertical-* can't supported when shape is button");
      return {
        align: 'left',
        isVertical: false
      };
    }

    if (collapsible && isVertical) {
      console.warn("align vertical-* can't supported when collapsible is true");
      return {
        align: 'left',
        isVertical: false
      };
    }

    return {
      align: align,
      isVertical: isVertical
    };
  };

  _proto.getActive = function getActive() {
    if ('active' in this.props) return this.props.active;
    return this.state.active;
  };

  _proto.setStickyStatus = function setStickyStatus(flag) {
    var _this$props3 = this.props,
        sticky = _this$props3.sticky,
        switchToTop = _this$props3.switchToTop;
    if (!sticky || !switchToTop) return;
    this.sticky = flag;
  };

  _proto.bindContainer = function bindContainer(node) {
    this.container = node;
  };

  _proto.handleChange = function handleChange(active) {
    var onChange = this.props.onChange;
    if (onChange) onChange(active);
    this.setState({
      active: active
    });
  };

  _proto.handleCollapse = function handleCollapse(collapsed) {
    this.setState({
      collapsed: collapsed
    });
  };

  _proto.renderHeader = function renderHeader(_ref) {
    var _this2 = this;

    var align = _ref.align,
        isVertical = _ref.isVertical;
    var _this$props4 = this.props,
        children = _this$props4.children,
        color = _this$props4.color,
        shape = _this$props4.shape,
        tabBarStyle = _this$props4.tabBarStyle,
        inactiveBackground = _this$props4.inactiveBackground,
        collapsible = _this$props4.collapsible,
        tabBarExtraContent = _this$props4.tabBarExtraContent,
        sticky = _this$props4.sticky,
        hideSplit = _this$props4.hideSplit;
    var active = this.getActive();
    var tabs = [];
    var border = this.props.border;
    Children.toArray(children).forEach(function (child, i, arr) {
      if (!child || !child.type) return;
      var tab = null;

      if (child.type.isTabPanel) {
        // eslint-disable-next-line
        tab = child.props.tab;
      } else if (child.type.isTabLink) {
        tab = child;
      } else return;

      var _child$props = child.props,
          _child$props$id = _child$props.id,
          id = _child$props$id === void 0 ? i : _child$props$id,
          background = _child$props.background;
      var childBorder = child.props.border; // eslint-disable-next-line

      if (active === id) {
        if (childBorder) border = childBorder;else childBorder = border;
      }

      tabs.push(_objectSpread({
        id: id,
        isActive: active === id,
        tab: tab,
        isVertical: isVertical,
        align: align,
        background: background || (active === id ? _this2.props.background : inactiveBackground),
        border: childBorder,
        color: child.props.color || (active === id ? color : undefined),
        disabled: child.props.disabled,
        shape: shape,
        last: arr.length - 1 === i
      }, getDataset(child.props)));
    });
    var header = React.createElement(Header, {
      isVertical: isVertical,
      border: border,
      collapsed: this.state.collapsed,
      onCollapse: collapsible ? this.handleCollapse : undefined,
      shape: shape,
      onChange: this.handleChange,
      tabs: tabs,
      tabBarExtraContent: tabBarExtraContent,
      tabBarStyle: tabBarStyle,
      hideSplit: hideSplit
    });

    if (!isEmpty(sticky) && !isVertical) {
      var stickyClassName = tabsClass('sticky');
      var stickyProps = {
        top: 0,
        className: stickyClassName
      };

      if (typeof sticky === 'number') {
        stickyProps.top = sticky;
      }

      if (isObject(sticky)) {
        stickyProps = _objectSpread({}, sticky, {
          className: classnames(stickyClassName, sticky.className)
        });
      }

      return React.createElement(Sticky, _extends({
        onChange: this.setStickyStatus
      }, stickyProps), header);
    }

    return header;
  };

  _proto.renderContent = function renderContent(child, i) {
    if (!(child && child.type && child.type.isTabPanel)) return null;
    var _this$props5 = this.props,
        collapsible = _this$props5.collapsible,
        lazy = _this$props5.lazy;

    var _child$props2 = child.props,
        _child$props2$id = _child$props2.id,
        id = _child$props2$id === void 0 ? i : _child$props2$id,
        other = _objectWithoutPropertiesLoose(_child$props2, ["id"]);

    return React.createElement(Wrapper, _extends({}, other, {
      lazy: lazy,
      collapsed: this.state.collapsed,
      collapsible: collapsible,
      id: id,
      key: id,
      active: this.getActive()
    }));
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        children = _this$props6.children,
        shape = _this$props6.shape,
        style = _this$props6.style,
        autoFill = _this$props6.autoFill;
    var position = this.getAlign();
    var align = position.align,
        isVertical = position.isVertical;
    var className = classnames(tabsClass('_', align && "align-" + align, isVertical && 'vertical', shape, autoFill && 'auto-fill', isRTL() && 'rtl'), this.props.className);
    return React.createElement("div", {
      className: className,
      style: style,
      ref: this.bindContainer
    }, align !== 'vertical-right' && align !== 'bottom' && this.renderHeader(position), Children.toArray(children).map(this.renderContent), (align === 'vertical-right' || align === 'bottom') && this.renderHeader(position));
  };

  return Tabs;
}(PureComponent);

Tabs.propTypes = {
  active: PropTypes.any,
  align: PropTypes.oneOf(['left', 'right', 'vertical-left', 'vertical-right', 'bottom']),
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  color: PropTypes.string,
  defaultActive: PropTypes.any,
  defaultCollapsed: PropTypes.bool,
  inactiveBackground: PropTypes.string,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(['card', 'line', 'button', 'bordered', 'dash']),
  style: PropTypes.object,
  tabBarExtraContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tabBarStyle: PropTypes.object,
  lazy: PropTypes.bool,
  autoFill: PropTypes.bool,
  sticky: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.object]),
  switchToTop: PropTypes.bool,
  hideSplit: PropTypes.bool
};
Tabs.defaultProps = {
  // background: '#fff',
  // border: '#ddd',
  // color: '#333',
  defaultCollapsed: false,
  // inactiveBackground: 'transparent',
  lazy: true,
  hideSplit: false
};
export default Tabs;