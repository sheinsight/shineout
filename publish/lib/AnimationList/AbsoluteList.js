"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _func = require("../utils/func");

var _context = require("../Scroll/context");

var _styles = require("./styles");

var _document = require("../utils/dom/document");

var _strings = require("../utils/strings");

var _context2 = _interopRequireDefault(require("../Modal/context"));

var _config = require("../config");

var _zoom = require("../utils/zoom");

var PICKER_V_MARGIN = 4;
var root;

function initRoot() {
  root = document.createElement('div');
  root.className = (0, _styles.listClass)('root', (0, _config.isRTL)() && 'rtl');
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

function _default(List) {
  var AbsoluteList =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(AbsoluteList, _Component);

    function AbsoluteList(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
        overdoc: false
      });
      _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      if (!props.absolute) return (0, _assertThisInitialized2.default)(_this);
      _this.lastStyle = {};
      if (!root) initRoot();
      _this.container = typeof _this.props.absolute === 'function' ? _this.props.absolute() : root;
      _this.element = document.createElement('div');
      if (_this.container) _this.container.appendChild(_this.element);

      if (props.getResetPosition) {
        props.getResetPosition(_this.resetPosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))));
      }

      _this.zoomChangeHandler = _this.zoomChangeHandler.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
        (0, _zoom.addZoomListener)(this.zoomChangeHandler);
      }
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!this.props.focus) this.ajustdoc = false;
      if ((0, _shallowEqual.default)(prevProps.value, this.props.value)) return;
      setTimeout(function () {
        _this2.forceUpdate();
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      var absolute = this.props.absolute;
      if (!absolute) return;
      (0, _zoom.removeZoomListener)(this.zoomChangeHandler);

      if (this.container) {
        this.container.removeChild(this.element);
      }
    };

    _proto.getPosition = function getPosition(rect) {
      var fixed = this.props.fixed;
      var position = this.props.position;
      var rtl = (0, _config.isRTL)();
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
        position = (0, _strings.getRTLPosition)(position);
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

        if ((0, _config.isRTL)()) {
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

      if ((0, _shallowEqual.default)(style, this.lastStyle)) return lazyResult;
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

      if ((0, _config.isRTL)()) {
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
        if ((0, _config.isRTL)() && containerScroll.left) {
          // this condition  the style left: 0 will not meet expect so not set overdoc
          overdoc = false;
        } else {
          overdoc = pos.right - width < containerRect.left;
        }
      } else if (!(0, _config.isRTL)() && containerScroll.left) {
        // this condition  the style right: 0 will not meet expect so not set overdoc
        overdoc = false;
      } else {
        overdoc = pos.left - containerRect.left + width + containerScroll.left > (containerRect.width || _document.docSize.width);
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
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["parentElement", "absolute", "focus", "rootClass", "position", "scrollLeft", "scrollTop", "scrollElement", "style", "zIndex", "getResetPosition", "autoAdapt"]);
      var parsed = parseInt(zIndex, 10);
      if (!Number.isNaN(parsed)) style.zIndex = parsed;
      var mergeStyle = Object.assign({}, style, this.state.overdoc ? getOverDocStyle(this.isRight()) : undefined);
      return _react.default.createElement(List, (0, _extends2.default)({
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
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["parentElement", "rootClass", "absolute", "position", "scrollLeft", "scrollTop", "scrollElement", "autoClass", "zIndex", "getResetPosition", "value", "autoAdapt"]);
      var mergeClass = (0, _classnames.default)((0, _styles.listClass)('absolute-wrapper'), rootClass, autoClass);

      var _ref = props.focus ? this.getStyle() : {
        style: this.lastStyle
      },
          focus = _ref.focus,
          style = _ref.style;

      this.element.className = mergeClass;
      var mergeStyle = Object.assign({}, style, props.style, this.state.overdoc ? getOverDocStyle(this.isRight()) : undefined);
      if (zIndex || typeof zIndex === 'number') mergeStyle.zIndex = parseInt(zIndex, 10);
      return _reactDom.default.createPortal(_react.default.createElement(List, (0, _extends2.default)({
        getRef: this.handleRef
      }, props, {
        focus: focus,
        style: mergeStyle
      })), this.element);
    };

    return AbsoluteList;
  }(_react.Component);

  AbsoluteList.propTypes = {
    focus: _propTypes.default.bool,
    fixed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
    // same width with parentElement
    parentElement: _propTypes.default.object,
    position: _propTypes.default.string,
    absolute: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
    scrollElement: _propTypes.default.object,
    scrollLeft: _propTypes.default.number,
    scrollTop: _propTypes.default.number,
    rootClass: _propTypes.default.string,
    zIndex: _propTypes.default.number,
    style: _propTypes.default.object,
    autoClass: _propTypes.default.string,
    value: _propTypes.default.any,
    getResetPosition: _propTypes.default.func,
    autoAdapt: _propTypes.default.bool
  };
  return (0, _func.compose)(_context.scrollConsumer, _context2.default)(AbsoluteList);
}