"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Scroll = _interopRequireDefault(require("../Scroll"));

var _uid = require("../utils/uid");

var _translate = require("../utils/dom/translate");

var LazyList =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(LazyList, _PureComponent);

  function LazyList(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      currentIndex: 0,
      scrollTop: 0,
      fixed: ''
    };
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = LazyList.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.props.stay && prevProps.data.length !== this.props.data.length) {
      this.resetScrollTop();
    }
  };

  _proto.getScrollHeight = function getScrollHeight() {
    var _this$props = this.props,
        lineHeight = _this$props.lineHeight,
        data = _this$props.data,
        colNum = _this$props.colNum;
    var rows = Math.ceil(data.length / colNum);
    return rows * lineHeight;
  };

  _proto.resetScrollTop = function resetScrollTop() {
    this.setState({
      currentIndex: 0,
      scrollTop: 0
    });
    (0, _translate.setTranslate)(this.optionInner, '0px', "0px");
    this.optionInner.style.marginTop = "0px";
    this.lastScrollTop = 0;
  };

  _proto.handleScroll = function handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    if (!this.optionInner) return;
    var scrollHeight = this.getScrollHeight();
    var _this$props2 = this.props,
        data = _this$props2.data,
        itemsInView = _this$props2.itemsInView,
        lineHeight = _this$props2.lineHeight;
    var fullHeight = itemsInView * lineHeight;
    var contentHeight = scrollHeight - h;
    var scrollTop = h > fullHeight ? 0 : y;
    this.optionInner.style.marginTop = scrollTop * h + "px";

    if (pixelY === undefined || pixelY === 0) {
      this.lastScrollTop = scrollTop * contentHeight;
    } else {
      this.lastScrollTop += pixelY;
      if (this.lastScrollTop < 0) this.lastScrollTop = 0; // scroll over bottom

      if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight;
      scrollTop = this.lastScrollTop / contentHeight;
      this.optionInner.style.marginTop = scrollTop * h + "px";
    }

    var index = Math.floor(this.lastScrollTop / lineHeight) - 1;
    if (data.length - itemsInView < index) index = data.length - itemsInView;
    if (index < 0) index = 0;
    (0, _translate.setTranslate)(this.optionInner, '0px', "-" + (this.lastScrollTop + scrollTop * h) + "px");
    this.setState({
      scrollTop: scrollTop,
      currentIndex: index,
      fixed: h < this.getScrollHeight() ? 'y' : ''
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        className = _this$props3.className,
        style = _this$props3.style,
        height = _this$props3.height,
        lineHeight = _this$props3.lineHeight,
        data = _this$props3.data,
        itemsInView = _this$props3.itemsInView,
        renderItem = _this$props3.renderItem,
        keygen = _this$props3.keygen,
        colNum = _this$props3.colNum;
    var _this$state = this.state,
        currentIndex = _this$state.currentIndex,
        fixed = _this$state.fixed;
    var scrollHeight = this.getScrollHeight();
    var ms = Object.assign({}, style, height && {
      height: height
    });
    var items = data.slice(currentIndex * colNum, (currentIndex + itemsInView) * colNum).map(function (d, i) {
      return _react.default.createElement(_react.Fragment, {
        key: (0, _uid.getKey)(d, keygen, i)
      }, renderItem(d, i));
    });
    var fr = Array(colNum).fill('1fr').join(' ');
    var gridStyle = colNum > 1 ? {
      display: 'grid',
      gridTemplateColumns: fr
    } : {};
    return _react.default.createElement(_Scroll.default, {
      stable: true,
      className: className,
      style: ms,
      scroll: fixed,
      onScroll: this.handleScroll,
      scrollHeight: scrollHeight,
      scrollTop: this.state.scrollTop
    }, _react.default.createElement("div", {
      ref: function ref(el) {
        _this2.optionInner = el;
      },
      style: gridStyle
    }, _react.default.createElement("div", {
      style: {
        height: currentIndex * lineHeight,
        gridColumnEnd: '-1'
      }
    }), items));
  };

  return LazyList;
}(_component.PureComponent);

LazyList.defaultProps = {
  itemsInView: 10,
  lineHeight: 32,
  data: [],
  colNum: 1
};
LazyList.propTypes = {
  data: _propTypes.default.array,
  colNum: _propTypes.default.number,
  itemsInView: _propTypes.default.number,
  lineHeight: _propTypes.default.number,
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  renderItem: _propTypes.default.func.isRequired,
  stay: _propTypes.default.bool,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.bool])
};
var _default = LazyList;
exports.default = _default;