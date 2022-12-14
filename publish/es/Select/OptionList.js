import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getKey } from '../utils/uid';
import { setTranslate } from '../utils/dom/translate';
import List from '../AnimationList';
import Scroll from '../Scroll';
import Spin from '../Spin';
import { getLocale } from '../locale';
import { selectClass } from './styles';
import Option from './Option';
import { getDirectionClass } from '../utils/classname';
import { getCustomList } from './utils';
var ScaleList = List(['fade', 'scale-y'], 'fast');

var OptionList =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(OptionList, _Component);

  function OptionList(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      currentIndex: 0,
      hoverIndex: props.hideCreateOption ? -1 : 0,
      scrollTop: 0
    };
    _this.hoverMove = _this.hoverMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHover = _this.handleHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderList = _this.renderList.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.lastScrollTop = 0;
    props.bindOptionFunc('handleHover', _this.handleHover);
    props.bindOptionFunc('hoverMove', _this.hoverMove);
    props.bindOptionFunc('getIndex', function () {
      return _this.state.hoverIndex;
    });
    return _this;
  }

  var _proto = OptionList.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var data = this.props.data;

    if (data !== prevProps.data && data.length !== prevProps.data.length) {
      this.lastScrollTop = 0; // eslint-disable-next-line

      this.setState({
        currentIndex: 0,
        scrollTop: 0
      }, function () {
        if (_this2.optionInner) {
          setTranslate(_this2.optionInner, '0px', '0px');
          _this2.optionInner.style.marginTop = '0px';
        }
      });
    }
  };

  _proto.getText = function getText(key) {
    return this.props.text[key] || getLocale(key);
  };

  _proto.hoverMove = function hoverMove(step) {
    var max = this.props.data.length;
    var _this$props = this.props,
        lineHeight = _this$props.lineHeight,
        height = _this$props.height,
        groupKey = _this$props.groupKey;
    var _this$state = this.state,
        hoverIndex = _this$state.hoverIndex,
        currentIndex = _this$state.currentIndex;
    if (hoverIndex === undefined) hoverIndex = currentIndex;else hoverIndex += step;

    if (hoverIndex >= max) {
      hoverIndex = 0;
      this.lastScrollTop = 0;
    } // jump the group, the group would't be the last, so do't need to fixed the last


    var data = this.props.data[hoverIndex];

    if (data && data[groupKey]) {
      if (step > 0) hoverIndex += 1;else hoverIndex -= 1;
    }

    if (hoverIndex < 0) hoverIndex = max - 1;
    var scrollTop = hoverIndex / max;
    var offset = scrollTop * height;
    var emptyHeight = hoverIndex * lineHeight + offset;

    if (emptyHeight < this.lastScrollTop + offset) {
      // absolute at top
      this.optionInner.style.marginTop = offset + "px";
      setTranslate(this.optionInner, '0px', "-" + emptyHeight + "px");
      this.lastScrollTop = emptyHeight - offset;
      currentIndex = hoverIndex - 1;
      if (currentIndex < 0) currentIndex = max;
      this.setState({
        currentIndex: currentIndex,
        scrollTop: emptyHeight / (lineHeight * max)
      });
    } else if (emptyHeight + lineHeight > this.lastScrollTop + offset + height) {
      // absolute at bottom
      this.optionInner.style.marginTop = offset + "px";
      var scrollHeight = emptyHeight + lineHeight - height;
      setTranslate(this.optionInner, '0px', "-" + scrollHeight + "px");
      this.lastScrollTop = scrollHeight - offset;
      currentIndex = hoverIndex - Math.ceil(height / lineHeight);
      if (currentIndex < 0) currentIndex = 0;
      this.setState({
        currentIndex: currentIndex,
        scrollTop: scrollHeight / (lineHeight * max)
      });
    } else if (hoverIndex === 0 && emptyHeight === 0) {
      // reset to top
      this.optionInner.style.marginTop = '0px';
      setTranslate(this.optionInner, '0px', '0px');
      this.setState({
        currentIndex: 0,
        scrollTop: 0
      });
    }

    this.setState({
      hoverIndex: hoverIndex
    });
  };

  _proto.handleScroll = function handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    if (!this.optionInner) return;
    var _this$props2 = this.props,
        data = _this$props2.data,
        itemsInView = _this$props2.itemsInView,
        lineHeight = _this$props2.lineHeight;
    var fullHeight = itemsInView * lineHeight;
    var contentHeight = data.length * lineHeight - h;
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
      currentIndex: index
    });
  };

  _proto.handleHover = function handleHover(index, force) {
    if ((this.props.control === 'mouse' || force) && this.state.hoverIndex !== index) {
      this.setState({
        hoverIndex: index
      });
    }
  };

  _proto.handleMouseMove = function handleMouseMove() {
    this.props.onControlChange('mouse');
  };

  _proto.renderList = function renderList() {
    var _this3 = this;

    var _this$props3 = this.props,
        loading = _this$props3.loading,
        data = _this$props3.data,
        renderPending = _this$props3.renderPending,
        height = _this$props3.height,
        lineHeight = _this$props3.lineHeight,
        itemsInView = _this$props3.itemsInView,
        datum = _this$props3.datum,
        keygen = _this$props3.keygen,
        multiple = _this$props3.multiple,
        onChange = _this$props3.onChange,
        renderItem = _this$props3.renderItem,
        groupKey = _this$props3.groupKey,
        filterText = _this$props3.filterText,
        emptyText = _this$props3.emptyText;
    var _this$state2 = this.state,
        hoverIndex = _this$state2.hoverIndex,
        currentIndex = _this$state2.currentIndex;
    var scroll = '';
    var scrollHeight = lineHeight * data.length;

    if (height < scrollHeight) {
      scroll = 'y';
    }

    if (loading) return React.createElement("span", {
      className: selectClass(getDirectionClass('option'))
    }, typeof loading === 'boolean' ? React.createElement(Spin, {
      size: 20
    }) : loading);
    if (data.length === 0 || renderPending) return React.createElement("span", {
      className: selectClass(getDirectionClass('option'))
    }, emptyText || this.getText('noData'));
    return React.createElement(Scroll, {
      scroll: scroll,
      style: {
        height: scroll ? height : undefined
      },
      onScroll: this.handleScroll,
      scrollHeight: data.length * lineHeight,
      scrollTop: this.state.scrollTop
    }, React.createElement("div", {
      ref: function ref(el) {
        _this3.optionInner = el;
      }
    }, React.createElement("div", {
      style: {
        height: currentIndex * lineHeight
      }
    }), data.slice(currentIndex, currentIndex + itemsInView).map(function (d, i) {
      return React.createElement(Option, {
        isActive: datum.check(d),
        disabled: datum.disabled(d),
        isHover: hoverIndex === currentIndex + i,
        key: d && d[groupKey] ? "__" + d[groupKey] + "__" : getKey(d, keygen, i),
        index: currentIndex + i,
        data: d,
        multiple: multiple,
        onClick: onChange,
        renderItem: renderItem,
        onHover: _this3.handleHover,
        groupKey: groupKey,
        filterText: filterText
      });
    })));
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        control = _this$props4.control,
        focus = _this$props4.focus,
        style = _this$props4.style,
        selectId = _this$props4.selectId,
        autoClass = _this$props4.autoClass,
        getRef = _this$props4.getRef,
        customHeader = _this$props4.customHeader,
        renderOptionList = _this$props4.renderOptionList,
        loading = _this$props4.loading;
    var result = React.createElement(React.Fragment, null, customHeader, this.renderList());
    return React.createElement(ScaleList, {
      show: focus,
      onMouseMove: this.handleMouseMove,
      style: style,
      "data-id": selectId,
      className: classnames(selectClass('options', "control-" + control), autoClass),
      getRef: getRef
    }, getCustomList(result, renderOptionList, loading));
  };

  return OptionList;
}(Component);

OptionList.propTypes = {
  control: PropTypes.oneOf(['mouse', 'keyboard']),
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  focus: PropTypes.bool,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  keygen: PropTypes.any,
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  multiple: PropTypes.bool,
  onControlChange: PropTypes.func,
  onChange: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  renderPending: PropTypes.bool,
  selectId: PropTypes.string,
  bindOptionFunc: PropTypes.func.isRequired,
  autoClass: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.object,
  groupKey: PropTypes.string,
  getRef: PropTypes.func,
  customHeader: PropTypes.node,
  filterText: PropTypes.string,
  hideCreateOption: PropTypes.bool,
  emptyText: PropTypes.node,
  renderOptionList: PropTypes.func
};
export default OptionList;