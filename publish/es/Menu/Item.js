import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { getKey as _getKey, getUidStr } from '../utils/uid';
import { menuClass } from './styles';
import List from './List';
import { consumer } from './context';
import { isLink } from '../utils/is';
import { isRTL } from '../config';
import { getParent } from '../utils/dom/element';

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
  _inheritsLoose(Item, _PureComponent);

  function Item(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.id = props.path + "," + getUidStr();

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
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSwitch = _this.handleSwitch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseEnter = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.handleMouseLeave = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.renderLink = _this.renderLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    return _getKey(props.data, props.keygen, props.index);
  };

  _proto.getCalcStyle = function getCalcStyle() {
    var style = {};
    var _this$props = this.props,
        frontCaret = _this$props.frontCaret,
        level = _this$props.level,
        inlineIndent = _this$props.inlineIndent,
        mode = _this$props.mode;
    var rtl = isRTL();
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
    var expandClick = getParent(e.target, "." + menuClass('expand'));
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

    if (isLink(item)) {
      var mergeClass = classnames(menuClass('title'), item.props && item.props.className);
      var mergeStyle = Object.assign({}, style, item.props && item.props.style);
      return cloneElement(item, {
        className: mergeClass,
        style: mergeStyle,
        onClick: this.handleSwitch
      });
    }

    var props = {
      className: menuClass('title'),
      style: style,
      onClick: this.handleClick
    };
    if (link) props.href = link;

    if (frontCaret) {
      return React.createElement("a", props, React.createElement("div", {
        style: {
          color: caretColor
        },
        className: menuClass('caret', hasChilds && 'has-childs')
      }), item);
    }

    return React.createElement("a", props, item, React.createElement("span", {
      className: menuClass('expand'),
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
    var className = menuClass('item', isDisabled === true && 'disabled', hasChilds ? 'has-children' : 'no-children', isActive && 'active', open && 'open', isUp && 'open-up', isHighLight && 'highlight', inPath && 'in-path', frontCaret && "caret-" + frontCaretType, parentSelectable && 'selectable');
    var style = this.getCalcStyle();
    var events = {};

    if (mode !== 'inline') {
      events.onMouseEnter = this.handleMouseEnter;
      events.onMouseLeave = this.handleMouseLeave;
    }

    return React.createElement("li", _extends({
      className: className
    }, events, {
      ref: this.bindElement
    }), this.renderItem(hasChilds, style), hasChilds && React.createElement(List // className={menuClass('sub')}
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
}(PureComponent);

Item.propTypes = {
  bindItem: PropTypes.func,
  bottomLine: PropTypes.number,
  topLine: PropTypes.number,
  data: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  index: PropTypes.number,
  inlineIndent: PropTypes.number,
  level: PropTypes.number,
  keygen: PropTypes.any,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  renderItem: PropTypes.func,
  toggleOpenKeys: PropTypes.func,
  unbindItem: PropTypes.func,
  linkKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  toggleDuration: PropTypes.number,
  frontCaret: PropTypes.bool,
  looseChildren: PropTypes.bool,
  parentSelectable: PropTypes.bool,
  frontCaretType: PropTypes.oneOf(['hollow', 'solid']),
  caretColor: PropTypes.string
};
export default consumer(Item);