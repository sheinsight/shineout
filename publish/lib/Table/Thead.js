"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _Sorter = _interopRequireDefault(require("./Sorter"));

var _CheckboxAll = _interopRequireDefault(require("./CheckboxAll"));

var _element = require("../utils/dom/element");

var _is = require("../utils/is");

var cacheGroup = new Map();
var MIN_RESIZABLE_WIDTH = 20;

var Thead =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Thead, _PureComponent);

  function Thead(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleMouseDown = _this.handleResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'mousedown');
    _this.handleMouseMove = _this.handleResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'mousemove');
    _this.handleMouseUp = _this.handleResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'mouseup');
    return _this;
  }

  var _proto = Thead.prototype;

  _proto.setColumns = function setColumns(columns, col, level, index) {
    if (index === void 0) {
      index = 0;
    }

    if (!col.group) {
      columns.push(col);
      return 1;
    }

    if (level > this.columnLevel) this.columnLevel = level;
    var g = Array.isArray(col.group) ? col.group : [col.group];
    var last = columns[columns.length - 1];

    if (!g[level]) {
      columns.push(col);
      return 1;
    }

    var colSpan = 0;

    if (last && last.name === g[level]) {
      colSpan = this.setColumns(last.columns, col, level + 1, index);
      last.colSpan += colSpan;
      if (col.fixed) last.fixed = col.fixed;
      if (col.lastFixed) last.lastFixed = true;
    } else {
      var sub = [];
      colSpan = this.setColumns(sub, col, level + 1, index);
      var group = g[level];
      columns.push({
        name: g[level],
        key: typeof g[level] === 'string' ? index + "-" + g[level] : cacheGroup.get(group) || cacheGroup.set(group, (0, _uid.getUidStr)()).get(group),
        colSpan: colSpan,
        level: level,
        fixed: col.fixed,
        firstFixed: col.firstFixed,
        columns: sub
      });
    }

    return colSpan;
  };

  _proto.resizeColgroup = function resizeColgroup(deltaX) {
    var columns = this.props.columns;
    var item = columns[this.resizingIndex];
    var minWidth = item.minWidth,
        maxWidth = item.maxWidth;
    var oWidth = parseInt(this.resizingCol.style.width, 10);

    if (Number.isNaN(oWidth) || oWidth === 0) {
      oWidth = this.resizingTh.getBoundingClientRect().width;
    }

    var w = oWidth + deltaX;

    if ((0, _is.isNumber)(minWidth)) {
      w = Math.max(w, minWidth);
    } else {
      w = Math.max(w, MIN_RESIZABLE_WIDTH);
    }

    if ((0, _is.isNumber)(maxWidth)) {
      w = Math.min(w, maxWidth);
    }

    this.resizingCol.style.width = w + "px";
  };

  _proto.handleResize = function handleResize(type, e) {
    if (type === 'mousedown') {
      var target = e.target;
      this.resizingTh = (0, _element.getParent)(target, 'th');
      this.resizingTable = (0, _element.getParent)(target, 'table');
      var thList = (0, _element.getParent)(target, 'tr').children;
      var indexInTr = [].indexOf.call(thList, this.resizingTh);
      this.resizingIndex = [].slice.call(thList, 0, indexInTr).reduce(function (total, th) {
        var count = Number(th.getAttribute('colspan')) || 1;
        return total + count;
      }, 0);
      this.resizingCol = this.resizingTable.querySelectorAll('col')[this.resizingIndex];
      this.resizingTable.classList.add((0, _styles.tableClass)('resizing'));
      this.resizingTh.classList.add((0, _styles.tableClass)('resizing-item'));
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    } else if (type === 'mousemove') {
      var x = e.clientX;

      if (typeof this.lastX === 'number') {
        var deltaX = x - this.lastX;
        this.resizeColgroup(deltaX);
      }

      this.lastX = x;
    } else if (type === 'mouseup') {
      var _this$props = this.props,
          onColChange = _this$props.onColChange,
          colgroup = _this$props.colgroup;
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      this.resizingTable.classList.remove((0, _styles.tableClass)('resizing'));
      this.resizingTh.classList.remove((0, _styles.tableClass)('resizing-item'));
      this.lastX = undefined;
      if (onColChange) onColChange(this.resizingIndex, parseInt(this.resizingCol.style.width, 10), colgroup);
    }
  };

  _proto.createTh = function createTh(trs, col, level) {
    var _this2 = this;

    var columnResizable = this.props.columnResizable;
    var fixed = [];
    if (col.fixed) fixed.push("fixed-" + col.fixed);
    if (col.firstFixed) fixed.push('fixed-first');
    if (col.lastFixed) fixed.push('fixed-last');
    var _this$props2 = this.props,
        sorter = _this$props2.sorter,
        onSortChange = _this$props2.onSortChange,
        data = _this$props2.data,
        datum = _this$props2.datum,
        showSelectAll = _this$props2.showSelectAll,
        disabled = _this$props2.disabled,
        treeColumnsName = _this$props2.treeColumnsName,
        treeCheckAll = _this$props2.treeCheckAll;
    var isEmpty = !(data && data.length);
    var align = col.align && "align-" + col.align;
    var ignoreBorderRight = this.rightBorderRecord[col.key] && 'ignore-right-border';
    var resize = level === 0 && !isEmpty && columnResizable && col.columnResizable !== false ? _react.default.createElement("span", {
      onMouseDown: this.handleMouseDown,
      className: (0, _styles.tableClass)('resize-spanner')
    }) : null;

    if (col.title) {
      trs[level].push(_react.default.createElement("th", {
        className: (0, _classnames.default)(_styles.tableClass.apply(void 0, [level > 0 && 'condensed', align, ignoreBorderRight].concat(fixed)), col.className),
        rowSpan: this.columnLevel - level + 1,
        key: col.key
      }, _react.default.createElement("div", {
        className: (0, _styles.tableClass)(col.sorter && 'has-sorter')
      }, _react.default.createElement("span", null, typeof col.title === 'function' ? col.title(data) : col.title), col.sorter && _react.default.createElement(_Sorter.default, (0, _extends2.default)({}, col, {
        current: sorter,
        onChange: onSortChange,
        renderSorter: this.props.renderSorter
      })), resize)));
      return;
    }

    if (col.type === 'checkbox') {
      trs[level].push(_react.default.createElement("th", {
        key: "checkbox",
        rowSpan: trs.length,
        className: (0, _classnames.default)(_styles.tableClass.apply(void 0, ['checkbox'].concat(fixed)), col.className)
      }, showSelectAll && _react.default.createElement(_CheckboxAll.default, {
        disabled: disabled === true,
        data: data,
        datum: datum,
        treeColumnsName: treeCheckAll && treeColumnsName,
        col: col
      })));
      return;
    }

    var style = typeof col.name === 'string' ? undefined : {
      padding: 0
    };
    trs[level].push(_react.default.createElement("th", {
      className: (0, _classnames.default)(_styles.tableClass.apply(void 0, ['center', 'condensed', ignoreBorderRight].concat(fixed)), col.className),
      colSpan: col.colSpan,
      key: col.key,
      style: style
    }, col.name, resize));

    if (col.columns) {
      col.columns.forEach(function (c) {
        return _this2.createTh(trs, c, level + 1);
      });
    }
  };

  _proto.ignoreRightBorder = function ignoreRightBorder(column) {
    this.rightBorderRecord[column.key] = true;
    if (column.columns) this.ignoreRightBorder(column.columns[column.columns.length - 1]);
  };

  _proto.formatColumns = function formatColumns() {
    var _this3 = this;

    this.columnLevel = 0;
    var columns = [];
    this.props.columns.forEach(function (col, index) {
      _this3.setColumns(columns, col, 0, index);
    });
    this.rightBorderRecord = {};

    if (columns.length > 0 && this.props.bordered) {
      this.ignoreRightBorder(columns[columns.length - 1]);
    }

    return columns;
  };

  _proto.formatTrs = function formatTrs() {
    var _this4 = this;

    var columns = this.formatColumns();
    var trs = [];

    for (var i = 0; i <= this.columnLevel; i++) {
      trs.push([]);
    }

    columns.forEach(function (col) {
      return _this4.createTh(trs, col, 0);
    });
    return trs;
  };

  _proto.render = function render() {
    var trs = this.formatTrs();
    return _react.default.createElement("thead", null, trs.map(function (tr, i) {
      return _react.default.createElement("tr", {
        key: i
      }, tr);
    }));
  };

  return Thead;
}(_react.PureComponent);

Thead.propTypes = {
  columns: _propTypes.default.array.isRequired,
  data: _propTypes.default.array,
  datum: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  onSortChange: _propTypes.default.func,
  sorter: _propTypes.default.array,
  showSelectAll: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  onColChange: _propTypes.default.func,
  columnResizable: _propTypes.default.bool,
  treeColumnsName: _propTypes.default.string,
  treeCheckAll: _propTypes.default.bool,
  colgroup: _propTypes.default.array,
  renderSorter: _propTypes.default.func
};
Thead.defaultProps = {
  showSelectAll: true
};
var _default = Thead;
exports.default = _default;