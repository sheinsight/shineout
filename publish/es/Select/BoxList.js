import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocale } from '../locale'; // import icons from '../icons'

import { getKey } from '../utils/uid';
import List from '../AnimationList';
import Spin from '../Spin'; // import Input from '../Input'

import Checkbox from '../Checkbox/Checkbox';
import { selectClass } from './styles';
import BoxOption from './BoxOption';
import LazyList from '../AnimationList/LazyList';
import { getCustomList } from './utils';
var ScaleList = List(['fade', 'scale-y'], 'fast', 'flex');

var emptyFunc = function emptyFunc() {};

var BoxList =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(BoxList, _Component);

  function BoxList(props) {
    var _this;

    _this = _Component.call(this, props) || this; // fake events

    props.bindOptionFunc('handleHover', emptyFunc);
    props.bindOptionFunc('hoverMove', emptyFunc);
    props.bindOptionFunc('getIndex', emptyFunc);
    _this.handleSelectAll = _this.handleSelectAll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSearch = _this.handleSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRenderItem = _this.handleRenderItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = BoxList.prototype;

  _proto.getText = function getText(key) {
    return this.props.text[key] || getLocale(key);
  };

  _proto.getWidth = function getWidth() {
    var _this$props = this.props,
        columnWidth = _this$props.columnWidth,
        columns = _this$props.columns;
    if (columns === -1) return columnWidth;
    return columnWidth * columns;
  };

  _proto.handleSelectAll = function handleSelectAll(_, checked) {
    var _this$props2 = this.props,
        datum = _this$props2.datum,
        data = _this$props2.data;
    if (checked) datum.add(data);else datum.remove(data);
  };

  _proto.handleSearch = function handleSearch(text) {
    this.props.onFilter(text);
  };

  _proto.handleRenderItem = function handleRenderItem(data, groupIndex) {
    var _this$props3 = this.props,
        datum = _this$props3.datum,
        keygen = _this$props3.keygen,
        columns = _this$props3.columns,
        multiple = _this$props3.multiple,
        onChange = _this$props3.onChange,
        renderItem = _this$props3.renderItem,
        lineHeight = _this$props3.lineHeight;
    return React.createElement("div", {
      style: {
        height: lineHeight
      }
    }, data.map(function (d, i) {
      var isActive = datum.check(d);
      return React.createElement(BoxOption, {
        key: getKey(d, keygen, groupIndex + i),
        isActive: isActive,
        disabled: datum.disabled(d),
        data: d,
        columns: columns,
        multiple: multiple,
        onClick: onChange,
        renderItem: renderItem
      });
    }));
  } // renderFilter() {
  //   const { filterText } = this.props
  //   return (
  //     <Input.Group size="small" className={selectClass('filter-input')}>
  //       <Input value={filterText} onChange={this.handleSearch} />
  //       {icons.SEARCH}
  //     </Input.Group>
  //   )
  // }
  ;

  _proto.renderHeader = function renderHeader(count) {
    var _this$props4 = this.props,
        data = _this$props4.data,
        loading = _this$props4.loading,
        multiple = _this$props4.multiple,
        columnsTitle = _this$props4.columnsTitle;
    if (loading || !multiple) return null;
    var checked = 'indeterminate';
    if (count === 0) checked = false;else if (count === data.length) checked = true;
    return React.createElement("div", {
      className: selectClass('header')
    }, multiple && React.createElement(Checkbox, {
      onChange: this.handleSelectAll,
      checked: checked
    }, this.getText('selectAll')), columnsTitle && React.createElement("span", {
      className: selectClass('header-title')
    }, columnsTitle));
  };

  _proto.renderLazyList = function renderLazyList() {
    var _this$props5 = this.props,
        columns = _this$props5.columns,
        height = _this$props5.height,
        lineHeight = _this$props5.lineHeight,
        data = _this$props5.data,
        itemsInView = _this$props5.itemsInView;
    var sliceData = data.reduce(function (red, item) {
      var lastItem = red[red.length - 1];

      if (!lastItem) {
        lastItem = [];
        red.push(lastItem);
      }

      if (lastItem.length >= columns) red.push([item]);else lastItem.push(item);
      return red;
    }, []);
    return React.createElement(LazyList, {
      lineHeight: lineHeight,
      data: sliceData,
      itemsInView: itemsInView,
      height: height,
      renderItem: this.handleRenderItem
    });
  };

  _proto.renderStack = function renderStack() {
    var _this$props6 = this.props,
        columns = _this$props6.columns,
        datum = _this$props6.datum,
        multiple = _this$props6.multiple,
        onChange = _this$props6.onChange,
        renderItem = _this$props6.renderItem,
        data = _this$props6.data,
        keygen = _this$props6.keygen;
    return data.map(function (d, i) {
      var isActive = datum.check(d);
      return React.createElement(BoxOption, {
        key: getKey(d, keygen, i),
        isActive: isActive,
        disabled: datum.disabled(d),
        data: d,
        columns: columns,
        multiple: multiple,
        onClick: onChange,
        renderItem: renderItem
      });
    });
  };

  _proto.renderOptions = function renderOptions() {
    var _this$props7 = this.props,
        loading = _this$props7.loading,
        columns = _this$props7.columns,
        data = _this$props7.data,
        renderPending = _this$props7.renderPending,
        emptyText = _this$props7.emptyText;
    if (loading) return null;
    var stack = columns === -1;
    var empty = renderPending || data.length === 0;
    return React.createElement("div", {
      className: selectClass('box-options', stack && 'scrollable')
    }, empty ? React.createElement("div", {
      key: "empty",
      className: selectClass('no-data')
    }, emptyText || this.getText('noData')) : React.createElement(React.Fragment, null, stack ? this.renderStack() : this.renderLazyList()));
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        data = _this$props8.data,
        datum = _this$props8.datum,
        style = _this$props8.style,
        loading = _this$props8.loading,
        focus = _this$props8.focus,
        selectId = _this$props8.selectId,
        getRef = _this$props8.getRef,
        customHeader = _this$props8.customHeader,
        renderOptionList = _this$props8.renderOptionList;
    var checkedCount = data.filter(function (d) {
      return datum.check(d);
    }).length;
    var newStyle = Object.assign({}, style, {
      width: this.getWidth()
    });
    var results = React.createElement(React.Fragment, null, customHeader, loading && typeof loading === 'boolean' ? React.createElement(Spin, {
      size: 30
    }) : loading, this.renderHeader(checkedCount), this.renderOptions());
    return React.createElement(ScaleList, {
      show: focus,
      onMouseMove: this.handleMouseMove,
      "data-id": selectId,
      style: newStyle,
      className: selectClass('box-list'),
      getRef: getRef
    }, getCustomList(results, renderOptionList, loading));
  };

  return BoxList;
}(Component);

BoxList.propTypes = {
  bindOptionFunc: PropTypes.func.isRequired,
  columnWidth: PropTypes.number,
  columns: PropTypes.number,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  // filterText: PropTypes.string,
  focus: PropTypes.bool,
  keygen: PropTypes.any,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onFilter: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selectId: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.object,
  height: PropTypes.number,
  lineHeight: PropTypes.number,
  itemsInView: PropTypes.number,
  getRef: PropTypes.func,
  columnsTitle: PropTypes.any,
  customHeader: PropTypes.node,
  renderPending: PropTypes.bool,
  emptyText: PropTypes.node,
  renderOptionList: PropTypes.func
};
BoxList.defaultProps = {
  columnWidth: 160
};
export default BoxList;