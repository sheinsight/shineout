import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import { addResizeObserver } from '../utils/dom/element';
import { PureComponent } from '../component';
import Button from '../Button';
import icons from '../icons';
import Tab from './Tab';
import { tabsClass } from './styles';
import { isRTL } from '../config';
var REDUNDANT = 30;

var Header =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Header, _PureComponent);

  function Header(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      attribute: 0,
      overflow: false
    };
    _this.setPosition = _this.setPosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindInner = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'innerElement');
    _this.bindWrapper = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'wrapperElement');
    _this.bindScroll = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'scrollElement');
    _this.renderTab = _this.renderTab.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePrevClick = _this.handleMove.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.handleNextClick = _this.handleMove.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.moveToCenter = _this.moveToCenter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCollapse = _this.handleCollapse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Header.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var isVertical = this.props.isVertical;
    this.setPosition(isVertical);
    this.removeObserver = addResizeObserver(this.innerElement, this.handleResize, {
      direction: true,
      timer: 100
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var isVertical = this.props.isVertical;
    this.setPosition(isVertical);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    if (this.removeObserver) {
      this.removeObserver();
    }
  };

  _proto.setPosition = function setPosition(isVertical) {
    var attributeString = isVertical ? 'Height' : 'Width';
    if (!this.innerElement) return;
    var innerAttribute = this.innerElement["client" + attributeString];
    var scrollAttribute = this.scrollElement["client" + attributeString];
    var domAttribute = this.state.attribute;
    this.setState({
      overflow: scrollAttribute > domAttribute + innerAttribute,
      attributeString: attributeString
    });
  };

  _proto.handleResize = function handleResize(entry, _ref) {
    var x = _ref.x,
        y = _ref.y;
    var isVertical = this.props.isVertical;
    var isResize = isVertical ? y : x;
    if (isResize) this.setPosition(isVertical);
  };

  _proto.bindElement = function bindElement(name, el) {
    this[name] = el;
  };

  _proto.handleMove = function handleMove(lt) {
    var _this$state = this.state,
        attributeString = _this$state.attributeString,
        a = _this$state.attribute;
    var innerAttribute = this.innerElement["client" + attributeString];
    var scrollAttribute = this.scrollElement["client" + attributeString];
    var attribute = a + (lt ? -innerAttribute : innerAttribute);
    if (attribute < 0) attribute = 0;
    if (attribute + innerAttribute > scrollAttribute) attribute = scrollAttribute - innerAttribute;
    if (scrollAttribute <= innerAttribute) attribute = 0;
    this.setState({
      attribute: attribute
    });
  };

  _proto.moveToCenter = function moveToCenter(tabRect, last, first) {
    var isVertical = this.props.isVertical;
    var positions = isVertical ? ['top', 'bottom'] : ['left', 'right'];
    var rect = this.innerElement.getBoundingClientRect();
    var d = isRTL() && !isVertical ? -1 : 1;

    if (tabRect[positions[0]] < rect[positions[0]]) {
      this.setState(immer(function (draft) {
        draft.attribute -= (rect[positions[0]] - tabRect[positions[0]] + (first ? 0 : REDUNDANT)) * d;
      }));
    } else if (tabRect[positions[1]] > rect[positions[1]]) {
      this.setState(immer(function (draft) {
        draft.attribute += (tabRect[positions[1]] - rect[positions[1]] - (draft.attribute === 0 ? -30 : 0) + (last ? 0 : REDUNDANT)) * d;
      }));
    }
  };

  _proto.handleClick = function handleClick(id, isActive) {
    var _this2 = this;

    if (!isActive) {
      if (this.props.onChange) this.props.onChange(id);
      this.ignoreNextCollapse = true;
      setTimeout(function () {
        return _this2.handleCollapse(false);
      }, 200);
    }
  };

  _proto.handleCollapse = function handleCollapse(e) {
    var _this$props = this.props,
        onCollapse = _this$props.onCollapse,
        collapsed = _this$props.collapsed;
    if (!onCollapse) return;

    if (typeof e === 'boolean') {
      onCollapse(e);
      return;
    }

    if (this.ignoreNextCollapse) {
      this.ignoreNextCollapse = false;
      return;
    }

    onCollapse(!collapsed);
  };

  _proto.renderTab = function renderTab(_ref2) {
    var tab = _ref2.tab,
        id = _ref2.id,
        other = _objectWithoutPropertiesLoose(_ref2, ["tab", "id"]);

    return React.createElement(Tab, _extends({}, other, {
      key: id,
      id: id,
      moveToCenter: this.moveToCenter,
      onClick: this.handleClick
    }), tab);
  };

  _proto.renderButtons = function renderButtons() {
    var _this3 = this;

    var _this$props2 = this.props,
        onChange = _this$props2.onChange,
        tabs = _this$props2.tabs;
    return React.createElement(Button.Group, {
      className: tabsClass('header-button')
    }, tabs.map(function (tab) {
      return React.createElement(Button, {
        key: tab.id,
        onClick: tab.isActive ? undefined : onChange.bind(_this3, tab.id),
        className: tabsClass(tab.isActive && 'button-active'),
        disabled: tab.disabled
      }, tab.tab);
    }));
  };

  _proto.renderTabs = function renderTabs() {
    var tabs = this.props.tabs;
    return tabs.map(this.renderTab);
  };

  _proto.render = function render() {
    var _ref3;

    var _this$props3 = this.props,
        border = _this$props3.border,
        onCollapse = _this$props3.onCollapse,
        collapsed = _this$props3.collapsed,
        isVertical = _this$props3.isVertical,
        tabBarExtraContent = _this$props3.tabBarExtraContent,
        tabBarStyle = _this$props3.tabBarStyle,
        shape = _this$props3.shape,
        hideSplit = _this$props3.hideSplit;
    var _this$state2 = this.state,
        attribute = _this$state2.attribute,
        overflow = _this$state2.overflow;
    var hor = isRTL() ? 'Right' : 'Left';
    var position = isVertical ? 'Top' : hor;
    var showBorder = shape !== 'bordered' && shape !== 'dash' && !hideSplit;
    return React.createElement("div", {
      onClick: this.handleCollapse,
      className: tabsClass('header'),
      style: tabBarStyle || {}
    }, React.createElement("div", {
      ref: this.bindWrapper,
      className: tabsClass('header-tabs')
    }, onCollapse && React.createElement("span", {
      className: tabsClass('indicator', collapsed && 'collapsed')
    }, icons.AngleRight), attribute > 0 && React.createElement("div", {
      onClick: this.handlePrevClick,
      className: tabsClass('scroll-prev')
    }, icons.AngleLeft), React.createElement("div", {
      ref: this.bindInner,
      className: tabsClass('inner')
    }, React.createElement("div", {
      ref: this.bindScroll,
      style: (_ref3 = {}, _ref3["margin" + position] = -attribute, _ref3),
      className: tabsClass('scroll')
    }, shape === 'button' ? this.renderButtons() : this.renderTabs())), overflow && React.createElement("div", {
      onClick: this.handleNextClick,
      className: tabsClass('scroll-next')
    }, isVertical ? icons.AngleRight : icons.AngleRight)), tabBarExtraContent && React.createElement("div", {
      className: tabsClass('extra')
    }, tabBarExtraContent), showBorder && shape !== 'button' && React.createElement("div", {
      style: {
        borderColor: border
      },
      className: tabsClass('hr')
    }));
  };

  return Header;
}(PureComponent);

Header.propTypes = {
  border: PropTypes.string,
  collapsed: PropTypes.bool,
  isVertical: PropTypes.bool,
  onChange: PropTypes.func,
  onCollapse: PropTypes.func,
  shape: PropTypes.string,
  tabs: PropTypes.array,
  tabBarExtraContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tabBarStyle: PropTypes.object,
  hideSplit: PropTypes.bool
};
export default Header;