"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _context = require("../Scroll/context");

var _uid = require("../utils/uid");

var _popover = require("../utils/dom/popover");

function _default(options) {
  var show = options.show,
      hide = options.hide,
      move = options.move,
      isCurrent = options.isCurrent;

  var Container =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(Container, _PureComponent);

    function Container(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.handleShow = _this.handleShow.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleDismiss = _this.handleDismiss.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.tryHide = _this.tryHide.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.elementRef = _this.elementRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.id = (0, _uid.getUidStr)();
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
      return (0, _popover.getPosition)(position, el);
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

      if (!(0, _react.isValidElement)(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'));
        return null;
      }

      if (!tip && !content) return children;
      var inner = disabledChild ? _react.default.createElement("span", {
        className: (0, _styles.tooltipClass)('disabled-wrapper'),
        style: {
          cursor: 'not-allowed'
        }
      }, (0, _react.cloneElement)(children, {
        style: (0, _objectSpread2.default)({}, children.props.style, {
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

      return [_react.default.createElement("noscript", {
        ref: this.elementRef,
        key: "ns"
      }), (0, _react.cloneElement)(inner, props)];
    };

    return Container;
  }(_react.PureComponent);

  Container.propTypes = {
    // eslint-disable-next-line
    animation: _propTypes.default.bool,
    children: _propTypes.default.element.isRequired,
    // eslint-disable-next-line
    content: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
    delay: _propTypes.default.number,
    position: _propTypes.default.oneOf(['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right']),
    scrollElement: _propTypes.default.object,
    scrollLeft: _propTypes.default.number,
    scrollTop: _propTypes.default.number,
    style: _propTypes.default.object,
    trigger: _propTypes.default.oneOf(['click', 'hover']),
    disabledChild: _propTypes.default.bool,
    tip: _propTypes.default.node
  };
  Container.defaultProps = {
    animation: true,
    delay: 0,
    position: 'top',
    trigger: 'hover'
  };
  return (0, _context.scrollConsumer)(Container);
}