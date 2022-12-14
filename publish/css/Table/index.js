"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _deepEql = _interopRequireDefault(require("deep-eql"));

var _pagable = _interopRequireDefault(require("../hoc/pagable"));

var _Table = _interopRequireDefault(require("./Table"));

var _func = require("../utils/func");

var _TreeExpand = _interopRequireDefault(require("./TreeExpand"));

var TableWithPagination = (0, _pagable.default)(_Table.default);
var TableWithTree = (0, _TreeExpand.default)(_Table.default);
var TableWithPT = (0, _func.compose)(_pagable.default, _TreeExpand.default)(_Table.default);

var _default =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(_default, _React$Component);

  function _default(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      sorter: []
    };
    _this.handleSortChange = _this.handleSortChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.cacheDefaultSorterList = [];
    return _this;
  }

  var _proto = _default.prototype;

  _proto.getTreeColumnsName = function getTreeColumnsName() {
    var columns = this.getFilteredColumn();
    if (!Array.isArray(columns)) return undefined;
    var has = columns.filter(function (v) {
      return typeof v.treeColumnsName === 'string';
    });
    if (has.length === 0) return undefined;
    return has[0].treeColumnsName;
  };

  _proto.getColumns = function getColumns(columns) {
    if ((0, _deepEql.default)(columns, this.oldColumns)) {
      return this.cachedColumns;
    }

    var _this$props = this.props,
        onRowSelect = _this$props.onRowSelect,
        datum = _this$props.datum;
    columns = columns.filter(function (c) {
      return typeof c === 'object';
    });
    var left = -1;
    var right = -1;
    columns.forEach(function (c, i) {
      if (c.fixed === 'left') left = i;
      if (c.fixed === 'right' && right < 0) right = i;
    });
    var setDefaultOrder = false;
    this.cachedColumns = columns.map(function (c, i) {
      return (0, _immer.default)(c, function (draft) {
        draft.index = i;
        if (draft.key === undefined) draft.key = i;
        if (i <= left) draft.fixed = 'left';
        if (i === left) draft.lastFixed = true;
        if (i >= right && right > 0) draft.fixed = 'right';
        if (i === right) draft.firstFixed = true;

        if (typeof draft.sorter !== 'object') {
          if (draft.defaultOrder && setDefaultOrder) delete draft.defaultOrder;
          if (draft.defaultOrder) setDefaultOrder = true;
        } // if (draft.type === 'expand' && !draft.width) draft.width = 48

      });
    });

    if (this.cachedColumns.find(function (v) {
      return typeof v.sorter !== 'object' && v.defaultOrder;
    })) {
      this.cachedColumns = this.cachedColumns.map(function (v) {
        return (0, _immer.default)(v, function (draft) {
          if (typeof draft.sorter === 'object' && draft.defaultOrder) delete draft.defaultOrder;
        });
      });
    } // filter checkbox


    var haveCheckbox = columns.find(function (v) {
      return v.type === 'checkbox';
    });

    if ((onRowSelect || datum) && this.cachedColumns[0] && this.cachedColumns[0].type !== 'checkbox' && !haveCheckbox) {
      this.cachedColumns.unshift({
        key: 'checkbox',
        type: 'checkbox',
        // width: 48,
        fixed: left >= 0 ? 'left' : undefined
      });
    }

    this.oldColumns = columns;
    return this.cachedColumns;
  };

  _proto.getTableSorter = function getTableSorter() {
    var tableSorter = this.props.sorter;

    if (!tableSorter) {
      console.error('You need to specify a sorter as a sort function for the table. Default alphabetical order.');

      tableSorter = function tableSorter(sorter, order) {
        return function (a, b) {
          var a1 = (a[sorter] || '').toString();
          var b1 = (b[sorter] || '').toString();
          return order === 'asc' ? a1.localeCompare(b1) : b1.localeCompare(a1);
        };
      };
    }

    return tableSorter;
  };

  _proto.getFilteredColumn = function getFilteredColumn() {
    var columns = this.props.columns;
    if (!columns) return columns;
    return columns.filter(function (v) {
      return !(['expand', 'row-expand'].indexOf(v.type) > -1 && v.hide);
    });
  };

  _proto.getExternalExpandObj = function getExternalExpandObj() {
    var columns = this.props.columns;
    if (!columns) return undefined;
    var obj = columns.find(function (v) {
      return ['expand', 'row-expand'].indexOf(v.type) > -1 && v.hide;
    });
    if (obj && typeof obj === 'object') return obj;
    return undefined;
  };

  _proto.handleSortChange = function handleSortChange(order, sorter, index, cancelOrder, manual) {
    var _this2 = this;

    var onSortCancel = this.props.onSortCancel; // cancel sorter

    if (!order) {
      this.setState((0, _immer.default)(function (state) {
        var item = state.sorter.find(function (v) {
          return v.index === index;
        });

        if (item) {
          item.order = undefined;
          item.manual = true;
          item.deleted = true;
        }
      }), function () {
        var rpm = _this2.state.sorter.filter(function (v) {
          return v.order && !v.deleted;
        }).map(function (v) {
          return {
            order: v.order,
            index: v.index,
            weight: v.weight,
            manual: v.manual
          };
        });

        if (typeof sorter === 'object' && typeof sorter.rule === 'function') {
          sorter.rule(rpm);
        }

        if (onSortCancel) onSortCancel(cancelOrder, index, rpm, sorter);
      });
      return;
    }

    if (typeof sorter === 'object') {
      this.setState((0, _immer.default)(function (state) {
        var rpm = state.sorter.map(function (v) {
          return {
            order: v.order,
            index: v.index,
            weight: v.weight,
            manual: v.manual
          };
        });
        var item = state.sorter.find(function (v) {
          return v.index === index;
        });

        if (state.sorter.length === 1 && !state.sorter[0].multiple) {
          state.sorter = [];
          rpm = [];
        }

        if (item) {
          item.order = order;
          item.manual = manual;
          item.deleted = false;
          var rpmItem = rpm.find(function (v) {
            return v.index === index;
          });
          rpmItem.order = order;
          rpmItem.manual = manual;
          rpm = rpm.filter(function (v) {
            return v.order && !v.deleted;
          });
          var sort = typeof sorter.rule === 'string' ? _this2.getTableSorter()(sorter.rule, order, rpm) : undefined;
          item.sort = sort;
        } else {
          if (manual) {
            _this2.cacheDefaultSorterList = [];
            rpm.push({
              order: order,
              index: index,
              weight: sorter.weight,
              manual: manual
            });
            rpm = rpm.filter(function (v) {
              return v.order && !v.deleted;
            });
          }

          if (!manual) {
            _this2.cacheDefaultSorterList.push({
              order: order,
              index: index,
              weight: sorter.weight,
              manual: manual
            });

            rpm = _this2.cacheDefaultSorterList;
          }

          var _sort = typeof sorter.rule === 'string' ? _this2.getTableSorter()(sorter.rule, order, rpm) : undefined;

          state.sorter.push({
            order: order,
            index: index,
            sort: _sort,
            manual: manual,
            multiple: true,
            weight: sorter.weight,
            deleted: false
          });
          state.sorter.sort(function (a, b) {
            var a1 = (a.weight || 0).toString();
            var b1 = (b.weight || 0).toString();
            return a1.localeCompare(b1);
          });
        }

        if (typeof sorter.rule === 'function') {
          rpm = rpm.filter(function (v) {
            return v.order && !v.deleted;
          });
          sorter.rule(rpm);
        }
      }));
    } else {
      var sort = typeof sorter === 'string' ? this.getTableSorter()(sorter, order, [{
        order: order,
        index: index
      }]) : sorter(order);
      this.setState((0, _immer.default)(function (state) {
        state.sorter = [];
        state.sorter.push({
          order: order,
          index: index,
          sort: sort,
          manual: manual,
          multiple: false,
          deleted: false
        });
      }));
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        onRowSelect = _this$props2.onRowSelect,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["onRowSelect"]);
    var columns = this.getFilteredColumn();
    var sorter = this.state.sorter;
    if (!columns) return _react.default.createElement(_Table.default, props);
    var data = this.props.data;

    if (!sorter.length) {
      sorter = (0, _immer.default)(sorter, function (draft) {
        draft.push({});
      });
    }

    sorter.filter(function (v) {
      return !v.deleted;
    }).forEach(function (v) {
      if (v.sort) data = (0, _immer.default)(data, function (draft) {
        return draft.sort(v.sort);
      });
    });
    var treeColumnsName = this.getTreeColumnsName();
    var Component = _Table.default;

    if (props.pagination && treeColumnsName) {
      Component = TableWithPT;
    } else if (props.pagination) {
      Component = TableWithPagination;
    } else if (treeColumnsName) {
      Component = TableWithTree;
    }

    var externalExpandRender = (this.getExternalExpandObj() || {}).render;
    var externalExpandOnClick = (this.getExternalExpandObj() || {}).onClick;
    return _react.default.createElement(Component, (0, _extends2.default)({}, props, {
      onChange: onRowSelect,
      columns: this.getColumns(columns),
      data: data,
      sorter: sorter,
      onSortChange: this.handleSortChange,
      treeColumnsName: treeColumnsName,
      externalExpandRender: externalExpandRender,
      externalExpandClick: externalExpandOnClick
    }));
  };

  return _default;
}(_react.default.Component);

exports.default = _default;
(0, _defineProperty2.default)(_default, "displayName", 'ShineoutTable');
(0, _defineProperty2.default)(_default, "propTypes", {
  columns: _propTypes.default.array,
  data: _propTypes.default.array,
  onRowSelect: _propTypes.default.func,
  datum: _propTypes.default.object,
  sorter: _propTypes.default.func,
  onSortCancel: _propTypes.default.func
});
(0, _defineProperty2.default)(_default, "defaultProps", {
  data: []
});