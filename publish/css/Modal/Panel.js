"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = _interopRequireDefault(require("../icons"));

var _Card = _interopRequireDefault(require("../Card"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _context = require("../Scroll/context");

var _context2 = require("./context");

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
  (0, _inheritsLoose2.default)(Panel, _PureComponent);

  function Panel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "panel", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "savePanel", function (node) {
      _this.panel = node;
    });
    _this.handleClose = _this.handleClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMaskDown = _this.handleMaskClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'maskDownTarget');
    _this.handleMaskUp = _this.handleMaskClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'maskUpTarget');
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
    if (container.classList.contains((0, _styles.modalClass)('show'))) return true;
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
      container.classList.add((0, _styles.modalClass)('show'));
      if (!position) container.classList.add((0, _styles.modalClass)('start'));
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
    if (target.matches("." + (0, _styles.modalClass)('mask')) && onClose) onClose();
  };

  _proto.renderIcon = function renderIcon() {
    var type = this.props.type;
    if (type === 'default') return null;
    var iconType = type.charAt(0).toUpperCase() + type.slice(1);
    return _icons.default[iconType];
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

      return _react.default.createElement("div", {
        className: (0, _styles.modalClass)('title', 'method-title')
      }, title);
    } // base Component


    var icon = this.renderIcon();
    return _react.default.createElement(_Card.default.Header, {
      className: (0, _styles.modalClass)('title', icon && 'with-icon')
    }, icon && _react.default.createElement("div", {
      className: (0, _styles.modalClass)('icon')
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
    if (!from || from !== 'method') return _react.default.createElement(_Card.default.Body, {
      style: style
    }, children);
    var icon = this.renderIcon();
    return _react.default.createElement(_Card.default.Body, {
      className: (0, _styles.modalClass)('body'),
      style: style
    }, icon && _react.default.createElement("div", {
      className: (0, _styles.modalClass)('icon')
    }, icon), this.renderTitle(), _react.default.createElement("div", null, children));
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
    var className = (0, _classnames.default)((0, _styles.modalClass)('panel', type, position, zoom && !moveable && 'zoom'), this.props.className);
    var showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null;
    var maskStyle = {
      paddingBottom: fullScreen ? 0 : top
    };
    return _react.default.createElement(_context2.Provider, {
      value: true
    }, _react.default.createElement(_context.Provider, {
      value: {
        element: undefined
      }
    }, _react.default.createElement("div", (0, _extends2.default)({}, events, {
      style: maskStyle,
      className: (0, _styles.modalClass)('mask'),
      onMouseDown: this.handleMaskDown,
      onMouseUp: this.handleMaskUp,
      onClick: this.handleClose
    }), _react.default.createElement(_Card.default, {
      forwardedRef: this.savePanel,
      moveable: moveable,
      resizable: resizable,
      shadow: true,
      className: className,
      style: this.getStyle()
    }, showClose && _react.default.createElement("a", {
      className: (0, _styles.modalClass)('close'),
      onClick: onClose
    }, _icons.default.Close), this.renderTitle(true), this.renderContent(), footer && _react.default.createElement(_Card.default.Footer, {
      className: (0, _styles.modalClass)('footer', from),
      align: "right"
    }, footer)))));
  };

  return Panel;
}(_react.PureComponent);

exports.default = Panel;
Panel.displayName = 'ShineoutModalPanel';
Panel.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  footer: _propTypes.default.any,
  maskCloseAble: _propTypes.default.bool,
  noPadding: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  position: _propTypes.default.oneOf(['left', 'top', 'right', 'bottom']),
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  type: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  moveable: _propTypes.default.bool,
  resizable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object]),
  hideClose: _propTypes.default.bool,
  from: _propTypes.default.string,
  zoom: _propTypes.default.bool,
  container: _propTypes.default.any,
  events: _propTypes.default.object,
  fullScreen: _propTypes.default.bool,
  // is use in drawer
  drawer: _propTypes.default.bool
});
Panel.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  top: '10vh',
  maskCloseAble: true,
  width: 500,
  events: {},
  drawer: false
});