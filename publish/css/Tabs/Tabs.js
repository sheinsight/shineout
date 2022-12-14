"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _Header = _interopRequireDefault(require("./Header"));

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _Wrapper = _interopRequireDefault(require("./Wrapper"));

var _Sticky = _interopRequireDefault(require("../Sticky"));

var _styles = require("./styles");

var _is = require("../utils/is");

var _config = require("../config");

var Tabs =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Tabs, _PureComponent);

  function Tabs(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      active: props.defaultActive || 0,
      collapsed: props.defaultCollapsed
    };
    _this.getAlign = _this.getAlign.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCollapse = _this.handleCollapse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderContent = _this.renderContent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindContainer = _this.bindContainer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setStickyStatus = _this.setStickyStatus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Tabs.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props = this.props,
        sticky = _this$props.sticky,
        switchToTop = _this$props.switchToTop,
        active = _this$props.active;

    if ((prevProps.active !== active || prevState.active !== this.state.active) && this.container && !(0, _is.isEmpty)(sticky) && switchToTop && this.sticky) {
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

    _react.Children.toArray(children).forEach(function (child, i, arr) {
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

      tabs.push((0, _objectSpread2.default)({
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
      }, (0, _getDataset.default)(child.props)));
    });

    var header = _react.default.createElement(_Header.default, {
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

    if (!(0, _is.isEmpty)(sticky) && !isVertical) {
      var stickyClassName = (0, _styles.tabsClass)('sticky');
      var stickyProps = {
        top: 0,
        className: stickyClassName
      };

      if (typeof sticky === 'number') {
        stickyProps.top = sticky;
      }

      if ((0, _is.isObject)(sticky)) {
        stickyProps = (0, _objectSpread2.default)({}, sticky, {
          className: (0, _classnames.default)(stickyClassName, sticky.className)
        });
      }

      return _react.default.createElement(_Sticky.default, (0, _extends2.default)({
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
        other = (0, _objectWithoutPropertiesLoose2.default)(_child$props2, ["id"]);
    return _react.default.createElement(_Wrapper.default, (0, _extends2.default)({}, other, {
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
    var className = (0, _classnames.default)((0, _styles.tabsClass)('_', align && "align-" + align, isVertical && 'vertical', shape, autoFill && 'auto-fill', (0, _config.isRTL)() && 'rtl'), this.props.className);
    return _react.default.createElement("div", {
      className: className,
      style: style,
      ref: this.bindContainer
    }, align !== 'vertical-right' && align !== 'bottom' && this.renderHeader(position), _react.Children.toArray(children).map(this.renderContent), (align === 'vertical-right' || align === 'bottom') && this.renderHeader(position));
  };

  return Tabs;
}(_component.PureComponent);

Tabs.propTypes = {
  active: _propTypes.default.any,
  align: _propTypes.default.oneOf(['left', 'right', 'vertical-left', 'vertical-right', 'bottom']),
  background: _propTypes.default.string,
  border: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.array]),
  className: _propTypes.default.string,
  collapsible: _propTypes.default.bool,
  color: _propTypes.default.string,
  defaultActive: _propTypes.default.any,
  defaultCollapsed: _propTypes.default.bool,
  inactiveBackground: _propTypes.default.string,
  onChange: _propTypes.default.func,
  shape: _propTypes.default.oneOf(['card', 'line', 'button', 'bordered', 'dash']),
  style: _propTypes.default.object,
  tabBarExtraContent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  tabBarStyle: _propTypes.default.object,
  lazy: _propTypes.default.bool,
  autoFill: _propTypes.default.bool,
  sticky: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number, _propTypes.default.object]),
  switchToTop: _propTypes.default.bool,
  hideSplit: _propTypes.default.bool
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
var _default = Tabs;
exports.default = _default;