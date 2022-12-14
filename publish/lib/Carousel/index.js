"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _numbers = require("../utils/numbers");

var _styles = require("./styles");

var _Item = _interopRequireDefault(require("./Item"));

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _config = require("../config");

var Carousel =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Carousel, _PureComponent);

  function Carousel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      current: 0,
      direction: 'stop',
      pre: 0
    };
    _this.handleMouseIn = _this.handleMouseIn.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseOut = _this.handleMouseOut.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.moveTo = _this.moveTo.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.setNext(1);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.count > 1 && !this.$timeout) {
      this.setNext(this.state.current + 1);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    if (this.$timeout) {
      clearTimeout(this.$timeout);
      this.$timeout = null;
    }
  };

  _proto.setNext = function setNext(next) {
    var _this2 = this;

    var interval = this.props.interval;

    if (interval > 0 && this.count > 1) {
      if (this.$timeout) {
        clearTimeout(this.$timeout);
        this.$timeout = null;
      }

      this.$timeout = setTimeout(function () {
        _this2.moveTo(next);
      }, interval);
    }
  };

  _proto.moveTo = function moveTo(next) {
    var onMove = this.props.onMove;
    var current = this.state.current;
    if (next === current) return;
    var direction = next > current ? 'forward' : 'backward';

    if (next >= this.count) {
      direction = 'forward';
      next = 0;
    }

    this.setState({
      pre: current,
      current: next,
      direction: direction
    });
    this.setNext(next + 1);
    if (onMove) onMove(next, {
      prev: current,
      direction: direction,
      moveTo: this.moveTo
    });
  };

  _proto.handleMouseIn = function handleMouseIn() {
    this.mouseInView = true;
  };

  _proto.handleMouseOut = function handleMouseOut() {
    this.mouseInView = false;
    this.setNext(this.state.current + 1);
  };

  _proto.renderItems = function renderItems() {
    var _this$state = this.state,
        current = _this$state.current,
        pre = _this$state.pre;
    return _react.Children.toArray(this.props.children).map(function (child, i) {
      return _react.default.createElement(_Item.default, {
        key: i,
        current: i === current,
        pre: i === pre && pre !== current
      }, child);
    });
  };

  _proto.renderCustomIndicator = function renderCustomIndicator() {
    var _this$props = this.props,
        indicatorType = _this$props.indicatorType,
        indicatorPosition = _this$props.indicatorPosition;
    var current = this.state.current;
    var className = (0, _styles.carouselClass)('indicator', "indicator-" + indicatorPosition);
    return _react.default.createElement("div", {
      className: className
    }, indicatorType(current, this.moveTo));
  };

  _proto.renderIndicator = function renderIndicator() {
    var _this3 = this;

    var _this$props2 = this.props,
        indicatorPosition = _this$props2.indicatorPosition,
        indicatorType = _this$props2.indicatorType;

    if (typeof indicatorType === 'function') {
      return this.renderCustomIndicator();
    }

    var current = this.state.current;
    var className = (0, _styles.carouselClass)('indicator', "indicator-" + indicatorPosition, "indicator-" + indicatorType);
    var inds = (0, _numbers.range)(this.count).map(function (i) {
      return _react.default.createElement("a", {
        key: i,
        onClick: _this3.moveTo.bind(_this3, i),
        className: (0, _styles.carouselClass)(current === i && 'indicator-active')
      }, indicatorType === 'number' ? i + 1 : '');
    });

    if ((0, _config.isRTL)()) {
      inds.reverse();
    }

    return _react.default.createElement("div", {
      className: className
    }, inds);
  };

  _proto.render = function render() {
    this.count = _react.Children.toArray(this.props.children).length;
    var _this$props3 = this.props,
        animation = _this$props3.animation,
        style = _this$props3.style;
    var direction = this.state.direction;
    var className = (0, _classnames.default)((0, _styles.carouselClass)('_', animation, direction), this.props.className);
    return _react.default.createElement("div", (0, _extends2.default)({
      className: className,
      style: style
    }, (0, _getDataset.default)(this.props)), this.renderItems(), this.count > 1 && this.renderIndicator());
  };

  return Carousel;
}(_component.PureComponent);

Carousel.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'size', 'type'), {
  animation: _propTypes.default.oneOf(['slide', 'slide-y', 'fade']),
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.element]),
  indicatorPosition: _propTypes.default.oneOf(['left', 'center', 'right']),
  indicatorType: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.oneOf(['number', 'circle', 'line'])]),
  interval: _propTypes.default.number,
  onMove: _propTypes.default.func
});
Carousel.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  animation: 'slide',
  indicatorPosition: 'center',
  indicatorType: 'circle',
  interval: 0
});
Carousel.displayName = 'ShineoutCarousel';
var _default = Carousel;
exports.default = _default;