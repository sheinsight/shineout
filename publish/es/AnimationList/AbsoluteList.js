import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shallowEqual from '../utils/shallowEqual';
import { compose } from '../utils/func';
import { scrollConsumer } from '../Scroll/context';
import { listClass } from './styles';
import { docSize } from '../utils/dom/document';
import { getRTLPosition } from '../utils/strings';
import zIndexConsumer from '../Modal/context';
import { isRTL } from '../config';
import { addZoomListener, removeZoomListener } from '../utils/zoom';
var PICKER_V_MARGIN = 4;
var root;

function initRoot() {
  root = document.createElement('div');
  root.className = listClass('root', isRTL() && 'rtl');
  document.body.appendChild(root);
}

var getOverDocStyle = function getOverDocStyle(right) {
  return right ? {
    left: 0,
    right: 'auto'
  } : {
    right: 0,
    left: 'auto'
  };
};

var listPosition = ['drop-down', 'drop-up'];
var pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top'];
var dropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
export default function (List) {
  var AbsoluteList =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(AbsoluteList, _Component);

    function AbsoluteList(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        overdoc: false
      });

      _this.handleRef = _this.handleRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      if (!props.absolute) return _assertThisInitialized(_this);
      _this.lastStyle = {};
      if (!root) initRoot();
      _this.container = typeof _this.props.absolute === 'function' ? _this.props.absolute() : root;
      _this.element = document.createElement('div');
      if (_this.container) _this.container.appendChild(_this.element);

      if (props.getResetPosition) {
        props.getResetPosition(_this.resetPosition.bind(_assertThisInitialized(_assertThisInitialized(_this))));
      }

      _this.zoomChangeHandler = _this.zoomChangeHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = AbsoluteList.prototype;

    _proto.componentDidMount = function componentDidMount() {
      if (this.props.absolute && !this.container) {
        this.container = typeof this.props.absolute === 'function' ? this.props.absolute() : root;
        this.container.appendChild(this.element);

        if (this.props.focus) {
          this.forceUpdate();
        }
      }

      if (this.props.absolute) {
        addZoomListener(this.zoomChangeHandler);
      }
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!this.props.focus) this.ajustdoc = false;
      if (shallowEqual(prevProps.value, this.props.value)) return;
      setTimeout(function () {
        _this2.forceUpdate();
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      var absolute = this.props.absolute;
      if (!absolute) return;
      removeZoomListener(this.zoomChangeHandler);

      if (this.container) {
        this.container.removeChild(this.element);
      }
    };

    _proto.getPosition = function getPosition(rect) {
      var fixed = this.props.fixed;
      var position = this.props.position;
      var rtl = isRTL();
      var style = {
        position: 'absolute',
        right: 'auto'
      };

      if (fixed) {
        var widthKey = fixed === 'min' ? 'minWidth' : 'width';
        style[widthKey] = rect.width;
      }

      if (dropdownPosition.includes(position)) {
        position = position.split('-').reverse().join('-');
      }

      if (rtl) {
        position = getRTLPosition(position);
      }

      var container = this.container;
      var rootContainer = container === root || !container ? document.body : container;
      var containerRect = rootContainer.getBoundingClientRect();
      var containerScroll = {
        left: rootContainer.scrollLeft,
        top: rootContainer.scrollTop
      };
      this.containerRect = containerRect;
      this.containerScroll = containerScroll;

      if (listPosition.includes(position)) {
        style.left = rect.left - containerRect.left + containerScroll.left;

        if (isRTL()) {
          style.right = containerRect.width - rect.width - style.left;
          style.left = 'auto';
        }

        if (position === 'drop-down') {
          style.top = rect.top - containerRect.top + rect.height + containerScroll.top;
        } else {
          style.bottom = -(rect.top - containerRect.top + containerScroll.top);
        }
      } else if (pickerPosition.includes(position)) {
        var _position$split = position.split('-'),
            h = _position$split[0],
            v = _position$split[1];

        if (h === 'left') {
          style.left = rect.left - containerRect.left + containerScroll.left;
        } else {
          style.right = containerRect.width - rect.width - rect.left + containerRect.left - containerScroll.left;
          style.left = 'auto';
        }

        if (v === 'bottom') {
          style.top = rect.bottom - containerRect.top + containerScroll.top + PICKER_V_MARGIN;
        } else {
          style.top = rect.top - containerRect.top + containerScroll.top - PICKER_V_MARGIN;
          style.transform = 'translateY(-100%)';
        }
      }

      return style;
    };

    _proto.getStyle = function getStyle() {
      var _this$props = this.props,
          parentElement = _this$props.parentElement,
          scrollElement = _this$props.scrollElement,
          focus = _this$props.focus;
      var lazyResult = {
        focus: focus,
        style: this.lastStyle
      };
      if (!focus) return lazyResult;
      var style = {};

      if (parentElement) {
        var rect = parentElement.getBoundingClientRect();
        var scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : {};

        if (rect.bottom < scrollRect.top || rect.top > scrollRect.bottom || rect.right < scrollRect.left || rect.left > scrollRect.right) {
          return {
            focus: false,
            style: this.lastStyle
          };
        }

        style = this.getPosition(rect);
      }

      if (shallowEqual(style, this.lastStyle)) return lazyResult;
      this.lastStyle = style;
      return {
        focus: focus,
        style: style
      };
    };

    _proto.zoomChangeHandler = function zoomChangeHandler() {
      if (this.props.focus) {
        this.forceUpdate();
      }
    };

    _proto.isRight = function isRight() {
      var position = this.props.position;
      var isRight = false;

      if (position.indexOf('right') > 1) {
        isRight = true;
      }

      if (isRTL()) {
        isRight = !isRight;
      }

      return isRight;
    };

    _proto.resetPosition = function resetPosition(clean) {
      var _this$props2 = this.props,
          focus = _this$props2.focus,
          parentElement = _this$props2.parentElement;
      if (!this.el || !focus || this.ajustdoc && !clean) return;
      var width = this.el.offsetWidth;
      var pos = parentElement && parentElement.getBoundingClientRect() || {
        left: 0,
        right: 0
      };
      var containerRect = this.containerRect || {
        left: 0,
        width: 0
      };
      var containerScroll = this.containerScroll || {
        left: 0
      };
      var overdoc;

      if (this.isRight()) {
        if (isRTL() && containerScroll.left) {
          // this condition  the style left: 0 will not meet expect so not set overdoc
          overdoc = false;
        } else {
          overdoc = pos.right - width < containerRect.left;
        }
      } else if (!isRTL() && containerScroll.left) {
        // this condition  the style right: 0 will not meet expect so not set overdoc
        overdoc = false;
      } else {
        overdoc = pos.left - containerRect.left + width + containerScroll.left > (containerRect.width || docSize.width);
      }

      if (this.state.overdoc === overdoc) return;
      this.ajustdoc = true;
      this.setState({
        overdoc: overdoc
      });
    };

    _proto.handleRef = function handleRef(ref) {
      this.el = ref;
    };

    _proto.renderList = function renderList() {
      var _this$props3 = this.props,
          parentElement = _this$props3.parentElement,
          absolute = _this$props3.absolute,
          focus = _this$props3.focus,
          rootClass = _this$props3.rootClass,
          position = _this$props3.position,
          scrollLeft = _this$props3.scrollLeft,
          scrollTop = _this$props3.scrollTop,
          scrollElement = _this$props3.scrollElement,
          _this$props3$style = _this$props3.style,
          style = _this$props3$style === void 0 ? {} : _this$props3$style,
          zIndex = _this$props3.zIndex,
          getResetPosition = _this$props3.getResetPosition,
          ignore = _this$props3.autoAdapt,
          props = _objectWithoutPropertiesLoose(_this$props3, ["parentElement", "absolute", "focus", "rootClass", "position", "scrollLeft", "scrollTop", "scrollElement", "style", "zIndex", "getResetPosition", "autoAdapt"]);

      var parsed = parseInt(zIndex, 10);
      if (!Number.isNaN(parsed)) style.zIndex = parsed;
      var mergeStyle = Object.assign({}, style, this.state.overdoc ? getOverDocStyle(this.isRight()) : undefined);
      return React.createElement(List, _extends({
        getRef: this.handleRef
      }, props, {
        focus: focus,
        style: mergeStyle
      }));
    };

    _proto.render = function render() {
      var _this3 = this;

      var autoAdapt = this.props.autoAdapt;
      setTimeout(function () {
        _this3.resetPosition(autoAdapt);
      });

      if (!this.props.absolute) {
        return this.renderList();
      }

      if (!this.container) return null;

      var _this$props4 = this.props,
          parentElement = _this$props4.parentElement,
          rootClass = _this$props4.rootClass,
          absolute = _this$props4.absolute,
          position = _this$props4.position,
          scrollLeft = _this$props4.scrollLeft,
          scrollTop = _this$props4.scrollTop,
          scrollElement = _this$props4.scrollElement,
          autoClass = _this$props4.autoClass,
          zIndex = _this$props4.zIndex,
          getResetPosition = _this$props4.getResetPosition,
          value = _this$props4.value,
          ignore = _this$props4.autoAdapt,
          props = _objectWithoutPropertiesLoose(_this$props4, ["parentElement", "rootClass", "absolute", "position", "scrollLeft", "scrollTop", "scrollElement", "autoClass", "zIndex", "getResetPosition", "value", "autoAdapt"]);

      var mergeClass = classnames(listClass('absolute-wrapper'), rootClass, autoClass);

      var _ref = props.focus ? this.getStyle() : {
        style: this.lastStyle
      },
          focus = _ref.focus,
          style = _ref.style;

      this.element.className = mergeClass;
      var mergeStyle = Object.assign({}, style, props.style, this.state.overdoc ? getOverDocStyle(this.isRight()) : undefined);
      if (zIndex || typeof zIndex === 'number') mergeStyle.zIndex = parseInt(zIndex, 10);
      return ReactDOM.createPortal(React.createElement(List, _extends({
        getRef: this.handleRef
      }, props, {
        focus: focus,
        style: mergeStyle
      })), this.element);
    };

    return AbsoluteList;
  }(Component);

  AbsoluteList.propTypes = {
    focus: PropTypes.bool,
    fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    // same width with parentElement
    parentElement: PropTypes.object,
    position: PropTypes.string,
    absolute: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    scrollElement: PropTypes.object,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    rootClass: PropTypes.string,
    zIndex: PropTypes.number,
    style: PropTypes.object,
    autoClass: PropTypes.string,
    value: PropTypes.any,
    getResetPosition: PropTypes.func,
    autoAdapt: PropTypes.bool
  };
  return compose(scrollConsumer, zIndexConsumer)(AbsoluteList);
}