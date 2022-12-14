"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.BAR_WIDTH = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _scrollBehavior = require("../utils/dom/scrollBehavior");

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _element = require("../utils/dom/element");

var _normalizeWheel = _interopRequireDefault(require("../utils/dom/normalizeWheel"));

var _styles = require("./styles");

var _Bar = _interopRequireDefault(require("./Bar"));

var _config = _interopRequireWildcard(require("../config"));

var _context = require("./context");

var _lazyload = require("../utils/lazyload");

var BAR_WIDTH = 16;
exports.BAR_WIDTH = BAR_WIDTH;

var Scroll =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Scroll, _PureComponent);

  function Scroll(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.touchStartX = 0;
    _this.touchStartY = 0;
    _this.wheelX = props.scrollX;
    _this.wheelY = props.scrollY;
    _this.pixelX = 0;
    _this.pixelY = 0;
    _this.cacheWidth = 0;
    _this.cacheHeight = 0;
    _this.bindInner = _this.bindInner.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindWheel = _this.bindWheel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setRect = _this.setRect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleScrollX = _this.handleScrollX.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleScrollY = _this.handleScrollY.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleWheel = _this.handleWheel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindIframe = _this.bindIframe.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTouchStart = _this.handleTouchStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTouchMove = _this.handleTouchMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setStartPoint = _this.setStartPoint.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleInnerScroll = _this.handleInnerScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Scroll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    setTimeout(this.setRect);
    this.wheelElement.addEventListener('wheel', this.handleWheel, {
      passive: false
    });
    this.wheelElement.addEventListener('touchstart', this.handleTouchStart, {
      passive: true
    });
    this.wheelElement.addEventListener('touchmove', this.handleTouchMove, {
      passive: false
    });
    this.inner.addEventListener('scroll', this.handleInnerScroll);
    this.wheelElement.addEventListener('scroll', this.handleInnerScroll);
    this.rmOverScrollListener = (0, _scrollBehavior.banOverScrollX)(this.wheelElement);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        stable = _this$props.stable,
        scrollWidth = _this$props.scrollWidth,
        scrollHeight = _this$props.scrollHeight;
    if (scrollWidth !== prevProps.scrollWidth) this.setRect();else if (stable && scrollHeight !== prevProps.scrollHeight) this.setRect();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.wheelElement.removeEventListener('wheel', this.handleWheel);
    this.wheelElement.removeEventListener('touchstart', this.handleTouchStart);
    this.wheelElement.removeEventListener('touchmove', this.handleTouchMove);
    this.inner.removeEventListener('scroll', this.handleInnerScroll);
    this.wheelElement.removeEventListener('scroll', this.handleInnerScroll);
    if (this.rmOverScrollListener) this.rmOverScrollListener();
  };

  _proto.getWheelRect = function getWheelRect() {
    if (!this.wheelElement) return {
      width: 0,
      height: 0
    };

    var _this$wheelElement$ge = this.wheelElement.getBoundingClientRect(),
        width = _this$wheelElement$ge.width,
        height = _this$wheelElement$ge.height; // display none


    if (width === 0 && height === 0) {
      width = this.cacheWidth;
      height = this.cacheHeight;
    } else {
      this.cacheWidth = width;
      this.cacheHeight = height;
    }

    var _this$props2 = this.props,
        scrollX = _this$props2.scrollX,
        scrollY = _this$props2.scrollY,
        style = _this$props2.style;
    width = (typeof style.width === 'number' ? style.width : width) - (scrollY ? BAR_WIDTH : 0);
    height = (typeof style.height === 'number' ? style.height : height) - (scrollX ? BAR_WIDTH : 0);
    return {
      width: width,
      height: height
    };
  };

  _proto.setRect = function setRect() {
    this.handleScroll(this.props.left, this.props.top);
    this.forceUpdate();
  };

  _proto.setBaseScrollHeightRatio = function setBaseScrollHeightRatio(height) {
    if (this.baseScrollRatio) return;
    this.baseScrollRatio = 1;
    var ratio = _config.default.scrollRatio; // windows scroll

    if (Math.abs(height) > 10) {
      this.baseScrollRatio = ratio / Math.abs(height);
    }
  };

  _proto.setStartPoint = function setStartPoint(position) {
    this.touchStartX = position.clientX;
    this.touchStartY = position.clientY;
  };

  _proto.bindInner = function bindInner(el) {
    this.inner = el;
  };

  _proto.bindIframe = function bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = (0, _lazyload.throttleWrapper)(this.setRect);
    }
  };

  _proto.bindWheel = function bindWheel(el) {
    this.wheelElement = el;
  };

  _proto.boundleScroll = function boundleScroll() {
    /*
    this.locked = true
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.pixelX !== 0 || this.pixelY !== 0) {
        this.boundleScroll()
      }
    }, 32)
    */
    // lock direction
    if (Math.abs(this.pixelX) > Math.abs(this.pixelY)) {
      this.pixelY = 0;
    } else {
      this.pixelX = 0;
    }

    var _this$props3 = this.props,
        left = _this$props3.left,
        top = _this$props3.top;
    var _this$props4 = this.props,
        scrollWidth = _this$props4.scrollWidth,
        scrollHeight = _this$props4.scrollHeight;
    var x = left + this.pixelX / scrollWidth;
    if (x < 0) x = 0;
    if (x > 1) x = 1;
    var y = top + this.pixelY / scrollHeight;
    if (y < 0) y = 0;
    if (y > 1) y = 1;

    if (x !== left || y !== top) {
      this.handleScroll(x, y, this.pixelX, this.pixelY);
    }

    this.pixelX = 0;
    this.pixelY = 0;
  };

  _proto.handleWheel = function handleWheel(event) {
    var scrollX = this.wheelX;
    var scrollY = this.wheelY;
    var innerScrollAttr = this.props.innerScrollAttr;
    if (!scrollX && !scrollY) return;

    if (innerScrollAttr.find(function (attr) {
      return event.target.hasAttribute(attr);
    })) {
      event.stopPropagation();
      return;
    }

    var target = (0, _element.getParent)(event.target, "." + (0, _styles.scrollClass)('_'));
    if (target !== this.wheelElement) return;
    var wheel = (0, _normalizeWheel.default)(event);
    this.setBaseScrollHeightRatio(wheel.pixelY);
    if (scrollX) this.pixelX = (0, _config.isRTL)() ? this.pixelX - wheel.pixelX : this.pixelX + wheel.pixelX;
    if (scrollY) this.pixelY += wheel.pixelY * this.baseScrollRatio;

    if (Math.abs(wheel.pixelX) > Math.abs(wheel.pixelY)) {
      event.preventDefault();
    } else if (scrollY) event.preventDefault(); // if (!this.locked) {


    this.boundleScroll(); // }
  };

  _proto.handleScroll = function handleScroll(x, y, pixelX, pixelY, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        drag = _ref.drag;

    var scrollWidth = this.props.scrollWidth;

    var _this$getWheelRect = this.getWheelRect(),
        width = _this$getWheelRect.width,
        height = _this$getWheelRect.height;

    var max = Math.round((1 - width / scrollWidth) * scrollWidth);

    if (this.props.onScroll) {
      this.props.onScroll(x, y, max, this.inner, width, height, pixelX, pixelY, drag);
    }
  };

  _proto.handleScrollX = function handleScrollX(left) {
    this.handleScroll(left, this.props.top, undefined, 0, {
      drag: true
    });
  };

  _proto.handleScrollY = function handleScrollY(top) {
    this.handleScroll(this.props.left, top, undefined, undefined, {
      drag: true
    });
  };

  _proto.handleTouchStart = function handleTouchStart(e) {
    this.setStartPoint(e.changedTouches[0]);
  };

  _proto.handleTouchMove = function handleTouchMove(e) {
    var _this$props5 = this.props,
        scrollX = _this$props5.scrollX,
        scrollY = _this$props5.scrollY;
    e.preventDefault();
    var position = e.changedTouches[0];
    var moveX = position.clientX - this.touchStartX;
    var moveY = position.clientY - this.touchStartY;
    if (scrollX) this.pixelX = -moveX;
    if (scrollY) this.pixelY = -moveY; // need reset the start

    this.setStartPoint(position);
    this.boundleScroll();
  } // handle inner scroll cased by input focus
  ;

  _proto.handleInnerScroll = function handleInnerScroll(e) {
    var target = e.target;
    var _this$props6 = this.props,
        left = _this$props6.left,
        scrollWidth = _this$props6.scrollWidth,
        top = _this$props6.top,
        scrollHeight = _this$props6.scrollHeight;

    var _this$getWheelRect2 = this.getWheelRect(),
        width = _this$getWheelRect2.width,
        height = _this$getWheelRect2.height;

    if (target.scrollLeft || target.scrollTop) {
      var sLeft = target.scrollLeft ? left + target.scrollLeft / (scrollWidth - width) : left;
      var sTop = target.scrollTop ? top + target.scrollTop / (scrollHeight - height) : top;
      sTop = Math.min(1, sTop);
      sTop = Math.max(0, sTop);
      sLeft = Math.min(1, sLeft);
      sLeft = Math.max(0, sLeft);
      this.handleScroll(sLeft, sTop, undefined, undefined, {
        drag: true
      });
      target.scrollLeft = 0;
      target.scrollTop = 0;
    }
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        children = _this$props7.children,
        scrollWidth = _this$props7.scrollWidth,
        scrollHeight = _this$props7.scrollHeight,
        left = _this$props7.left,
        top = _this$props7.top,
        scrollX = _this$props7.scrollX,
        scrollY = _this$props7.scrollY,
        style = _this$props7.style;

    var _this$getWheelRect3 = this.getWheelRect(),
        width = _this$getWheelRect3.width,
        height = _this$getWheelRect3.height;

    var rtl = (0, _config.isRTL)();
    var className = (0, _classnames.default)((0, _styles.scrollClass)('_', scrollX && 'show-x', scrollY && 'show-y', rtl && 'rtl'), this.props.className);
    var yLength = scrollHeight < height ? scrollHeight : height;
    this.wheelY = scrollY && Math.ceil(scrollHeight) > Math.ceil(yLength);
    this.wheelX = scrollX && Math.ceil(scrollWidth) > Math.ceil(width);
    return _react.default.createElement("div", {
      style: style,
      ref: this.bindWheel,
      className: className
    }, _react.default.createElement("iframe", {
      tabIndex: -1,
      title: "scroll",
      ref: this.bindIframe,
      className: (0, _styles.scrollClass)('iframe')
    }), _react.default.createElement("div", {
      className: (0, _styles.scrollClass)('iframe')
    }), _react.default.createElement("div", {
      ref: this.bindInner,
      className: (0, _styles.scrollClass)('inner')
    }, _react.default.createElement(_context.Provider, {
      value: {
        left: left * width,
        top: top * height,
        element: this.wheelElement
      }
    }, children)), scrollY && _react.default.createElement(_Bar.default, {
      direction: "y",
      length: yLength,
      forceHeight: scrollHeight < height ? scrollHeight : undefined,
      scrollLength: scrollHeight,
      offset: top,
      onScroll: this.handleScrollY
    }), scrollX && _react.default.createElement(_Bar.default, {
      direction: "x",
      length: width,
      scrollLength: scrollWidth,
      offset: left,
      onScroll: this.handleScrollX
    }));
  };

  return Scroll;
}(_component.PureComponent);

Scroll.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  left: _propTypes.default.number.isRequired,
  // overLock: PropTypes.bool,
  top: _propTypes.default.number.isRequired,
  onScroll: _propTypes.default.func.isRequired,
  scrollHeight: _propTypes.default.number,
  scrollWidth: _propTypes.default.number,
  scrollX: _propTypes.default.bool.isRequired,
  scrollY: _propTypes.default.bool.isRequired,
  stable: _propTypes.default.bool,
  innerScrollAttr: _propTypes.default.arrayOf(_propTypes.default.string)
});
Scroll.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  // overLock: true,
  scrollHeight: 0,
  scrollWidth: 0,
  innerScrollAttr: []
});
var _default = Scroll;
exports.default = _default;