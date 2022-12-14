"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _popover = require("../utils/dom/popover");

var _is = require("../utils/is");

var _element = require("../utils/dom/element");

var _styles = require("./styles");

var _document = require("../utils/dom/document");

var _isDOMElement = _interopRequireDefault(require("../utils/dom/isDOMElement"));

var _context = require("../Table/context");

var _context2 = require("./context");

var _uid = require("../utils/uid");

var _popContainer = _interopRequireDefault(require("../utils/dom/popContainer"));

// import { getRTLPosition } from '../utils/strings'
// import { isRTL } from '../config'
var emptyEvent = function emptyEvent(e) {
  return e.stopPropagation();
}; // const getCurrentPosition = position => {
//   if (isRTL()) {
//     return getRTLPosition(position)
//   }
//   return position
// }


var Panel =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Panel, _Component);

  function Panel(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      show: props.defaultVisible || false
    };
    _this.isRendered = false;
    _this.chain = [];
    _this.id = "popover_" + (0, _uid.getUidStr)();
    _this.placeholderRef = _this.placeholderRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clickAway = _this.clickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleShow = _this.handleShow.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleHide = _this.handleHide.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setShow = _this.setShow.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindChain = _this.bindChain.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCancel = _this.handleCancel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.element = document.createElement('div');
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _Component.prototype.componentDidMount.call(this);

    var _this$props = this.props,
        bindChain = _this$props.bindChain,
        zIndex = _this$props.zIndex;
    if (bindChain) bindChain(this.id);
    this.parentElement = this.placeholder.parentElement;
    this.bindEvents();
    this.container = this.getContainer();
    this.element.style.zIndex = zIndex;
    this.container.appendChild(this.element);
    if (this.props.visible) this.forceUpdate();
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible === true || nextProps.visible === true) return true;
    if (this.state.show === true || nextState.show === true) return true;
    return false;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.trigger !== prevProps.trigger) {
      this.bindEvents();
    }

    if (this.props.zIndex !== prevProps.zIndex && this.element) {
      this.element.style.zIndex = this.props.zIndex;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _Component.prototype.componentWillUnmount.call(this);

    this.parentElement.removeEventListener('mouseenter', this.handleShow);
    this.parentElement.removeEventListener('mouseleave', this.handleHide);
    this.parentElement.removeEventListener('click', this.handleShow);
    document.removeEventListener('click', this.clickAway);
    document.removeEventListener('mousedown', this.clickAway);
    if (!this.container) return;

    if (this.container === (0, _popContainer.default)()) {
      // this.container.removeChild(this.element)
      if (this.element && this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }
    } else {
      this.container.parentElement.removeChild(this.container);
    }
  };

  _proto.setShow = function setShow(show) {
    var _this2 = this;

    var _this$props2 = this.props,
        onVisibleChange = _this$props2.onVisibleChange,
        mouseEnterDelay = _this$props2.mouseEnterDelay,
        mouseLeaveDelay = _this$props2.mouseLeaveDelay,
        trigger = _this$props2.trigger;
    var delay = show ? mouseEnterDelay : mouseLeaveDelay;
    this.delayTimeout = setTimeout(function () {
      if (onVisibleChange) onVisibleChange(show);

      _this2.setState({
        show: show
      });

      if (show && _this2.props.onOpen) _this2.props.onOpen();
      if (!show && _this2.props.onClose) _this2.props.onClose();

      if (show) {
        _this2.bindScrollDismiss(true);

        document.addEventListener('mousedown', _this2.clickAway);
      } else {
        _this2.bindScrollDismiss(false);

        document.removeEventListener('mousedown', _this2.clickAway);
      }
    }, trigger === 'hover' ? delay : 0);
  };

  _proto.getPositionStr = function getPositionStr() {
    var position = this.props.position;
    var priorityDirection = this.props.priorityDirection;
    if (position) return position;
    var rect = this.parentElement.getBoundingClientRect();
    var horizontalPoint = rect.left + rect.width / 2;
    var verticalPoint = rect.top + rect.height / 2;
    var windowHeight = _document.docSize.height;
    var windowWidth = _document.docSize.width;
    var tempPriorityDirection = priorityDirection;

    if (priorityDirection === 'auto') {
      var maxX = Math.max(rect.left, windowWidth - rect.left - rect.width);
      var maxY = Math.max(rect.top, windowHeight - rect.top - rect.height);
      tempPriorityDirection = maxX > maxY ? 'horizontal' : 'vertical';
    }

    if (tempPriorityDirection === 'horizontal') {
      if (horizontalPoint > windowWidth / 2) position = 'left';else position = 'right';

      if (verticalPoint > windowHeight * 0.6) {
        position += '-bottom';
      } else if (verticalPoint < windowHeight * 0.4) {
        position += '-top';
      }
    } else {
      if (verticalPoint > windowHeight / 2) position = 'top';else position = 'bottom';

      if (horizontalPoint > windowWidth * 0.6) {
        position += '-right';
      } else if (horizontalPoint < windowWidth * 0.4) {
        position += '-left';
      }
    }

    return position;
  };

  _proto.getContainer = function getContainer() {
    var getPopupContainer = this.props.getPopupContainer;
    var container;
    if (getPopupContainer) container = getPopupContainer();

    if (container && (0, _isDOMElement.default)(container)) {
      var child = document.createElement('div');
      child.setAttribute('style', ' position: absolute; top: 0px; left: 0px; width: 100% ');
      return container.appendChild(child);
    }

    return (0, _popContainer.default)();
  };

  _proto.updatePosition = function updatePosition(position) {
    var _this3 = this;

    var pos = (0, _popover.getPosition)(position, this.parentElement, this.container); // eslint-disable-next-line

    Object.keys(pos).forEach(function (attr) {
      _this3.element.style[attr] = pos[attr];
    });
  };

  _proto.bindEvents = function bindEvents() {
    var _this$props3 = this.props,
        trigger = _this$props3.trigger,
        clickToCancelDelay = _this$props3.clickToCancelDelay,
        mouseEnterDelay = _this$props3.mouseEnterDelay;

    if (trigger === 'hover') {
      this.parentElement.addEventListener('mouseenter', this.handleShow);
      this.parentElement.addEventListener('mouseleave', this.handleHide);
      this.element.addEventListener('mouseenter', this.handleShow);
      this.element.addEventListener('mouseleave', this.handleHide);
      this.parentElement.removeEventListener('click', this.handleShow);

      if (clickToCancelDelay && mouseEnterDelay > 0) {
        this.parentElement.addEventListener('click', this.handleCancel);
      }
    } else {
      this.parentElement.addEventListener('click', this.handleShow);
      this.parentElement.removeEventListener('click', this.handleCancel);
      this.parentElement.removeEventListener('mouseenter', this.handleShow);
      this.parentElement.removeEventListener('mouseleave', this.handleHide);
      this.element.removeEventListener('mouseenter', this.handleShow);
      this.element.removeEventListener('mouseleave', this.handleHide);
    }
  };

  _proto.placeholderRef = function placeholderRef(el) {
    this.placeholder = el;
  };

  _proto.clickAway = function clickAway(e) {
    if (this.parentElement.contains(e.target)) return;
    if (this.element.contains(e.target)) return;
    if ((0, _element.getParent)(e.target, "." + (0, _styles.popoverClass)('_'))) return;
    this.handleHide(0);
  };

  _proto.bindScrollDismiss = function bindScrollDismiss(show) {
    var scrollDismiss = this.props.scrollDismiss;
    if (!scrollDismiss) return;
    var target = document;
    if (typeof scrollDismiss === 'function') target = scrollDismiss();
    var method = show ? target.addEventListener : target.removeEventListener;
    method.call(target, 'scroll', this.handleHide);
  };

  _proto.bindChain = function bindChain(id) {
    this.chain.push(id);
  };

  _proto.handleShow = function handleShow() {
    if (this.delayTimeout) clearTimeout(this.delayTimeout);
    if (this.state.show) return;
    this.setShow(true);
  };

  _proto.isChildren = function isChildren(el) {
    for (var i = 0; i < this.chain.length; i++) {
      if ((0, _element.getParent)(el, "." + this.chain[i])) return true;
    }

    return false;
  };

  _proto.handleCancel = function handleCancel() {
    if (this.delayTimeout) clearTimeout(this.delayTimeout);
  };

  _proto.handleHide = function handleHide(e) {
    if (e && this.isChildren(e.relatedTarget)) return;
    if (this.delayTimeout) clearTimeout(this.delayTimeout);
    this.setShow(false);
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        background = _this$props4.background,
        border = _this$props4.border,
        children = _this$props4.children,
        type = _this$props4.type,
        visible = _this$props4.visible,
        showArrow = _this$props4.showArrow,
        useTextStyle = _this$props4.useTextStyle;
    var show = typeof visible === 'boolean' ? visible : this.state.show;

    if (!this.isRendered && !show || !this.parentElement || !children) {
      return _react.default.createElement("noscript", {
        ref: this.placeholderRef
      });
    }

    this.isRendered = true;
    var colorStyle = {
      background: background,
      borderColor: border
    };
    var innerStyle = Object.assign({}, this.props.style, {
      background: background
    });
    var position = this.getPositionStr(); // eslint-disable-next-line

    var style = this.element.style;

    if (show) {
      // 先隐藏再设置样式这样可以减少回流
      style.display = 'none';
      this.updatePosition(position);
      if (background) style.background = background;
      if (border) style.borderColor = border;
      style.display = 'block';
    } else {
      style.display = 'none';
    }

    this.element.className = (0, _classnames.default)((0, _styles.popoverClass)('_', position, type), this.props.className, this.id);
    var childrened = (0, _is.isFunc)(children) ? children(this.handleHide) : children;
    if (typeof childrened === 'string' || useTextStyle) childrened = _react.default.createElement("span", {
      className: (0, _styles.popoverClass)('text')
    }, childrened);
    return _reactDom.default.createPortal([showArrow && _react.default.createElement("div", {
      key: "arrow",
      className: (0, _styles.popoverClass)('arrow'),
      style: colorStyle
    }), _react.default.createElement("div", {
      key: "content",
      onClick: emptyEvent,
      className: (0, _styles.popoverClass)('content'),
      style: innerStyle
    }, _react.default.createElement(_context2.Provider, {
      value: this.bindChain
    }, _react.default.createElement(_context.Provider, {
      value: false
    }, childrened)))], this.element);
  };

  return Panel;
}(_component.Component);

Panel.propTypes = {
  background: _propTypes.default.string,
  border: _propTypes.default.string,
  children: _propTypes.default.any,
  onClose: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  position: _propTypes.default.string,
  style: _propTypes.default.object,
  trigger: _propTypes.default.oneOf(['click', 'hover']),
  type: _propTypes.default.string,
  visible: _propTypes.default.bool,
  onVisibleChange: _propTypes.default.func,
  defaultVisible: _propTypes.default.bool,
  mouseEnterDelay: _propTypes.default.number,
  mouseLeaveDelay: _propTypes.default.number,
  className: _propTypes.default.string,
  priorityDirection: _propTypes.default.string,
  getPopupContainer: _propTypes.default.func,
  scrollDismiss: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  showArrow: _propTypes.default.bool,
  bindChain: _propTypes.default.func,
  zIndex: _propTypes.default.number,
  clickToCancelDelay: _propTypes.default.bool,
  useTextStyle: _propTypes.default.bool
};
Panel.defaultProps = {
  background: '',
  trigger: 'hover',
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0,
  priorityDirection: 'vertical',
  showArrow: true
};

var _default = (0, _context2.consumer)(Panel);

exports.default = _default;