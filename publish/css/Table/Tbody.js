"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.RENDER_COL_GROUP_EVENT = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _shallowEqual = require("../utils/shallowEqual");

var _uid = require("../utils/uid");

var _Tr = _interopRequireDefault(require("./Tr"));

var _styles = require("./styles");

var RENDER_COL_GROUP_EVENT = 'RENDER_COL_GROUP_EVENT';
exports.RENDER_COL_GROUP_EVENT = RENDER_COL_GROUP_EVENT;

function ignoreBorderRight(rows) {
  rows.forEach(function (row) {
    var lastColumn = row[row.length - 1];

    if (lastColumn) {
      lastColumn.ignoreBorderRight = true;
    }
  });
}

function format(columns, data, nextRow, index, expandKeys) {
  var row = columns.map(function (col, i) {
    var cell = {
      index: index,
      data: data,
      expandKeys: expandKeys
    };
    cell.colSpan = typeof col.colSpan === 'function' ? col.colSpan(data, index) : 1;
    if (cell.colSpan < 1) cell.colSpan = 1;
    var rowSpan = col.rowSpan;

    if (rowSpan && nextRow && nextRow[i]) {
      if (col.type !== 'checkbox') {
        cell.content = typeof col.render === 'string' ? data[col.render] : col.render(data, index);
      }

      var isEqual = rowSpan === true ? cell.content === nextRow[i].content : typeof rowSpan === 'function' && rowSpan(data, nextRow[i].data);
      var nextTd = nextRow[i];

      if (isEqual && nextTd.colSpan === cell.colSpan) {
        cell.rowSpan = (nextTd.rowSpan || 1) + 1;
        var j = cell.colSpan || 1;

        while (j) {
          j -= 1;
          nextRow[i + j] = null;
        }
      }
    }

    return cell;
  });
  return row;
}

var Tbody =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Tbody, _PureComponent);

  function Tbody(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      expand: {}
    };
    _this.bodyRender = _this.bodyRender.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindBody = _this.bindBody.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderTr = _this.renderTr.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleExpand = _this.handleExpand.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.findExpandFunc = _this.findExpandFunc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Tbody.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.bodyRender();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var _this$props = this.props,
        onScrollTop = _this$props.onScrollTop,
        data = _this$props.data;
    if (onScrollTop && prevProps.data.length && data.length === 0) onScrollTop();

    if (this.props.resize || !this.colgroupSetted || !(0, _shallowEqual.compareColumns)(prevProps.columns, this.props.columns)) {
      setTimeout(function () {
        _this2.bodyRender();
      });
    }
  };

  _proto.bodyRender = function bodyRender() {
    var _this$props2 = this.props,
        onBodyRender = _this$props2.onBodyRender,
        datum = _this$props2.datum;
    if (!onBodyRender || !this.body) return;
    datum.unsubscribe(RENDER_COL_GROUP_EVENT, this.bodyRender);

    if (this.body.clientHeight === 0) {
      datum.subscribe(RENDER_COL_GROUP_EVENT, this.bodyRender);
      return;
    }

    var tr = this.body.querySelector('tr');
    if (!tr) return;
    this.colgroupSetted = true;
    onBodyRender(tr.querySelectorAll('td'));
  };

  _proto.bindBody = function bindBody(el) {
    this.body = el;
  };

  _proto.handleExpand = function handleExpand(key, render) {
    this.setState((0, _immer.default)(function (draft) {
      if (render) draft.expand[key] = render;else delete draft.expand[key];
    }));
  };

  _proto.findExpandFunc = function findExpandFunc(key, i) {
    var _this$props3 = this.props,
        columns = _this$props3.columns,
        expandKeys = _this$props3.expandKeys,
        data = _this$props3.data,
        externalExpandRender = _this$props3.externalExpandRender,
        index = _this$props3.index;
    var expandableObj = columns.find(function (c) {
      return c.type === 'expand' || c.type === 'row-expand';
    });
    var idx = i + index;

    if (expandKeys) {
      var expanded = expandKeys.find(function (k) {
        return k === key;
      });
      if (externalExpandRender) return expanded !== undefined ? externalExpandRender(data[i], idx) : undefined;
      var expandObj = expanded !== undefined ? expandableObj : {};
      return expandObj.render ? expandObj.render(data[i], idx) : undefined;
    }

    if (this.state.expand[key]) {
      if (externalExpandRender) return externalExpandRender(data[i], idx);
      return expandableObj.render ? expandableObj.render(data[i], idx) : undefined;
    }

    return undefined;
  };

  _proto.renderTr = function renderTr(row, i) {
    var _this$props4 = this.props,
        columns = _this$props4.columns,
        keygen = _this$props4.keygen,
        data = _this$props4.data,
        sorter = _this$props4.sorter,
        index = _this$props4.index,
        expandKeys = _this$props4.expandKeys,
        colgroup = _this$props4.colgroup,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["columns", "keygen", "data", "sorter", "index", "expandKeys", "colgroup"]);
    var key = (0, _uid.getKey)(data[i], keygen, index + i);

    if (this.keys[key]) {
      var converted = key + "-" + (index + i);
      console.warn("Tr has same key: (" + key + "). Already converted with (" + converted + "), Please check the 'keygen' property.");
      key = converted;
    }

    this.keys[key] = true;
    var originKey = key;

    if (sorter && sorter.order) {
      key = key + "-" + sorter.index + "-" + sorter.order;
    }

    return _react.default.createElement(_Tr.default, (0, _extends2.default)({}, other, {
      index: i + index,
      key: key,
      originKey: originKey,
      data: row,
      rowData: data[i],
      columns: columns,
      rowKey: key,
      onExpand: this.handleExpand,
      expandRender: this.findExpandFunc(originKey, i)
    }));
  };

  _proto.renderPlaceholderTr = function renderPlaceholderTr() {
    var _this$props5 = this.props,
        columns = _this$props5.columns,
        data = _this$props5.data;
    return _react.default.createElement("tr", {
      className: (0, _styles.tableClass)('placeholder-tr'),
      key: "so-placeholder-" + new Date().getTime()
    }, columns.map(function (v, i) {
      if (!v) return _react.default.createElement("td", {
        key: i
      });

      if (v.minWidth) {
        return _react.default.createElement("td", {
          key: i,
          style: {
            padding: 0,
            border: 'none'
          }
        }, _react.default.createElement("div", {
          style: {
            width: v.minWidth
          }
        }, v.title && typeof v.title === 'function' ? v.title(data) : v.title));
      }

      if (v.title) {
        return _react.default.createElement("td", {
          key: i
        }, _react.default.createElement("div", null, typeof v.title === 'function' ? v.title(data) : v.title));
      }

      if (v.type === 'checkbox' || v.type === 'expand' || v.type === 'row-expand') {
        return _react.default.createElement("td", {
          key: i,
          className: (0, _styles.tableClass)('placeholder-checkbox')
        });
      }

      return _react.default.createElement("td", {
        key: i
      });
    }));
  };

  _proto.renderTrs = function renderTrs(rows) {
    var _this$props6 = this.props,
        columns = _this$props6.columns,
        colgroup = _this$props6.colgroup;
    var minWidthSup = columns.find(function (d) {
      return d.minWidth;
    });
    var trs = rows.map(this.renderTr);
    if (!minWidthSup || colgroup) return trs;
    return [this.renderPlaceholderTr()].concat(trs);
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        index = _this$props7.index,
        data = _this$props7.data,
        columns = _this$props7.columns,
        expandKeys = _this$props7.expandKeys,
        bordered = _this$props7.bordered;
    var rows = [];

    for (var i = data.length - 1; i >= 0; i--) {
      var d = data[i];
      rows.unshift(format(columns, d, rows[0], index + i, expandKeys).map(function (col) {
        delete col.content;
        return col;
      }));
    }

    if (rows.length > 0 && bordered) {
      ignoreBorderRight(rows);
    }

    this.keys = {};
    return _react.default.createElement("tbody", {
      ref: this.bindBody
    }, this.renderTrs(rows));
  };

  return Tbody;
}(_component.PureComponent);

Tbody.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'keygen'), {
  columns: _propTypes.default.array.isRequired,
  data: _propTypes.default.array.isRequired,
  index: _propTypes.default.number.isRequired,
  offsetLeft: _propTypes.default.number,
  offsetRight: _propTypes.default.number,
  onBodyRender: _propTypes.default.func,
  values: _propTypes.default.object,
  bordered: _propTypes.default.bool,
  externalExpandRender: _propTypes.default.func
});
Tbody.defaultProps = {
  onBodyRender: undefined
};
var _default = Tbody;
exports.default = _default;