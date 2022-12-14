"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _immer = _interopRequireDefault(require("immer"));

var _uid = require("../utils/uid");

var _proptypes = require("../utils/proptypes");

var _normalizeWheel = _interopRequireDefault(require("../utils/dom/normalizeWheel"));

var _Bar = _interopRequireDefault(require("../Scroll/Bar"));

var _styles = require("./styles");

var _List = _interopRequireDefault(require("./List"));

var _context = require("./context");

var _is = require("../utils/is");

var _config = require("../config");

var _component = require("../component");

var modeDirection = {
  'vertical-auto': 'y',
  vertical: 'y',
  horizontal: 'x'
};

var getOption = function getOption(mode) {
  return mode.indexOf('vertical') === 0 ? {
    key: 'height',
    pos: 'Top',
    direction: 'Y'
  } : {
    key: 'width',
    pos: 'Left',
    direction: 'X'
  };
};

function keyToMap(keys, value) {
  if (keys === void 0) {
    keys = [];
  }

  if (value === void 0) {
    value = true;
  }

  var keyMap = new Map();
  keys.forEach(function (v) {
    keyMap.set(v, value);
  });
  return keyMap;
} // function isSubMenu(el) {
//   if (el.matches(`.${menuClass('sub')}`)) return true
//   if (!el.parentElement) return false
//   return isSubMenu(el.parentElement)
// }


var Root =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Root, _Component);

  function Root(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      activeKey: null,
      scrollTop: 0,
      scrollLeft: 0,
      openKeys: keyToMap(props.defaultOpenKeys)
    };
    _this.checkOpen = _this.checkOpen.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.checkActive = _this.checkActive.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.checkInPath = _this.checkInPath.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleScrollLeft = _this.handleScrollX.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'Left');
    _this.handleScrollTop = _this.handleScrollX.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'Top');
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleWheel = _this.handleWheel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderItem = _this.renderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindRootElement = _this.bindRootElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleOpenKeys = _this.toggleOpenKeys.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.providerValue = {
      bindItem: _this.bindItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))),
      unbindItem: _this.unbindItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)))
    };
    _this.items = {};
    _this.itemsOpen = {};
    _this.itemsInPath = {};
    return _this;
  }

  var _proto = Root.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _Component.prototype.componentDidMount.call(this);

    this.updateState();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateState();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.container.removeEventListener('wheel', this.handleWheel);

    _Component.prototype.componentWillUnmount.call(this);
  };

  _proto.getOpenKeys = function getOpenKeys() {
    var _this$props = this.props,
        openKeys = _this$props.openKeys,
        defaultOpenKeys = _this$props.defaultOpenKeys;
    if (openKeys) return openKeys;
    return this.hasToggled ? Array.from(this.state.openKeys.keys()) : defaultOpenKeys;
  };

  _proto.bindRootElement = function bindRootElement(el) {
    this.container = el;
    if (!el) return;
    this.wrapper = el.querySelector("." + (0, _styles.menuClass)('wrapper'));
    this.rootElement = el.querySelector("." + (0, _styles.menuClass)('root'));
  };

  _proto.bindItem = function bindItem(id, updateActive, updateOpen, updateInPath) {
    this.items[id] = updateActive;
    this.itemsOpen[id] = updateOpen;
    this.itemsInPath[id] = updateInPath;
    return [this.checkActive, this.checkOpen, this.checkInPath];
  };

  _proto.unbindItem = function unbindItem(id) {
    delete this.items[id];
    delete this.itemsOpen[id];
    delete this.itemsInPath[id];
  };

  _proto.checkActive = function checkActive(id, data) {
    var active = this.props.active;
    var act = typeof active === 'function' ? active(data) : id === this.state.activeKey;
    if (act) this.state.activeKey = id;

    if (!act && this.state.activeKey === id) {
      this.state.activeKey = '';
    }

    return act;
  };

  _proto.checkOpen = function checkOpen(id) {
    var openKeys = this.getOpenKeys();

    if ((0, _is.isArray)(openKeys)) {
      return openKeys.indexOf(id) > -1;
    }

    return false;
  };

  _proto.checkInPath = function checkInPath(id) {
    var activeKey = this.state.activeKey;
    if (!activeKey || !id) return false;
    return activeKey.indexOf(id) >= 0;
  };

  _proto.updateState = function updateState() {
    var mode = this.props.mode;
    this.updateActive();
    this.updateOpen();
    this.updateInPath();
    if (!this.container) return;
    var bindMethod = mode !== 'inline' ? this.container.addEventListener : this.container.removeEventListener;
    bindMethod.call(this.container, 'wheel', this.handleWheel, {
      passive: false
    });
  };

  _proto.updateActive = function updateActive() {
    var _this2 = this;

    Object.keys(this.items).forEach(function (id) {
      var update = _this2.items[id];
      update(_this2.checkActive, _this2.state.activeKey);
    });
  };

  _proto.updateOpen = function updateOpen() {
    var _this3 = this;

    var _this$props2 = this.props,
        data = _this$props2.data,
        keygen = _this$props2.keygen;
    Object.keys(this.itemsOpen).forEach(function (id) {
      var update = _this3.itemsOpen[id];
      update(_this3.checkOpen);
    });
    var hasOpen = this.getOpenKeys().filter(function (k) {
      return data.find(function (d, i) {
        return (0, _uid.getKey)(d, keygen, i) === k;
      });
    }).length > 0;

    if (hasOpen !== this.state.hasOpen) {
      this.setState({
        hasOpen: hasOpen
      });
    }
  };

  _proto.updateInPath = function updateInPath() {
    var _this4 = this;

    Object.keys(this.itemsInPath).forEach(function (id) {
      var update = _this4.itemsInPath[id];
      update(_this4.checkInPath);
    });
  };

  _proto.toggleOpenKeys = function toggleOpenKeys(id, open) {
    var newOpenKeys = (0, _immer.default)(keyToMap(this.getOpenKeys()), function (draft) {
      if (open) {
        draft.set(id, true);
      } else draft.delete(id);
    });
    this.hasToggled = true;
    var keys = Array.from(newOpenKeys.keys());
    var _this$props3 = this.props,
        _this$props3$onOpenCh = _this$props3.onOpenChange,
        onOpenChange = _this$props3$onOpenCh === void 0 ? function () {} : _this$props3$onOpenCh,
        openKeys = _this$props3.openKeys;

    if (openKeys) {
      onOpenChange(keys);
      return;
    }

    this.setState({
      openKeys: newOpenKeys,
      hasOpen: keys.length > 0
    });
    onOpenChange(keys);
  };

  _proto.handleScrollX = function handleScrollX(pos, param) {
    var _this$setState;

    var sizeKey = pos === 'Top' ? 'height' : 'width';
    var size = this.container.getBoundingClientRect()[sizeKey];
    var scroll = this.rootElement.getBoundingClientRect()[sizeKey];
    this.wrapper["scroll" + pos] = param * (scroll - size);
    this.setState((_this$setState = {}, _this$setState["scroll" + pos] = param, _this$setState));
  };

  _proto.handleScroll = function handleScroll(top) {
    var _this$container$getBo = this.container.getBoundingClientRect(),
        height = _this$container$getBo.height;

    var scrollHeight = this.rootElement.getBoundingClientRect().height;
    this.wrapper.scrollTop = top * (scrollHeight - height);
    this.setState({
      scrollTop: top
    });
  };

  _proto.handleWheel = function handleWheel(e) {
    var _this$setState2;

    // if (isSubMenu(e.target)) return
    var mode = this.props.mode;

    var _getOption = getOption(mode),
        key = _getOption.key,
        pos = _getOption.pos,
        direction = _getOption.direction;

    var wheel = (0, _normalizeWheel.default)(e);
    var size = this.container.getBoundingClientRect()[key]; // const size = this.rootElement.getBoundingClientRect()[key] - this.container.getBoundingClientRect()[key]

    this.wrapper["scroll" + pos] += wheel["pixel" + direction];
    var precent = this.wrapper["scroll" + pos] / size;
    this.setState((_this$setState2 = {}, _this$setState2["scroll" + pos] = precent > 1 ? 1 : precent, _this$setState2)); // this.setState({ [`scroll${pos}`]: size === 0 ? 0 : this.wrapper[`scroll${pos}`] / size })

    e.preventDefault();
  };

  _proto.handleClick = function handleClick(id, data) {
    var onClick = this.props.onClick;
    this.setState({
      activeKey: id
    });
    if (onClick) onClick(data);
  };

  _proto.renderItem = function renderItem(data, index) {
    var renderItem = this.props.renderItem;
    if (typeof renderItem === 'string') return data[renderItem];
    if (typeof renderItem === 'function') return renderItem(data, index);
    return null;
  };

  _proto.renderScrollBar = function renderScrollBar() {
    if (!this.rootElement || !this.container) return null;
    var mode = this.props.mode;
    var direction = modeDirection[mode];
    if (!direction) return null;

    if (direction === 'x') {
      var _this$container$getBo2 = this.container.getBoundingClientRect(),
          width = _this$container$getBo2.width;

      var scrollWidth = this.rootElement.getBoundingClientRect().width;
      if (scrollWidth <= width) return null;
      return _react.default.createElement(_Bar.default, {
        className: (0, _styles.menuClass)('bar'),
        length: width,
        scrollLength: scrollWidth,
        offset: this.state.scrollLeft,
        onScroll: this.handleScrollLeft,
        direction: "x"
      });
    }

    var length = this.container.getBoundingClientRect().height;
    var scrollHeight = this.rootElement.getBoundingClientRect().height;
    if (scrollHeight < length) return null;
    return _react.default.createElement(_Bar.default, {
      className: (0, _styles.menuClass)('bar'),
      forceHeight: length,
      length: length,
      scrollLength: scrollHeight,
      offset: this.state.scrollTop,
      onScroll: this.handleScrollTop
    });
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        keygen = _this$props4.keygen,
        data = _this$props4.data,
        mode = _this$props4.mode,
        style = _this$props4.style,
        theme = _this$props4.theme,
        inlineIndent = _this$props4.inlineIndent,
        linkKey = _this$props4.linkKey,
        disabled = _this$props4.disabled,
        height = _this$props4.height,
        toggleDuration = _this$props4.toggleDuration,
        frontCaret = _this$props4.frontCaret,
        looseChildren = _this$props4.looseChildren,
        parentSelectable = _this$props4.parentSelectable,
        frontCaretType = _this$props4.frontCaretType,
        caretColor = _this$props4.caretColor;
    var isVertical = mode.indexOf('vertical') === 0;
    var showScroll = (style.height || height) && isVertical || mode === 'horizontal';
    var rtl = (0, _config.isRTL)();
    var className = (0, _classnames.default)((0, _styles.menuClass)('_', isVertical ? 'vertical' : mode, theme === 'dark' && 'dark', showScroll && 'scroll', this.state.hasOpen && 'has-open', rtl && 'rtl'), this.props.className);
    var rootStyle = {};
    if (style.width && mode !== 'horizontal') rootStyle.width = style.width;
    var bottomLine = 0;
    var topLine = 0;

    if (this.container) {
      var rect = this.container.getBoundingClientRect();
      bottomLine = rect.bottom;
      topLine = rect.top;
    }

    return _react.default.createElement("div", {
      className: className,
      ref: this.bindRootElement,
      style: style
    }, _react.default.createElement("div", {
      className: (0, _styles.menuClass)('wrapper')
    }, _react.default.createElement(_context.Provider, {
      value: this.providerValue
    }, _react.default.createElement(_List.default, {
      className: (0, _styles.menuClass)('root'),
      data: data,
      disabled: disabled,
      inlineIndent: inlineIndent,
      keygen: keygen,
      level: 0,
      mode: mode,
      onClick: this.handleClick,
      path: "",
      renderItem: this.renderItem,
      open: true,
      style: rootStyle,
      toggleOpenKeys: this.toggleOpenKeys,
      bottomLine: bottomLine,
      topLine: topLine,
      linkKey: linkKey,
      toggleDuration: toggleDuration,
      frontCaret: frontCaret,
      looseChildren: looseChildren,
      parentSelectable: parentSelectable,
      frontCaretType: frontCaretType,
      caretColor: caretColor
    }))), showScroll && this.renderScrollBar());
  };

  return Root;
}(_component.Component);

Root.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'style', 'keygen'), {
  active: _propTypes.default.func,
  data: _propTypes.default.array,
  defaultOpenKeys: _propTypes.default.array,
  openKeys: _propTypes.default.array,
  disabled: _propTypes.default.func,
  inlineIndent: _propTypes.default.number,
  mode: _propTypes.default.oneOf(['inline', 'vertical', 'horizontal', 'vertical-auto']),
  onClick: _propTypes.default.func,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  onOpenChange: _propTypes.default.func,
  toggleDuration: _propTypes.default.number,
  frontCaret: _propTypes.default.bool,
  frontCaretType: _List.default.propTypes.frontCaretType,
  caretColor: _List.default.propTypes.caretColor
});
Root.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  data: [],
  disabled: function disabled(d) {
    return d.disabled;
  },
  level: 0,
  keygen: 'id',
  mode: 'inline',
  inlineIndent: 24,
  renderItem: 'title',
  defaultOpenKeys: [],
  onClick: function onClick() {
    return true;
  },
  toggleDuration: 200,
  frontCaretType: 'solid'
});
var _default = Root;
exports.default = _default;