"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _fixedLength = _interopRequireDefault(require("./fixedLength"));

var _config = require("../config");

var ScrollBar =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(ScrollBar, _PureComponent);

  function ScrollBar(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dragging: false
    };
    _this.bindHandle = _this.bindHandle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBarClick = _this.handleBarClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBgClick = _this.handleBgClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseMove = _this.handleMouseMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.unbindEvent = _this.unbindEvent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = ScrollBar.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unbindEvent();
  };

  _proto.toggleClassList = function toggleClassList(method) {
    var classList = this.handle.parentNode.parentNode.classList;

    if (classList) {
      classList[method]((0, _styles.scrollClass)('dragging'));
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

    if (direction === 'x' && (0, _config.isRTL)()) {
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
    var plus = (0, _config.isRTL)() ? event.clientX < rect.left : event.clientX > rect.left;
    var add = (0, _config.isRTL)() ? event.clientX > rect.left : event.clientX < rect.left;

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
    var rtl = (0, _config.isRTL)();
    var className = (0, _classnames.default)((0, _styles.scrollClass)('bar', direction, show && 'show', dragging && 'dragging', !forceHeight && 'padding-y'), this.props.className);
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

    return _react.default.createElement("div", {
      className: className,
      style: {
        height: forceHeight
      },
      onMouseDown: show ? this.handleBgClick : undefined
    }, _react.default.createElement("div", {
      className: (0, _styles.scrollClass)('handle'),
      onMouseDown: this.handleBarClick,
      ref: this.bindHandle,
      style: style
    }));
  };

  return ScrollBar;
}(_react.PureComponent);

ScrollBar.propTypes = {
  barLength: _propTypes.default.number.isRequired,
  className: _propTypes.default.string,
  direction: _propTypes.default.oneOf(['x', 'y']),
  forceHeight: _propTypes.default.number,
  length: _propTypes.default.number.isRequired,
  offset: _propTypes.default.number.isRequired,
  onScroll: _propTypes.default.func.isRequired,
  scrollLength: _propTypes.default.number.isRequired
};
ScrollBar.defaultProps = {
  direction: 'y'
};

var _default = (0, _fixedLength.default)(ScrollBar);

exports.default = _default;