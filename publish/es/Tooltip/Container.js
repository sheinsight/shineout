import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { tooltipClass } from './styles';
import { scrollConsumer } from '../Scroll/context';
import { getUidStr } from '../utils/uid';
import { getPosition as _getPosition } from '../utils/dom/popover';
export default function (options) {
  var show = options.show,
      hide = options.hide,
      move = options.move,
      isCurrent = options.isCurrent;

  var Container =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(Container, _PureComponent);

    function Container(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.handleShow = _this.handleShow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleDismiss = _this.handleDismiss.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.tryHide = _this.tryHide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.elementRef = _this.elementRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.id = getUidStr();
      return _this;
    }

    var _proto = Container.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (!move || !isCurrent(this.id)) return;
      var _this$props = this.props,
          scrollLeft = _this$props.scrollLeft,
          scrollTop = _this$props.scrollTop;

      if (prevProps.scrollLeft !== scrollLeft || prevProps.scrollTop !== scrollTop) {
        var pos = this.getPosition();
        move(this.id, pos);
        this.tryHide();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      hide();
    };

    _proto.getElement = function getElement() {
      return this.placeholderElement.nextSibling;
    };

    _proto.getPosition = function getPosition() {
      var position = this.props.position;
      var el = this.getElement();
      return _getPosition(position, el);
    };

    _proto.elementRef = function elementRef(el) {
      this.placeholderElement = el;
    };

    _proto.tryHide = function tryHide() {
      var scrollElement = this.props.scrollElement;
      var rect = this.getElement().getBoundingClientRect();
      var scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : {};

      if (rect.bottom < scrollRect.top || rect.top > scrollRect.bottom || rect.right < scrollRect.left || rect.left > scrollRect.right) {
        hide(0);
      }
    };

    _proto.handleShow = function handleShow() {
      var _this2 = this;

      if (this.showTimer) clearTimeout(this.showTimer);
      var delay = this.props.delay;

      if (!delay) {
        this.showSync();
      } else {
        this.showTimer = setTimeout(function () {
          _this2.showSync();
        }, delay);
      }
    };

    _proto.handleDismiss = function handleDismiss() {
      clearTimeout(this.showTimer);
      hide();
    };

    _proto.showSync = function showSync() {
      var pos = this.getPosition();
      var style = Object.keys(pos).reduce(function (data, key) {
        data[key] = pos[key];
        return data;
      }, {});
      var props = Object.assign({}, this.props, {
        style: style
      });
      show(props, this.id, this.props.style);
    };

    _proto.render = function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          trigger = _this$props2.trigger,
          disabledChild = _this$props2.disabledChild,
          tip = _this$props2.tip,
          content = _this$props2.content;

      if (!isValidElement(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'));
        return null;
      }

      if (!tip && !content) return children;
      var inner = disabledChild ? React.createElement("span", {
        className: tooltipClass('disabled-wrapper'),
        style: {
          cursor: 'not-allowed'
        }
      }, cloneElement(children, {
        style: _objectSpread({}, children.props.style, {
          pointerEvents: 'none'
        })
      })) : children;
      var props = {
        key: 'el'
      };

      if (trigger === 'hover') {
        props.onMouseEnter = this.handleShow;
        props.onMouseLeave = this.handleDismiss;
      } else {
        props.onClick = function (e) {
          if (e) e.stopPropagation();
          setTimeout(_this3.handleShow, 10);
          if (children.props.onClick) children.props.onClick();
        };
      }

      return [React.createElement("noscript", {
        ref: this.elementRef,
        key: "ns"
      }), cloneElement(inner, props)];
    };

    return Container;
  }(PureComponent);

  Container.propTypes = {
    // eslint-disable-next-line
    animation: PropTypes.bool,
    children: PropTypes.element.isRequired,
    // eslint-disable-next-line
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    delay: PropTypes.number,
    position: PropTypes.oneOf(['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right']),
    scrollElement: PropTypes.object,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    style: PropTypes.object,
    trigger: PropTypes.oneOf(['click', 'hover']),
    disabledChild: PropTypes.bool,
    tip: PropTypes.node
  };
  Container.defaultProps = {
    animation: true,
    delay: 0,
    position: 'top',
    trigger: 'hover'
  };
  return scrollConsumer(Container);
}