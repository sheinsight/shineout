"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _config = require("../config");

var _component = require("../component");

var _locale = require("../locale");

var _func = require("../utils/func");

var _classname = require("../utils/classname");

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _fixedAuto = _interopRequireDefault(require("./fixedAuto"));

var _Datum = _interopRequireDefault(require("../Datum"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _resizable = _interopRequireDefault(require("./resizable"));

var _hidable = require("../hoc/hidable");

var _SeperateTable = _interopRequireDefault(require("./SeperateTable"));

var _SimpleTable = _interopRequireDefault(require("./SimpleTable"));

var _Tr = require("./Tr");

var _Tbody = require("./Tbody");

var _select = _interopRequireDefault(require("./select"));

var ResizeSeperateTable = (0, _resizable.default)(_SeperateTable.default);
var ResizeSimpleTable = (0, _resizable.default)(_SimpleTable.default);

var RadioWrapper = function RadioWrapper(Origin) {
  return function (props) {
    return (// eslint-disable-next-line react/prop-types
      _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        distinct: true,
        limit: props.radio ? 1 : 0
      }))
    );
  };
};

var Table =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Table, _Component);

  function Table(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      scrollLeft: 0,
      scrollRight: 0
    };
    _this.bindTable = _this.bindTable.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Table.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(preProps) {
    var _this$props = this.props,
        datum = _this$props.datum,
        treeCheckAll = _this$props.treeCheckAll;
    datum.dispatch(_Tr.ROW_HEIGHT_UPDATE_EVENT);
    datum.dispatch(_Tbody.RENDER_COL_GROUP_EVENT);

    if (treeCheckAll && this.props.data !== preProps.data) {
      datum.cleanDataCache();
    }
  };

  _proto.getRowsInView = function getRowsInView() {
    var _this$props2 = this.props,
        rowsInView = _this$props2.rowsInView,
        data = _this$props2.data,
        fixed = _this$props2.fixed;
    var dataLength = data.length;
    if (rowsInView <= 0 || rowsInView > dataLength || fixed === 'x') return dataLength;
    return parseInt(rowsInView, 10);
  };

  _proto.bindTable = function bindTable(el) {
    var bindWrapper = this.props.bindWrapper;
    this.table = el;
    if (el && bindWrapper) bindWrapper(el);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        striped = _this$props3.striped,
        bordered = _this$props3.bordered,
        size = _this$props3.size,
        hover = _this$props3.hover,
        height = _this$props3.height,
        columns = _this$props3.columns,
        children = _this$props3.children,
        empty = _this$props3.empty,
        data = _this$props3.data,
        style = _this$props3.style,
        fixed = _this$props3.fixed,
        width = _this$props3.width,
        loading = _this$props3.loading,
        verticalAlign = _this$props3.verticalAlign,
        columnResizable = _this$props3.columnResizable,
        events = _this$props3.events,
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["striped", "bordered", "size", "hover", "height", "columns", "children", "empty", "data", "style", "fixed", "width", "loading", "verticalAlign", "columnResizable", "events"]);
    var _this$state = this.state,
        scrollLeft = _this$state.scrollLeft,
        scrollRight = _this$state.scrollRight;
    var className = (0, _classnames.default)((0, _styles.tableClass)('_', size, hover && 'hover', bordered && 'bordered', fixed && 'fixed', scrollLeft > 0 && 'left-float', scrollRight < 0 && 'right-float', "vertical-" + verticalAlign, columnResizable && 'resize', others.sticky && 'sticky', (0, _config.isRTL)() && 'rtl'), this.props.className);
    var props = (0, _objectSpread2.default)({}, others, {
      children: children,
      fixed: fixed,
      rowsInView: this.getRowsInView(),
      loading: loading,
      height: height,
      width: width,
      data: data,
      columns: columns,
      striped: striped,
      bordered: bordered,
      columnResizable: columnResizable
    });
    var isEmpty = (!data || data.length === 0) && !children;
    var useSeparate = fixed && !isEmpty;
    var ResizeSepTable = columnResizable ? ResizeSeperateTable : _SeperateTable.default;
    var ResizeSimTable = columnResizable ? ResizeSimpleTable : _SimpleTable.default;
    var RenderTable = useSeparate ? ResizeSepTable : ResizeSimTable;
    var newStyle = Object.assign({}, style);
    if (height) newStyle.height = height;
    if (useSeparate && !newStyle.height) newStyle.height = '100%';
    if (loading) newStyle.overflow = 'hidden';
    return _react.default.createElement("div", (0, _extends2.default)({
      className: className,
      ref: this.bindTable,
      style: newStyle
    }, events), _react.default.createElement(RenderTable, (0, _extends2.default)({}, props, {
      bordered: bordered
    })), loading && _react.default.createElement("div", {
      className: (0, _styles.tableClass)('loading')
    }, typeof loading === 'boolean' ? _react.default.createElement(_Spin.default, {
      size: 40
    }) : loading), isEmpty && _react.default.createElement("div", {
      className: (0, _styles.tableClass)((0, _classname.getDirectionClass)('empty')),
      style: {
        visibility: loading ? 'hidden' : 'visible'
      }
    }, _react.default.createElement("span", null, empty || (0, _locale.getLocale)('noData'))));
  };

  return Table;
}(_component.Component);

Table.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'type', 'keygen'), {
  size: _propTypes.default.oneOf(['small', 'default']),
  bordered: _propTypes.default.bool,
  children: _propTypes.default.any,
  columns: _propTypes.default.array,
  data: _propTypes.default.array,
  empty: _propTypes.default.any,
  fixed: _propTypes.default.oneOf(['x', 'y', 'both']),
  height: _propTypes.default.number,
  hover: _propTypes.default.bool,
  loading: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.bool]),
  rowsInView: _propTypes.default.number,
  striped: _propTypes.default.bool,
  verticalAlign: _propTypes.default.oneOf(['top', 'middle']),
  width: _propTypes.default.number,
  columnResizable: _propTypes.default.bool,
  bindWrapper: _propTypes.default.func
});
Table.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  hover: true,
  rowsInView: 20,
  verticalAlign: 'top',
  columns: []
});

var _default = (0, _func.compose)(RadioWrapper, _Datum.default.hoc({
  bindProps: ['disabled', 'format', 'prediction', 'limit', 'distinct'],
  ignoreUndefined: true,
  setValueType: null,
  pure: false
}), _fixedAuto.default, _hidable.consumer, _select.default)(Table);

exports.default = _default;