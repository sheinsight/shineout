"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _btns = _interopRequireDefault(require("./btns"));

var _component = require("../component");

var _Card = _interopRequireDefault(require("./Card"));

var _styles = require("./styles");

var _context = _interopRequireDefault(require("./context"));

var _select = _interopRequireDefault(require("./select"));

var _config = require("../config");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var Transfer =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Transfer, _PureComponent);

  function Transfer(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      selecteds: props.selectedKeys ? (0, _select.default)(props.selectedKeys, props) : (0, _select.default)(props.defaultSelectedKeys, props) || [[], []]
    };
    _this.getSelected = _this.getSelected.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setSelecteds = _this.setSelecteds.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getLoading = _this.getLoading.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Transfer.prototype;

  _proto.getLoading = function getLoading(index) {
    var loading = this.props.loading;
    if (Array.isArray(loading)) return loading[index];
    return loading;
  };

  _proto.getSelected = function getSelected() {
    if ('selectedKeys' in this.props) return (0, _select.default)(this.props.selectedKeys, this.props);
    return this.state.selecteds;
  };

  _proto.setSelecteds = function setSelecteds(index, value) {
    var onSelectChange = this.props.onSelectChange;
    var selecteds = this.state.selecteds;
    var newSelecteds = index ? [selecteds[0], value] : [value, selecteds[1]];
    if (onSelectChange) onSelectChange(newSelecteds[0], newSelecteds[1]);
    this.setState({
      selecteds: newSelecteds
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        titles = _this$props.titles,
        data = _this$props.data,
        datum = _this$props.datum,
        keygen = _this$props.keygen,
        renderItem = _this$props.renderItem,
        footers = _this$props.footers,
        operations = _this$props.operations,
        operationIcon = _this$props.operationIcon,
        className = _this$props.className,
        style = _this$props.style,
        listClassName = _this$props.listClassName,
        listStyle = _this$props.listStyle,
        onFilter = _this$props.onFilter,
        onSearch = _this$props.onSearch,
        empty = _this$props.empty,
        disabled = _this$props.disabled,
        itemClass = _this$props.itemClass,
        rowsInView = _this$props.rowsInView,
        lineHeight = _this$props.lineHeight,
        listHeight = _this$props.listHeight,
        renderFilter = _this$props.renderFilter,
        children = _this$props.children;
    var selecteds = this.getSelected();
    var datumValues = datum.getValue(); // use this.props.value prioritized

    if ('value' in this.props && datumValues !== this.props.value) {
      this.props.datum.setValue(this.props.value);
    }

    var sources = [];
    var targets = [];

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      if (datum.check(d)) {
        targets.push(d);
      } else {
        sources.push(d);
      }
    }

    return _react.default.createElement("div", (0, _extends2.default)({
      className: (0, _classnames.default)((0, _styles.transferClass)('_', (0, _config.isRTL)() && 'rtl'), className),
      style: style
    }, (0, _getDataset.default)(this.props)), _react.default.createElement(_context.default.Provider, {
      value: {
        selecteds: selecteds,
        setSelecteds: this.setSelecteds,
        itemClass: itemClass
      }
    }, _react.default.createElement(_Card.default, {
      title: titles[0],
      selecteds: selecteds[0],
      data: sources,
      keygen: keygen,
      renderItem: renderItem,
      setSelecteds: this.setSelecteds,
      index: 0,
      footer: footers[0],
      listClassName: listClassName,
      listStyle: listStyle,
      loading: this.getLoading(0),
      onFilter: onFilter,
      empty: empty,
      disabled: disabled,
      onSearch: onSearch,
      rowsInView: rowsInView,
      lineHeight: lineHeight,
      listHeight: listHeight,
      renderFilter: renderFilter,
      customRender: children,
      values: datumValues
    }), _react.default.createElement(_btns.default, {
      selecteds: selecteds,
      datum: datum,
      setSelecteds: this.setSelecteds,
      keygen: keygen,
      sources: sources,
      targets: targets,
      operations: operations,
      operationIcon: operationIcon,
      data: data,
      disabled: disabled
    }), _react.default.createElement(_Card.default, {
      title: titles[1],
      selecteds: selecteds[1],
      data: targets,
      keygen: keygen,
      renderItem: renderItem,
      loading: this.getLoading(1),
      setSelecteds: this.setSelecteds,
      index: 1,
      footer: footers[1],
      listClassName: listClassName,
      listStyle: listStyle,
      onFilter: onFilter,
      empty: empty,
      disabled: disabled,
      onSearch: onSearch,
      rowsInView: rowsInView,
      lineHeight: lineHeight,
      listHeight: listHeight,
      renderFilter: renderFilter,
      customRender: children,
      values: datumValues
    })));
  };

  return Transfer;
}(_component.PureComponent);

Transfer.defaultProps = {
  titles: [],
  data: [],
  footers: [],
  operations: [],
  operationIcon: true,
  renderItem: function renderItem(d) {
    return d;
  },
  rowsInView: 20,
  lineHeight: 32,
  listHeight: 180
};
Transfer.propTypes = {
  titles: _propTypes.default.array,
  data: _propTypes.default.array,
  datum: _propTypes.default.object,
  keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  footers: _propTypes.default.array,
  operations: _propTypes.default.array,
  operationIcon: _propTypes.default.bool,
  value: _propTypes.default.array,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  listClassName: _propTypes.default.string,
  listStyle: _propTypes.default.object,
  selectedKeys: _propTypes.default.array,
  defaultSelectedKeys: _propTypes.default.array,
  onSelectChange: _propTypes.default.func,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  empty: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  onFilter: _propTypes.default.func,
  itemClass: _propTypes.default.string,
  loading: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.array]),
  onSearch: _propTypes.default.func,
  rowsInView: _propTypes.default.number,
  lineHeight: _propTypes.default.number,
  listHeight: _propTypes.default.number,
  renderFilter: _propTypes.default.func,
  children: _propTypes.default.func
};
var _default = Transfer;
exports.default = _default;