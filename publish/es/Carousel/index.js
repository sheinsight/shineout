import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { getProps, defaultProps } from '../utils/proptypes';
import { range } from '../utils/numbers';
import { carouselClass } from './styles';
import Item from './Item';
import getDataset from '../utils/dom/getDataset';
import { isRTL } from '../config';

var Carousel =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Carousel, _PureComponent);

  function Carousel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      current: 0,
      direction: 'stop',
      pre: 0
    };
    _this.handleMouseIn = _this.handleMouseIn.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.moveTo = _this.moveTo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    return Children.toArray(this.props.children).map(function (child, i) {
      return React.createElement(Item, {
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
    var className = carouselClass('indicator', "indicator-" + indicatorPosition);
    return React.createElement("div", {
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
    var className = carouselClass('indicator', "indicator-" + indicatorPosition, "indicator-" + indicatorType);
    var inds = range(this.count).map(function (i) {
      return React.createElement("a", {
        key: i,
        onClick: _this3.moveTo.bind(_this3, i),
        className: carouselClass(current === i && 'indicator-active')
      }, indicatorType === 'number' ? i + 1 : '');
    });

    if (isRTL()) {
      inds.reverse();
    }

    return React.createElement("div", {
      className: className
    }, inds);
  };

  _proto.render = function render() {
    this.count = Children.toArray(this.props.children).length;
    var _this$props3 = this.props,
        animation = _this$props3.animation,
        style = _this$props3.style;
    var direction = this.state.direction;
    var className = classnames(carouselClass('_', animation, direction), this.props.className);
    return React.createElement("div", _extends({
      className: className,
      style: style
    }, getDataset(this.props)), this.renderItems(), this.count > 1 && this.renderIndicator());
  };

  return Carousel;
}(PureComponent);

Carousel.propTypes = _objectSpread({}, getProps(PropTypes, 'size', 'type'), {
  animation: PropTypes.oneOf(['slide', 'slide-y', 'fade']),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  indicatorPosition: PropTypes.oneOf(['left', 'center', 'right']),
  indicatorType: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(['number', 'circle', 'line'])]),
  interval: PropTypes.number,
  onMove: PropTypes.func
});
Carousel.defaultProps = _objectSpread({}, defaultProps, {
  animation: 'slide',
  indicatorPosition: 'center',
  indicatorType: 'circle',
  interval: 0
});
Carousel.displayName = 'ShineoutCarousel';
export default Carousel;