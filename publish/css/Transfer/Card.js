"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _filter = _interopRequireDefault(require("./filter"));

var _Card = _interopRequireDefault(require("../Card"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _component = require("../component");

var _styles = require("./styles");

var _uid = require("../utils/uid");

var _func = require("../utils/func");

var _is = require("../utils/is");

var _item = _interopRequireDefault(require("./item"));

var _LazyList = _interopRequireDefault(require("../AnimationList/LazyList"));

var _locale = require("../locale");

var _Input = _interopRequireDefault(require("../Input"));

var Card =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Card, _PureComponent);

  function Card(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.getCheckAll = _this.getCheckAll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.checkAll = _this.checkAll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRenderItem = _this.handleRenderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindCardBody = _this.bindCardBody.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.customSetSelected = _this.customSetSelected.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      listHeight: props.listHeight,
      mounted: false
    };
    return _this;
  }

  var _proto = Card.prototype;

  _proto.getCheckAll = function getCheckAll() {
    var _this$props = this.props,
        selecteds = _this$props.selecteds,
        data = _this$props.data;
    if (selecteds.length === 0) return false;
    if (selecteds.length === data.length) return true;
    return 'indeterminate';
  };

  _proto.bindCardBody = function bindCardBody(node) {
    this.cardBody = node;
    var listHeight = this.props.listHeight;

    if (node) {
      listHeight = node.offsetHeight;
    }

    this.setState({
      listHeight: listHeight,
      mounted: true
    });
  };

  _proto.checkAll = function checkAll(c) {
    var _this$props2 = this.props,
        setSelecteds = _this$props2.setSelecteds,
        index = _this$props2.index,
        data = _this$props2.data,
        keygen = _this$props2.keygen,
        disabled = _this$props2.disabled;

    if (c) {
      if (typeof disabled === 'function') setSelecteds(index, data.reduce(function (r, d, i) {
        if (disabled(d)) return r;
        r.push((0, _uid.getKey)(d, keygen, i));
        return r;
      }, []));else setSelecteds(index, data.map(function (d, i) {
        return (0, _uid.getKey)(d, keygen, i);
      }));
    } else {
      setSelecteds(index, []);
    }
  };

  _proto.handleRenderItem = function handleRenderItem(d, i) {
    var _this$props3 = this.props,
        keygen = _this$props3.keygen,
        index = _this$props3.index,
        renderItem = _this$props3.renderItem,
        disabled = _this$props3.disabled,
        lineHeight = _this$props3.lineHeight;
    var disable = disabled === true;
    var key = (0, _uid.getKey)(d, keygen, i);
    return _react.default.createElement(_item.default, {
      lineHeight: lineHeight,
      key: key,
      disabled: disable || typeof disabled === 'function' && disabled(d),
      index: index,
      checkKey: key,
      liData: d,
      content: (0, _func.createFunc)(renderItem)(d)
    });
  };

  _proto.customSetSelected = function customSetSelected(value) {
    var _this$props4 = this.props,
        index = _this$props4.index,
        setSelecteds = _this$props4.setSelecteds,
        selecteds = _this$props4.selecteds;

    if (typeof value === 'string') {
      setSelecteds(index, [].concat(selecteds, [value]));
      return;
    }

    if (Array.isArray(value)) {
      setSelecteds(index, value);
    }
  };

  _proto.renderLazyList = function renderLazyList() {
    var _this$props5 = this.props,
        filterText = _this$props5.filterText,
        data = _this$props5.data,
        rowsInView = _this$props5.rowsInView,
        lineHeight = _this$props5.lineHeight;
    var _this$state = this.state,
        mounted = _this$state.mounted,
        listHeight = _this$state.listHeight;
    if (!mounted) return null;
    return _react.default.createElement(_LazyList.default, {
      stay: !filterText,
      data: data,
      itemsInView: rowsInView,
      lineHeight: lineHeight,
      height: listHeight,
      scrollHeight: lineHeight * data.length,
      renderItem: this.handleRenderItem
    });
  };

  _proto.renderBody = function renderBody() {
    var _this$props6 = this.props,
        customRender = _this$props6.customRender,
        index = _this$props6.index,
        values = _this$props6.values,
        filterText = _this$props6.filterText;

    if ((0, _is.isFunc)(customRender)) {
      var custom = customRender({
        onSelected: this.customSetSelected,
        direction: index === 0 ? 'left' : 'right',
        selectedKeys: this.props.selecteds,
        value: values,
        filterText: filterText
      });
      if (custom) return custom;
    }

    return this.renderLazyList();
  };

  _proto.renderFilter = function renderFilter() {
    var _this$props7 = this.props,
        onFilter = _this$props7.onFilter,
        onSearch = _this$props7.onSearch,
        renderFilter = _this$props7.renderFilter,
        filterText = _this$props7.filterText,
        disabled = _this$props7.disabled;
    if (!onFilter && !onSearch) return null;

    if (renderFilter && typeof renderFilter === 'function') {
      return _react.default.createElement("div", {
        className: (0, _styles.transferClass)('filter')
      }, renderFilter({
        value: filterText,
        disabled: disabled === true,
        onFilter: onFilter,
        placeholder: (0, _locale.getLocale)('search')
      }));
    }

    return _react.default.createElement("div", {
      className: (0, _styles.transferClass)('filter')
    }, _react.default.createElement(_Input.default, {
      disabled: disabled === true,
      onChange: onFilter,
      placeholder: (0, _locale.getLocale)('search'),
      clearable: true,
      value: filterText
    }));
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        title = _this$props8.title,
        data = _this$props8.data,
        selecteds = _this$props8.selecteds,
        footer = _this$props8.footer,
        listClassName = _this$props8.listClassName,
        listStyle = _this$props8.listStyle,
        empty = _this$props8.empty,
        disabled = _this$props8.disabled,
        loading = _this$props8.loading,
        listHeight = _this$props8.listHeight,
        customRender = _this$props8.customRender;
    var check = this.getCheckAll();
    var disable = disabled === true;
    var listms = Object.assign({}, listStyle, {
      height: listHeight
    });
    return _react.default.createElement(_Card.default, {
      className: (0, _styles.transferClass)('card')
    }, _react.default.createElement(_Card.default.Header, {
      className: (0, _styles.transferClass)('card-header')
    }, _react.default.createElement("div", null, _react.default.createElement(_Checkbox.default, {
      onChange: this.checkAll,
      checked: check,
      disabled: disable
    }, check ? selecteds.length + " " + (0, _locale.getLocale)('selected') : (0, _locale.getLocale)('selectAll'))), _react.default.createElement("div", {
      className: (0, _styles.transferClass)('card-header-title')
    }, title)), this.renderFilter(), _react.default.createElement(_Spin.default, {
      loading: loading
    }, _react.default.createElement(_Card.default.Body, {
      className: (0, _classnames.default)((0, _styles.transferClass)('card-body'), listClassName),
      style: listms
    }, _react.default.createElement("div", {
      className: (0, _styles.transferClass)('body-container'),
      ref: this.bindCardBody
    }, this.renderBody(), !(0, _is.isFunc)(customRender) && data.length === 0 && _react.default.createElement("div", {
      className: (0, _styles.transferClass)('empty')
    }, empty || (0, _locale.getLocale)('noData'))))), footer && _react.default.createElement(_Card.default.Footer, {
      className: (0, _styles.transferClass)('card-footer')
    }, footer));
  };

  return Card;
}(_component.PureComponent);

Card.propTypes = {
  selecteds: _propTypes.default.array,
  keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  data: _propTypes.default.array,
  setSelecteds: _propTypes.default.func,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  index: _propTypes.default.number,
  footer: _propTypes.default.object,
  listClassName: _propTypes.default.string,
  listStyle: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  onFilter: _propTypes.default.func,
  empty: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  loading: _propTypes.default.bool,
  onSearch: _propTypes.default.func,
  rowsInView: _propTypes.default.number,
  lineHeight: _propTypes.default.number,
  listHeight: _propTypes.default.number,
  filterText: _propTypes.default.string,
  renderFilter: _propTypes.default.func,
  customRender: _propTypes.default.func,
  values: _propTypes.default.array
};

var _default = (0, _filter.default)(Card);

exports.default = _default;