"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _locale = require("../locale");

var _uid = require("../utils/uid");

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _Checkbox = _interopRequireDefault(require("../Checkbox/Checkbox"));

var _styles = require("./styles");

var _BoxOption = _interopRequireDefault(require("./BoxOption"));

var _LazyList = _interopRequireDefault(require("../AnimationList/LazyList"));

var _utils = require("./utils");

// import icons from '../icons'
// import Input from '../Input'
var ScaleList = (0, _AnimationList.default)(['fade', 'scale-y'], 'fast', 'flex');

var emptyFunc = function emptyFunc() {};

var BoxList =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(BoxList, _Component);

  function BoxList(props) {
    var _this;

    _this = _Component.call(this, props) || this; // fake events

    props.bindOptionFunc('handleHover', emptyFunc);
    props.bindOptionFunc('hoverMove', emptyFunc);
    props.bindOptionFunc('getIndex', emptyFunc);
    _this.handleSelectAll = _this.handleSelectAll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSearch = _this.handleSearch.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRenderItem = _this.handleRenderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = BoxList.prototype;

  _proto.getText = function getText(key) {
    return this.props.text[key] || (0, _locale.getLocale)(key);
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
    return _react.default.createElement("div", {
      style: {
        height: lineHeight
      }
    }, data.map(function (d, i) {
      var isActive = datum.check(d);
      return _react.default.createElement(_BoxOption.default, {
        key: (0, _uid.getKey)(d, keygen, groupIndex + i),
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
    return _react.default.createElement("div", {
      className: (0, _styles.selectClass)('header')
    }, multiple && _react.default.createElement(_Checkbox.default, {
      onChange: this.handleSelectAll,
      checked: checked
    }, this.getText('selectAll')), columnsTitle && _react.default.createElement("span", {
      className: (0, _styles.selectClass)('header-title')
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
    return _react.default.createElement(_LazyList.default, {
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
      return _react.default.createElement(_BoxOption.default, {
        key: (0, _uid.getKey)(d, keygen, i),
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
    return _react.default.createElement("div", {
      className: (0, _styles.selectClass)('box-options', stack && 'scrollable')
    }, empty ? _react.default.createElement("div", {
      key: "empty",
      className: (0, _styles.selectClass)('no-data')
    }, emptyText || this.getText('noData')) : _react.default.createElement(_react.default.Fragment, null, stack ? this.renderStack() : this.renderLazyList()));
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

    var results = _react.default.createElement(_react.default.Fragment, null, customHeader, loading && typeof loading === 'boolean' ? _react.default.createElement(_Spin.default, {
      size: 30
    }) : loading, this.renderHeader(checkedCount), this.renderOptions());

    return _react.default.createElement(ScaleList, {
      show: focus,
      onMouseMove: this.handleMouseMove,
      "data-id": selectId,
      style: newStyle,
      className: (0, _styles.selectClass)('box-list'),
      getRef: getRef
    }, (0, _utils.getCustomList)(results, renderOptionList, loading));
  };

  return BoxList;
}(_react.Component);

BoxList.propTypes = {
  bindOptionFunc: _propTypes.default.func.isRequired,
  columnWidth: _propTypes.default.number,
  columns: _propTypes.default.number,
  data: _propTypes.default.array,
  datum: _propTypes.default.object.isRequired,
  // filterText: PropTypes.string,
  focus: _propTypes.default.bool,
  keygen: _propTypes.default.any,
  loading: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.bool]),
  multiple: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  selectId: _propTypes.default.string,
  style: _propTypes.default.object,
  text: _propTypes.default.object,
  height: _propTypes.default.number,
  lineHeight: _propTypes.default.number,
  itemsInView: _propTypes.default.number,
  getRef: _propTypes.default.func,
  columnsTitle: _propTypes.default.any,
  customHeader: _propTypes.default.node,
  renderPending: _propTypes.default.bool,
  emptyText: _propTypes.default.node,
  renderOptionList: _propTypes.default.func
};
BoxList.defaultProps = {
  columnWidth: 160
};
var _default = BoxList;
exports.default = _default;