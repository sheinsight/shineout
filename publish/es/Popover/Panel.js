import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Component } from '../component';
import { getPosition } from '../utils/dom/popover';
import { isFunc } from '../utils/is';
import { getParent } from '../utils/dom/element';
import { popoverClass } from './styles';
import { docSize } from '../utils/dom/document';
import isDOMElement from '../utils/dom/isDOMElement';
import { Provider as AbsoluteProvider } from '../Table/context'; // import { getRTLPosition } from '../utils/strings'
// import { isRTL } from '../config'

import { consumer, Provider } from './context';
import { getUidStr } from '../utils/uid';
import getCommonContainer from '../utils/dom/popContainer';

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
  _inheritsLoose(Panel, _Component);

  function Panel(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      show: props.defaultVisible || false
    };
    _this.isRendered = false;
    _this.chain = [];
    _this.id = "popover_" + getUidStr();
    _this.placeholderRef = _this.placeholderRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clickAway = _this.clickAway.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleShow = _this.handleShow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHide = _this.handleHide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setShow = _this.setShow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindChain = _this.bindChain.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    if (this.container === getCommonContainer()) {
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
    var windowHeight = docSize.height;
    var windowWidth = docSize.width;
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

    if (container && isDOMElement(container)) {
      var child = document.createElement('div');
      child.setAttribute('style', ' position: absolute; top: 0px; left: 0px; width: 100% ');
      return container.appendChild(child);
    }

    return getCommonContainer();
  };

  _proto.updatePosition = function updatePosition(position) {
    var _this3 = this;

    var pos = getPosition(position, this.parentElement, this.container); // eslint-disable-next-line

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
    if (getParent(e.target, "." + popoverClass('_'))) return;
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
      if (getParent(el, "." + this.chain[i])) return true;
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
      return React.createElement("noscript", {
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

    this.element.className = classnames(popoverClass('_', position, type), this.props.className, this.id);
    var childrened = isFunc(children) ? children(this.handleHide) : children;
    if (typeof childrened === 'string' || useTextStyle) childrened = React.createElement("span", {
      className: popoverClass('text')
    }, childrened);
    return ReactDOM.createPortal([showArrow && React.createElement("div", {
      key: "arrow",
      className: popoverClass('arrow'),
      style: colorStyle
    }), React.createElement("div", {
      key: "content",
      onClick: emptyEvent,
      className: popoverClass('content'),
      style: innerStyle
    }, React.createElement(Provider, {
      value: this.bindChain
    }, React.createElement(AbsoluteProvider, {
      value: false
    }, childrened)))], this.element);
  };

  return Panel;
}(Component);

Panel.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  position: PropTypes.string,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover']),
  type: PropTypes.string,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  defaultVisible: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  className: PropTypes.string,
  priorityDirection: PropTypes.string,
  getPopupContainer: PropTypes.func,
  scrollDismiss: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  showArrow: PropTypes.bool,
  bindChain: PropTypes.func,
  zIndex: PropTypes.number,
  clickToCancelDelay: PropTypes.bool,
  useTextStyle: PropTypes.bool
};
Panel.defaultProps = {
  background: '',
  trigger: 'hover',
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0,
  priorityDirection: 'vertical',
  showArrow: true
};
export default consumer(Panel);