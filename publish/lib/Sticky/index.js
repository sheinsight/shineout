"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _element = require("../utils/dom/element");

var _detect = require("../utils/dom/detect");

var _proptypes = require("../utils/proptypes");

var _func = require("../utils/func");

var _document = require("../utils/dom/document");

var _context = require("./context");

var events = ['scroll', 'pageshow', 'load'];
var supportSticky = (0, _element.cssSupport)('position', 'sticky');

var Sticky =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Sticky, _PureComponent);

  function Sticky(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {};
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindOrigin = _this.bindOrigin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindPlaceholder = _this.bindPlaceholder.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handlePosition = _this.handlePosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.style = {};
    return _this;
  }

  var _proto = Sticky.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var target = this.props.target;
    this.targetElement = (0, _element.getParent)(this.element, target);
    this.handlePosition();
    this.bindScroll();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!prevProps.needResetPostion && this.props.needResetPostion) {
      this.setPosition();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.unbindScroll();
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
  };

  _proto.getStyle = function getStyle(mode, offset, left, width) {
    var _style;

    var _this$props$style$zIn = this.props.style.zIndex,
        zIndex = _this$props$style$zIn === void 0 ? 900 : _this$props$style$zIn;
    var css = this.props.css;
    var style = (_style = {
      position: 'fixed',
      left: left,
      width: width
    }, _style[mode] = offset, _style.zIndex = zIndex, _style);

    if (this.targetElement) {
      if (supportSticky && css) {
        style.position = 'sticky';
      } else {
        style.position = 'absolute';

        if (mode === 'top') {
          style.transform = "translateY(" + (offset + this.targetElement.scrollTop) + "px)";
        } else {
          style.transform = "translateY(" + this.targetElement.scrollTop + "px)";
        }

        delete style.left;
      }
    }

    this.triggerChange(true, style);
    return style;
  };

  _proto.setPosition = function setPosition() {
    var _this$props = this.props,
        bottom = _this$props.bottom,
        top = _this$props.top,
        target = _this$props.target,
        css = _this$props.css,
        needResetPostion = _this$props.needResetPostion;
    var _this$state = this.state,
        mode = _this$state.mode,
        scrollWidth = _this$state.scrollWidth; // If it is a hidden element, the position will not be updated

    if (needResetPostion === false) return;
    var selfRect = (0, _element.copyBoundingClientRect)(this.element);

    var _getComputedStyle = getComputedStyle(this.element),
        marginBottom = _getComputedStyle.marginBottom,
        marginTop = _getComputedStyle.marginTop;

    selfRect.height += parseFloat(marginBottom) + parseFloat(marginTop);
    var scrollElement = this.targetElement || document.body;
    var scrollRect = scrollElement.getBoundingClientRect();
    var placeholderRect = this.placeholder ? (0, _element.copyBoundingClientRect)(this.placeholder) : null;
    var viewHeight = _document.docSize.height;

    if (this.origin) {
      var _this$origin$getBound = this.origin.getBoundingClientRect(),
          width = _this$origin$getBound.width;

      selfRect.width = width;
      if (placeholderRect) placeholderRect.width = width;
    }

    var placeholderStyle = {
      width: selfRect.width,
      // if target element is not null, set height to 0
      height: target && supportSticky && css ? 0 : selfRect.height
    };
    var style;
    var placeholder;
    var limitTop = top;
    var limitBottom = viewHeight - bottom;

    if (this.targetElement) {
      var _getComputedStyle2 = getComputedStyle(scrollElement),
          paddingTop = _getComputedStyle2.paddingTop,
          paddingBottom = _getComputedStyle2.paddingBottom;

      limitTop += scrollRect.top + parseInt(paddingTop, 10);
      limitBottom = scrollRect.bottom - bottom - parseInt(paddingBottom, 10);
    }

    if (top !== undefined && mode !== 'bottom') {
      if (Math.ceil(selfRect.top) < limitTop) {
        this.setState({
          scrollWidth: scrollRect.width,
          mode: 'top'
        });
        style = this.getStyle('top', top, selfRect.left, selfRect.width);
        placeholder = placeholderStyle;
      } else if (placeholderRect && selfRect.top < placeholderRect.top) {
        if (scrollRect.width !== selfRect.width) {
          style = this.getStyle('top', top, selfRect.left, scrollRect.width);
        }

        if (!(target && selfRect.top === limitTop)) {
          this.setState({
            mode: ''
          });
          style = {};
          placeholder = null;
          this.triggerChange(false, style);
        }
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('top', top, selfRect.left, selfRect.width);
        placeholder = placeholderStyle;
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({
          scrollWidth: scrollRect.width,
          mode: 'top'
        });
        style = this.getStyle('top', top, placeholderRect.left, placeholderRect.width);
        placeholder = placeholderStyle;
      }
    }

    if (bottom !== undefined && mode !== 'top') {
      if (selfRect.bottom > limitBottom) {
        this.setState({
          scrollWidth: scrollRect.width,
          mode: 'bottom'
        });
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width);
        placeholder = placeholderStyle;
      } else if (placeholderRect && (this.targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom) {
        if (scrollRect.width !== selfRect.width) {
          style = this.getStyle('bottom', bottom, selfRect.left, scrollRect.width);
        }

        if (!(target && selfRect.bottom === limitBottom)) {
          this.setState({
            mode: ''
          });
          style = {};
          placeholder = null;
          this.triggerChange(false, style);
        }
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width);
        placeholder = placeholderStyle;
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({
          scrollWidth: scrollRect.width,
          mode: 'bottom'
        });
        style = this.getStyle('bottom', bottom, placeholderRect.left, placeholderRect.width);
        placeholder = placeholderStyle;
      }
    }

    if (placeholder !== undefined) {
      this.setState({
        placeholder: placeholder
      });
    }

    if (style) {
      this.style = style;
      this.setState({
        style: style
      });
    }
  };

  _proto.triggerChange = function triggerChange(flag, style) {
    var onChange = this.props.onChange;
    if (style.position === this.style.position) return;
    if (typeof onChange === 'function') onChange(flag);
  };

  _proto.handlePosition = function handlePosition() {
    var _this2 = this;

    var css = this.props.css;

    if (this.locked && css) {
      this.scrollCount += 1;
      return;
    }

    this.locked = true;
    this.scrollCount = 0;
    this.setPosition();
    this.scrollTimer = setTimeout(function () {
      _this2.locked = false;

      if (_this2.scrollCount > 0) {
        _this2.handlePosition();
      }
    }, 48);
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindOrigin = function bindOrigin(el) {
    this.origin = el;
  };

  _proto.bindPlaceholder = function bindPlaceholder(el) {
    this.placeholder = el;
  };

  _proto.bindScroll = function bindScroll() {
    var _this3 = this;

    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.handlePosition, _detect.eventPassive);
    } else {
      events.forEach(function (e) {
        window.addEventListener(e, _this3.handlePosition);
      });
    }

    window.addEventListener('resize', this.handlePosition);
  };

  _proto.unbindScroll = function unbindScroll() {
    var _this4 = this;

    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.handlePosition);
    } else {
      events.forEach(function (e) {
        window.removeEventListener(e, _this4.handlePosition);
      });
    }

    window.removeEventListener('resize', this.handlePosition);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        target = _this$props2.target,
        css = _this$props2.css;
    var placeholder = this.state.placeholder;
    var outerStyle = this.props.style;
    var innerStyle = this.state.style;

    if (target && supportSticky && css) {
      outerStyle = Object.assign({}, outerStyle, innerStyle);
      innerStyle = {};
    }

    return _react.default.createElement("div", {
      style: outerStyle,
      className: className
    }, _react.default.createElement("div", {
      ref: this.bindElement,
      style: Object.assign({}, innerStyle, {
        display: 'flow-root'
      })
    }, children), _react.default.createElement("div", {
      ref: this.bindOrigin
    }), placeholder && _react.default.createElement("div", {
      ref: this.bindPlaceholder,
      style: placeholder
    }));
  };

  return Sticky;
}(_component.PureComponent);

Sticky.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  bottom: _propTypes.default.number,
  children: _propTypes.default.any.isRequired,
  target: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  top: _propTypes.default.number,
  css: _propTypes.default.bool,
  onChange: _propTypes.default.func
});
Sticky.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  css: true
});
Sticky.displayName = 'ShineoutSticky';

var _default = (0, _func.compose)(_context.consumer)(Sticky);

exports.default = _default;