"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _element = require("../utils/dom/element");

var _component = require("../component");

var _Button = _interopRequireDefault(require("../Button"));

var _icons = _interopRequireDefault(require("../icons"));

var _Tab = _interopRequireDefault(require("./Tab"));

var _styles = require("./styles");

var _config = require("../config");

var REDUNDANT = 30;

var Header =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Header, _PureComponent);

  function Header(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      attribute: 0,
      overflow: false
    };
    _this.setPosition = _this.setPosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindInner = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'innerElement');
    _this.bindWrapper = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'wrapperElement');
    _this.bindScroll = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'scrollElement');
    _this.renderTab = _this.renderTab.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handlePrevClick = _this.handleMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleNextClick = _this.handleMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.moveToCenter = _this.moveToCenter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCollapse = _this.handleCollapse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleResize = _this.handleResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Header.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var isVertical = this.props.isVertical;
    this.setPosition(isVertical);
    this.removeObserver = (0, _element.addResizeObserver)(this.innerElement, this.handleResize, {
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
    var d = (0, _config.isRTL)() && !isVertical ? -1 : 1;

    if (tabRect[positions[0]] < rect[positions[0]]) {
      this.setState((0, _immer.default)(function (draft) {
        draft.attribute -= (rect[positions[0]] - tabRect[positions[0]] + (first ? 0 : REDUNDANT)) * d;
      }));
    } else if (tabRect[positions[1]] > rect[positions[1]]) {
      this.setState((0, _immer.default)(function (draft) {
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
        other = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["tab", "id"]);
    return _react.default.createElement(_Tab.default, (0, _extends2.default)({}, other, {
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
    return _react.default.createElement(_Button.default.Group, {
      className: (0, _styles.tabsClass)('header-button')
    }, tabs.map(function (tab) {
      return _react.default.createElement(_Button.default, {
        key: tab.id,
        onClick: tab.isActive ? undefined : onChange.bind(_this3, tab.id),
        className: (0, _styles.tabsClass)(tab.isActive && 'button-active'),
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
    var hor = (0, _config.isRTL)() ? 'Right' : 'Left';
    var position = isVertical ? 'Top' : hor;
    var showBorder = shape !== 'bordered' && shape !== 'dash' && !hideSplit;
    return _react.default.createElement("div", {
      onClick: this.handleCollapse,
      className: (0, _styles.tabsClass)('header'),
      style: tabBarStyle || {}
    }, _react.default.createElement("div", {
      ref: this.bindWrapper,
      className: (0, _styles.tabsClass)('header-tabs')
    }, onCollapse && _react.default.createElement("span", {
      className: (0, _styles.tabsClass)('indicator', collapsed && 'collapsed')
    }, _icons.default.AngleRight), attribute > 0 && _react.default.createElement("div", {
      onClick: this.handlePrevClick,
      className: (0, _styles.tabsClass)('scroll-prev')
    }, _icons.default.AngleLeft), _react.default.createElement("div", {
      ref: this.bindInner,
      className: (0, _styles.tabsClass)('inner')
    }, _react.default.createElement("div", {
      ref: this.bindScroll,
      style: (_ref3 = {}, _ref3["margin" + position] = -attribute, _ref3),
      className: (0, _styles.tabsClass)('scroll')
    }, shape === 'button' ? this.renderButtons() : this.renderTabs())), overflow && _react.default.createElement("div", {
      onClick: this.handleNextClick,
      className: (0, _styles.tabsClass)('scroll-next')
    }, isVertical ? _icons.default.AngleRight : _icons.default.AngleRight)), tabBarExtraContent && _react.default.createElement("div", {
      className: (0, _styles.tabsClass)('extra')
    }, tabBarExtraContent), showBorder && shape !== 'button' && _react.default.createElement("div", {
      style: {
        borderColor: border
      },
      className: (0, _styles.tabsClass)('hr')
    }));
  };

  return Header;
}(_component.PureComponent);

Header.propTypes = {
  border: _propTypes.default.string,
  collapsed: _propTypes.default.bool,
  isVertical: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  shape: _propTypes.default.string,
  tabs: _propTypes.default.array,
  tabBarExtraContent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  tabBarStyle: _propTypes.default.object,
  hideSplit: _propTypes.default.bool
};
var _default = Header;
exports.default = _default;