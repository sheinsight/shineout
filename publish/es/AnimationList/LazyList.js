import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Fragment } from 'react';
import PropType from 'prop-types';
import { PureComponent } from '../component';
import Scroll from '../Scroll';
import { getKey } from '../utils/uid';
import { setTranslate } from '../utils/dom/translate';

var LazyList =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(LazyList, _PureComponent);

  function LazyList(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      currentIndex: 0,
      scrollTop: 0,
      fixed: ''
    };
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    setTranslate(this.optionInner, '0px', "0px");
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
    setTranslate(this.optionInner, '0px', "-" + (this.lastScrollTop + scrollTop * h) + "px");
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
      return React.createElement(Fragment, {
        key: getKey(d, keygen, i)
      }, renderItem(d, i));
    });
    var fr = Array(colNum).fill('1fr').join(' ');
    var gridStyle = colNum > 1 ? {
      display: 'grid',
      gridTemplateColumns: fr
    } : {};
    return React.createElement(Scroll, {
      stable: true,
      className: className,
      style: ms,
      scroll: fixed,
      onScroll: this.handleScroll,
      scrollHeight: scrollHeight,
      scrollTop: this.state.scrollTop
    }, React.createElement("div", {
      ref: function ref(el) {
        _this2.optionInner = el;
      },
      style: gridStyle
    }, React.createElement("div", {
      style: {
        height: currentIndex * lineHeight,
        gridColumnEnd: '-1'
      }
    }), items));
  };

  return LazyList;
}(PureComponent);

LazyList.defaultProps = {
  itemsInView: 10,
  lineHeight: 32,
  data: [],
  colNum: 1
};
LazyList.propTypes = {
  data: PropType.array,
  colNum: PropType.number,
  itemsInView: PropType.number,
  lineHeight: PropType.number,
  height: PropType.oneOfType([PropType.number, PropType.string]),
  renderItem: PropType.func.isRequired,
  stay: PropType.bool,
  className: PropType.string,
  style: PropType.object,
  keygen: PropType.oneOfType([PropType.string, PropType.func, PropType.bool])
};
export default LazyList;