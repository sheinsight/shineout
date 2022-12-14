"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _List = _interopRequireDefault(require("./List"));

var _context = require("./context");

var _is = require("../utils/is");

var _config = require("../config");

var _element = require("../utils/dom/element");

var getBaseIndent = function getBaseIndent() {
  return 16;
};

var calcIndent = function calcIndent(flag, indent) {
  if (!flag) return indent;
  return Math.ceil(indent / 3 * 2);
};

var Item =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Item, _PureComponent);

  function Item(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.id = props.path + "," + (0, _uid.getUidStr)();

    var key = _this.getKey(props);

    var noop = function noop() {};

    var _props$bindItem = props.bindItem(_this.id, noop, noop, noop),
        activeUpdate = _props$bindItem[0],
        openUpdate = _props$bindItem[1],
        inPathUpdate = _props$bindItem[2];

    _this.state = {
      open: openUpdate(key),
      isActive: activeUpdate(_this.id, props.data),
      inPath: inPathUpdate(_this.id),
      isHighLight: false
    };
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSwitch = _this.handleSwitch.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseEnter = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleMouseLeave = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.renderLink = _this.renderLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.props.bindItem(this.id, this.update.bind(this), this.updateOpen.bind(this), this.updateInPath.bind(this));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.unbindItem(this.id);
    this.unbindDocumentEvent();
  };

  _proto.getKey = function getKey(props) {
    if (props === void 0) {
      props = this.props;
    }

    return (0, _uid.getKey)(props.data, props.keygen, props.index);
  };

  _proto.getCalcStyle = function getCalcStyle() {
    var style = {};
    var _this$props = this.props,
        frontCaret = _this$props.frontCaret,
        level = _this$props.level,
        inlineIndent = _this$props.inlineIndent,
        mode = _this$props.mode;
    var rtl = (0, _config.isRTL)();
    if (mode !== 'inline') return style;
    var indent = calcIndent(frontCaret, inlineIndent);

    if (rtl) {
      style.paddingRight = getBaseIndent(frontCaret) + level * indent;
    } else {
      style.paddingLeft = getBaseIndent(frontCaret) + level * indent;
    }

    return style;
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.unbindDocumentEvent = function unbindDocumentEvent() {
    document.removeEventListener('click', this.handleMouseLeave);
  };

  _proto.update = function update(check, activePath) {
    var isActive = check(this.id, this.props.data);
    var isHighLight = activePath && isActive ? activePath.indexOf(this.id) > -1 : false;
    this.setState({
      isActive: isActive,
      isHighLight: isHighLight
    });
  };

  _proto.updateOpen = function updateOpen(check) {
    var isOpen = check(this.getKey());
    this.setState({
      open: isOpen
    });
  };

  _proto.updateInPath = function updateInPath(check) {
    var inPath = check(this.id);
    this.setState({
      inPath: inPath
    });
  };

  _proto.handleToggle = function handleToggle(open) {
    var _this$props2 = this.props,
        toggleOpenKeys = _this$props2.toggleOpenKeys,
        toggleDuration = _this$props2.toggleDuration;
    var key = this.getKey();
    if (this.toggleTimer) clearTimeout(this.toggleTimer);

    if (open) {
      toggleOpenKeys(key, true);
      document.addEventListener('click', this.handleMouseLeave);
    } else {
      this.toggleTimer = setTimeout(function () {
        toggleOpenKeys(key, false);
      }, toggleDuration);
      this.unbindDocumentEvent();
    }
  };

  _proto.handleClick = function handleClick(e) {
    var _this$props3 = this.props,
        data = _this$props3.data,
        onClick = _this$props3.onClick,
        mode = _this$props3.mode,
        toggleOpenKeys = _this$props3.toggleOpenKeys,
        looseChildren = _this$props3.looseChildren,
        parentSelectable = _this$props3.parentSelectable;
    var expandClick = (0, _element.getParent)(e.target, "." + (0, _styles.menuClass)('expand'));
    var canExpand = !parentSelectable || expandClick;

    if (mode === 'inline' && data.children && canExpand) {
      var shouldToggle = looseChildren || data.children.length;
      if (shouldToggle) toggleOpenKeys(this.getKey(), !this.state.open);
      if (parentSelectable && expandClick) return;
    }

    if (data.disabled) return;

    if (typeof data.onClick === 'function') {
      data.onClick(this.id, data);
    } else if ((!data.children || data.children.length === 0 || data.onClick === true || parentSelectable) && typeof onClick === 'function') {
      onClick(this.id, data);
    }

    var isLeaf = ((data || {}).children || []).length === 0;
    if (!isLeaf) e.nativeEvent.stopImmediatePropagation();
  };

  _proto.handleItemClick = function handleItemClick(clickMethod, e) {
    clickMethod();
    this.handleClick(e);
  };

  _proto.handleSwitch = function handleSwitch(e) {
    var _this$props4 = this.props,
        renderItem = _this$props4.renderItem,
        data = _this$props4.data,
        index = _this$props4.index;
    var item = renderItem(data, index);

    if (item.props && item.props.onClick) {
      this.handleItemClick(item.props.onClick, e);
    } else {
      this.handleClick(e);
    }
  };

  _proto.renderLink = function renderLink(data) {
    var linkKey = this.props.linkKey;
    if (!linkKey) return null;
    if (typeof linkKey === 'function') return linkKey(data);
    return data[linkKey];
  };

  _proto.renderItem = function renderItem(hasChilds, style) {
    if (hasChilds === void 0) {
      hasChilds = false;
    }

    var _this$props5 = this.props,
        renderItem = _this$props5.renderItem,
        data = _this$props5.data,
        index = _this$props5.index,
        frontCaret = _this$props5.frontCaret,
        caretColor = _this$props5.caretColor;
    var item = renderItem(data, index);
    var link = this.renderLink(data);

    if ((0, _is.isLink)(item)) {
      var mergeClass = (0, _classnames.default)((0, _styles.menuClass)('title'), item.props && item.props.className);
      var mergeStyle = Object.assign({}, style, item.props && item.props.style);
      return (0, _react.cloneElement)(item, {
        className: mergeClass,
        style: mergeStyle,
        onClick: this.handleSwitch
      });
    }

    var props = {
      className: (0, _styles.menuClass)('title'),
      style: style,
      onClick: this.handleClick
    };
    if (link) props.href = link;

    if (frontCaret) {
      return _react.default.createElement("a", props, _react.default.createElement("div", {
        style: {
          color: caretColor
        },
        className: (0, _styles.menuClass)('caret', hasChilds && 'has-childs')
      }), item);
    }

    return _react.default.createElement("a", props, item, _react.default.createElement("span", {
      className: (0, _styles.menuClass)('expand'),
      style: {
        color: caretColor
      }
    }));
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        data = _this$props6.data,
        renderItem = _this$props6.renderItem,
        mode = _this$props6.mode,
        keygen = _this$props6.keygen,
        level = _this$props6.level,
        onClick = _this$props6.onClick,
        inlineIndent = _this$props6.inlineIndent,
        disabled = _this$props6.disabled,
        toggleOpenKeys = _this$props6.toggleOpenKeys,
        bottomLine = _this$props6.bottomLine,
        topLine = _this$props6.topLine,
        linkKey = _this$props6.linkKey,
        toggleDuration = _this$props6.toggleDuration,
        frontCaret = _this$props6.frontCaret,
        looseChildren = _this$props6.looseChildren,
        parentSelectable = _this$props6.parentSelectable,
        frontCaretType = _this$props6.frontCaretType;
    var _this$state = this.state,
        open = _this$state.open,
        isActive = _this$state.isActive,
        isHighLight = _this$state.isHighLight,
        inPath = _this$state.inPath;
    var dChildren = data.children;
    var children = dChildren || [];
    var isDisabled = typeof disabled === 'function' ? disabled(data) : disabled;
    var isUp = false;

    if (mode === 'vertical-auto' && this.element) {
      isUp = this.element.getBoundingClientRect().bottom - topLine > (bottomLine - topLine) / 2;
    }

    var hasChilds = looseChildren ? Array.isArray(dChildren) : children.length > 0;
    var className = (0, _styles.menuClass)('item', isDisabled === true && 'disabled', hasChilds ? 'has-children' : 'no-children', isActive && 'active', open && 'open', isUp && 'open-up', isHighLight && 'highlight', inPath && 'in-path', frontCaret && "caret-" + frontCaretType, parentSelectable && 'selectable');
    var style = this.getCalcStyle();
    var events = {};

    if (mode !== 'inline') {
      events.onMouseEnter = this.handleMouseEnter;
      events.onMouseLeave = this.handleMouseLeave;
    }

    return _react.default.createElement("li", (0, _extends2.default)({
      className: className
    }, events, {
      ref: this.bindElement
    }), this.renderItem(hasChilds, style), hasChilds && _react.default.createElement(_List.default // className={menuClass('sub')}
    , {
      data: children,
      disabled: disabled,
      renderItem: renderItem,
      keygen: keygen,
      inlineIndent: mode === 'horizontal' ? 0 : inlineIndent,
      mode: mode === 'horizontal' ? 'inline' : mode,
      onClick: onClick,
      path: this.id,
      level: level + 1,
      open: open,
      toggleOpenKeys: toggleOpenKeys,
      linkKey: linkKey,
      toggleDuration: toggleDuration,
      frontCaret: frontCaret,
      looseChildren: looseChildren,
      parentSelectable: parentSelectable
    }));
  };

  return Item;
}(_component.PureComponent);

Item.propTypes = {
  bindItem: _propTypes.default.func,
  bottomLine: _propTypes.default.number,
  topLine: _propTypes.default.number,
  data: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  index: _propTypes.default.number,
  inlineIndent: _propTypes.default.number,
  level: _propTypes.default.number,
  keygen: _propTypes.default.any,
  mode: _propTypes.default.string,
  onClick: _propTypes.default.func,
  path: _propTypes.default.string,
  renderItem: _propTypes.default.func,
  toggleOpenKeys: _propTypes.default.func,
  unbindItem: _propTypes.default.func,
  linkKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  toggleDuration: _propTypes.default.number,
  frontCaret: _propTypes.default.bool,
  looseChildren: _propTypes.default.bool,
  parentSelectable: _propTypes.default.bool,
  frontCaretType: _propTypes.default.oneOf(['hollow', 'solid']),
  caretColor: _propTypes.default.string
};

var _default = (0, _context.consumer)(Item);

exports.default = _default;