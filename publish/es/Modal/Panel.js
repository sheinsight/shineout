import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icons from '../icons';
import Card from '../Card';
import { defaultProps, getProps } from '../utils/proptypes';
import { modalClass } from './styles';
import { Provider } from '../Scroll/context';
import { Provider as ZProvider } from './context';

function setTransformOrigin(node, value) {
  var style = node.style;
  style.transformOrigin = value;
}

var mousePosition = null;

var getClickPosition = function getClickPosition(e) {
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
  setTimeout(function () {
    mousePosition = null;
  }, 100);
};

document.addEventListener('click', getClickPosition, true);

var Panel =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Panel, _PureComponent);

  function Panel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "panel", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "savePanel", function (node) {
      _this.panel = node;
    });

    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMaskDown = _this.handleMaskClick.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'maskDownTarget');
    _this.handleMaskUp = _this.handleMaskClick.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'maskUpTarget');
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var container = this.props.container;
    this.updateOrigin();
    this.animate();
    var _this$props = this.props,
        autoFocusButton = _this$props.autoFocusButton,
        id = _this$props.id;
    if (!autoFocusButton) return;
    var el = container.querySelector("#" + id + "-" + autoFocusButton);
    if (!el) return;
    el.focus();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.getShow()) return;
    this.updateOrigin();
    this.animate();
  };

  _proto.getShow = function getShow() {
    var container = this.props.container;
    if (container.classList.contains(modalClass('show'))) return true;
    return false;
  };

  _proto.getStyle = function getStyle() {
    var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height,
        top = _this$props2.top,
        position = _this$props2.position,
        style = _this$props2.style,
        fullScreen = _this$props2.fullScreen,
        drawer = _this$props2.drawer;
    var w = fullScreen ? '100vw' : width;
    var h = fullScreen ? '100vh' : height;
    return Object.assign({
      position: 'absolute'
    }, position ? {
      width: drawer && ['left', 'right'].includes(position) ? w : undefined,
      height: drawer && ['top', 'bottom'].includes(position) ? h : undefined
    } : {
      display: 'inline-flex',
      width: w,
      height: h,
      top: fullScreen ? 0 : top,
      position: 'relative'
    }, style || {});
  };

  _proto.animate = function animate() {
    var _this$props3 = this.props,
        container = _this$props3.container,
        position = _this$props3.position;
    setTimeout(function () {
      container.classList.add(modalClass('show'));
      if (!position) container.classList.add(modalClass('start'));
    });
  };

  _proto.updateOrigin = function updateOrigin() {
    var _this$props4 = this.props,
        position = _this$props4.position,
        zoom = _this$props4.zoom;
    if (position || !zoom) return;
    var node = this.panel;
    setTransformOrigin(node, '');

    if (node) {
      if (mousePosition) {
        var _node$getBoundingClie = node.getBoundingClientRect(),
            left = _node$getBoundingClie.left,
            top = _node$getBoundingClie.top;

        var ol = mousePosition.x - left;
        var ot = mousePosition.y - top;
        setTransformOrigin(node, ol + "px " + ot + "px");
      } else {
        setTransformOrigin(node, '');
      }
    }
  } // eslint-disable-next-line
  ;

  _proto.lockWheel = function lockWheel(event) {
    event.preventDefault();
  };

  _proto.handleMaskClick = function handleMaskClick(type, e) {
    this[type] = e.target;
  };

  _proto.handleClose = function handleClose(e) {
    e.stopPropagation();
    var _this$props5 = this.props,
        maskCloseAble = _this$props5.maskCloseAble,
        onClose = _this$props5.onClose;
    var target = e.target;
    if (!maskCloseAble) return;
    if (this.maskDownTarget !== this.maskUpTarget) return;
    if (target.matches("." + modalClass('mask')) && onClose) onClose();
  };

  _proto.renderIcon = function renderIcon() {
    var type = this.props.type;
    if (type === 'default') return null;
    var iconType = type.charAt(0).toUpperCase() + type.slice(1);
    return Icons[iconType];
  };

  _proto.renderTitle = function renderTitle(justRenderClassComponent) {
    if (justRenderClassComponent === void 0) {
      justRenderClassComponent = false;
    }

    var _this$props6 = this.props,
        from = _this$props6.from,
        title = _this$props6.title;
    if (!title) return null; // method component

    if (from === 'method') {
      // if just render class Component, return null
      if (justRenderClassComponent) return null; // for  method function

      return React.createElement("div", {
        className: modalClass('title', 'method-title')
      }, title);
    } // base Component


    var icon = this.renderIcon();
    return React.createElement(Card.Header, {
      className: modalClass('title', icon && 'with-icon')
    }, icon && React.createElement("div", {
      className: modalClass('icon')
    }, icon), title);
  };

  _proto.renderContent = function renderContent() {
    var _this$props7 = this.props,
        children = _this$props7.children,
        noPadding = _this$props7.noPadding,
        padding = _this$props7.padding,
        position = _this$props7.position,
        bodyStyle = _this$props7.bodyStyle,
        _this$props7$from = _this$props7.from,
        from = _this$props7$from === void 0 ? null : _this$props7$from;
    var style = {
      padding: noPadding === true ? 0 : padding
    };
    if (position) style.overflow = 'auto';
    if (bodyStyle) style = Object.assign(style, bodyStyle);
    if (!from || from !== 'method') return React.createElement(Card.Body, {
      style: style
    }, children);
    var icon = this.renderIcon();
    return React.createElement(Card.Body, {
      className: modalClass('body'),
      style: style
    }, icon && React.createElement("div", {
      className: modalClass('icon')
    }, icon), this.renderTitle(), React.createElement("div", null, children));
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        footer = _this$props8.footer,
        type = _this$props8.type,
        onClose = _this$props8.onClose,
        maskCloseAble = _this$props8.maskCloseAble,
        position = _this$props8.position,
        moveable = _this$props8.moveable,
        zoom = _this$props8.zoom,
        resizable = _this$props8.resizable,
        hideClose = _this$props8.hideClose,
        from = _this$props8.from,
        top = _this$props8.top,
        events = _this$props8.events,
        fullScreen = _this$props8.fullScreen;
    var className = classnames(modalClass('panel', type, position, zoom && !moveable && 'zoom'), this.props.className);
    var showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null;
    var maskStyle = {
      paddingBottom: fullScreen ? 0 : top
    };
    return React.createElement(ZProvider, {
      value: true
    }, React.createElement(Provider, {
      value: {
        element: undefined
      }
    }, React.createElement("div", _extends({}, events, {
      style: maskStyle,
      className: modalClass('mask'),
      onMouseDown: this.handleMaskDown,
      onMouseUp: this.handleMaskUp,
      onClick: this.handleClose
    }), React.createElement(Card, {
      forwardedRef: this.savePanel,
      moveable: moveable,
      resizable: resizable,
      shadow: true,
      className: className,
      style: this.getStyle()
    }, showClose && React.createElement("a", {
      className: modalClass('close'),
      onClick: onClose
    }, Icons.Close), this.renderTitle(true), this.renderContent(), footer && React.createElement(Card.Footer, {
      className: modalClass('footer', from),
      align: "right"
    }, footer)))));
  };

  return Panel;
}(PureComponent);

export { Panel as default };
Panel.displayName = 'ShineoutModalPanel';
Panel.propTypes = _objectSpread({}, getProps(PropTypes), {
  footer: PropTypes.any,
  maskCloseAble: PropTypes.bool,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  position: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  moveable: PropTypes.bool,
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  hideClose: PropTypes.bool,
  from: PropTypes.string,
  zoom: PropTypes.bool,
  container: PropTypes.any,
  events: PropTypes.object,
  fullScreen: PropTypes.bool,
  // is use in drawer
  drawer: PropTypes.bool
});
Panel.defaultProps = _objectSpread({}, defaultProps, {
  top: '10vh',
  maskCloseAble: true,
  width: 500,
  events: {},
  drawer: false
});