import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { scrollClass } from './styles';
import fixedLength from './fixedLength';
import { isRTL } from '../config';

var ScrollBar =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ScrollBar, _PureComponent);

  function ScrollBar(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dragging: false
    };
    _this.bindHandle = _this.bindHandle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleBarClick = _this.handleBarClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleBgClick = _this.handleBgClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.unbindEvent = _this.unbindEvent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = ScrollBar.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unbindEvent();
  };

  _proto.toggleClassList = function toggleClassList(method) {
    var classList = this.handle.parentNode.parentNode.classList;

    if (classList) {
      classList[method](scrollClass('dragging'));
    }
  };

  _proto.bindHandle = function bindHandle(el) {
    this.handle = el;
  };

  _proto.bindEvent = function bindEvent() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.unbindEvent);
  };

  _proto.unbindEvent = function unbindEvent() {
    this.setState({
      dragging: false
    });
    this.toggleClassList('remove');
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.unbindEvent);
  };

  _proto.handleBarClick = function handleBarClick(event) {
    var offset = this.props.offset;
    this.cacheOffset = offset;
    this.setState({
      dragging: true
    });
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.toggleClassList('add');
    this.bindEvent();
  };

  _proto.handleMouseMove = function handleMouseMove(event) {
    var x = event.clientX - this.mouseX;
    var y = event.clientY - this.mouseY;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    var _this$props = this.props,
        direction = _this$props.direction,
        length = _this$props.length,
        onScroll = _this$props.onScroll,
        barLength = _this$props.barLength;
    var value = direction === 'x' ? x : y;
    var newOffset;

    if (direction === 'x' && isRTL()) {
      newOffset = this.cacheOffset - value / (length - barLength);
    } else {
      newOffset = this.cacheOffset + value / (length - barLength);
    }

    if (newOffset < 0) newOffset = 0;
    if (newOffset > 1) newOffset = 1;
    if (newOffset === this.cacheOffset) return;
    this.cacheOffset = newOffset;
    onScroll(newOffset);
  };

  _proto.handleBgClick = function handleBgClick(event) {
    if (event.target === this.handle) return;
    var _this$props2 = this.props,
        direction = _this$props2.direction,
        length = _this$props2.length,
        scrollLength = _this$props2.scrollLength,
        offset = _this$props2.offset,
        onScroll = _this$props2.onScroll;
    var rect = this.handle.getBoundingClientRect();
    var newOffset = offset;
    var page = length / (scrollLength - length);
    var plus = isRTL() ? event.clientX < rect.left : event.clientX > rect.left;
    var add = isRTL() ? event.clientX > rect.left : event.clientX < rect.left;

    if (direction === 'x' && add || direction === 'y' && event.clientY < rect.top) {
      newOffset = offset - page;
      if (newOffset < 0) newOffset = 0;
    } else if (direction === 'x' && plus || direction === 'y' && event.clientY > rect.top) {
      newOffset = offset + page;
      if (newOffset > 1) newOffset = 1;
    }

    onScroll(newOffset);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        direction = _this$props3.direction,
        length = _this$props3.length,
        scrollLength = _this$props3.scrollLength,
        offset = _this$props3.offset,
        barLength = _this$props3.barLength,
        forceHeight = _this$props3.forceHeight;
    var dragging = this.state.dragging;
    var show = scrollLength > length;
    var rtl = isRTL();
    var className = classnames(scrollClass('bar', direction, show && 'show', dragging && 'dragging', !forceHeight && 'padding-y'), this.props.className);
    var value = (length - barLength) * offset;
    var x = rtl ? 'right' : 'left';
    var style = {};

    if (scrollLength > 0) {
      if (direction === 'x') {
        style.width = length / scrollLength * 100 + "%";
        style[x] = value;
      } else {
        style.height = length / scrollLength * 100 + "%";
        style.top = value;
      }
    }

    return React.createElement("div", {
      className: className,
      style: {
        height: forceHeight
      },
      onMouseDown: show ? this.handleBgClick : undefined
    }, React.createElement("div", {
      className: scrollClass('handle'),
      onMouseDown: this.handleBarClick,
      ref: this.bindHandle,
      style: style
    }));
  };

  return ScrollBar;
}(PureComponent);

ScrollBar.propTypes = {
  barLength: PropTypes.number.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['x', 'y']),
  forceHeight: PropTypes.number,
  length: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
  scrollLength: PropTypes.number.isRequired
};
ScrollBar.defaultProps = {
  direction: 'y'
};
export default fixedLength(ScrollBar);