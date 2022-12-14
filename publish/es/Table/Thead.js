import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getUidStr } from '../utils/uid';
import { tableClass } from './styles';
import Sorter from './Sorter';
import CheckboxAll from './CheckboxAll';
import { getParent } from '../utils/dom/element';
import { isNumber } from '../utils/is';
var cacheGroup = new Map();
var MIN_RESIZABLE_WIDTH = 20;

var Thead =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Thead, _PureComponent);

  function Thead(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleMouseDown = _this.handleResize.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'mousedown');
    _this.handleMouseMove = _this.handleResize.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'mousemove');
    _this.handleMouseUp = _this.handleResize.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'mouseup');
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
        key: typeof g[level] === 'string' ? index + "-" + g[level] : cacheGroup.get(group) || cacheGroup.set(group, getUidStr()).get(group),
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

    if (isNumber(minWidth)) {
      w = Math.max(w, minWidth);
    } else {
      w = Math.max(w, MIN_RESIZABLE_WIDTH);
    }

    if (isNumber(maxWidth)) {
      w = Math.min(w, maxWidth);
    }

    this.resizingCol.style.width = w + "px";
  };

  _proto.handleResize = function handleResize(type, e) {
    if (type === 'mousedown') {
      var target = e.target;
      this.resizingTh = getParent(target, 'th');
      this.resizingTable = getParent(target, 'table');
      var thList = getParent(target, 'tr').children;
      var indexInTr = [].indexOf.call(thList, this.resizingTh);
      this.resizingIndex = [].slice.call(thList, 0, indexInTr).reduce(function (total, th) {
        var count = Number(th.getAttribute('colspan')) || 1;
        return total + count;
      }, 0);
      this.resizingCol = this.resizingTable.querySelectorAll('col')[this.resizingIndex];
      this.resizingTable.classList.add(tableClass('resizing'));
      this.resizingTh.classList.add(tableClass('resizing-item'));
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
      this.resizingTable.classList.remove(tableClass('resizing'));
      this.resizingTh.classList.remove(tableClass('resizing-item'));
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
    var resize = level === 0 && !isEmpty && columnResizable && col.columnResizable !== false ? React.createElement("span", {
      onMouseDown: this.handleMouseDown,
      className: tableClass('resize-spanner')
    }) : null;

    if (col.title) {
      trs[level].push(React.createElement("th", {
        className: classnames(tableClass.apply(void 0, [level > 0 && 'condensed', align, ignoreBorderRight].concat(fixed)), col.className),
        rowSpan: this.columnLevel - level + 1,
        key: col.key
      }, React.createElement("div", {
        className: tableClass(col.sorter && 'has-sorter')
      }, React.createElement("span", null, typeof col.title === 'function' ? col.title(data) : col.title), col.sorter && React.createElement(Sorter, _extends({}, col, {
        current: sorter,
        onChange: onSortChange,
        renderSorter: this.props.renderSorter
      })), resize)));
      return;
    }

    if (col.type === 'checkbox') {
      trs[level].push(React.createElement("th", {
        key: "checkbox",
        rowSpan: trs.length,
        className: classnames(tableClass.apply(void 0, ['checkbox'].concat(fixed)), col.className)
      }, showSelectAll && React.createElement(CheckboxAll, {
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
    trs[level].push(React.createElement("th", {
      className: classnames(tableClass.apply(void 0, ['center', 'condensed', ignoreBorderRight].concat(fixed)), col.className),
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
    return React.createElement("thead", null, trs.map(function (tr, i) {
      return React.createElement("tr", {
        key: i
      }, tr);
    }));
  };

  return Thead;
}(PureComponent);

Thead.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onSortChange: PropTypes.func,
  sorter: PropTypes.array,
  showSelectAll: PropTypes.bool,
  bordered: PropTypes.bool,
  onColChange: PropTypes.func,
  columnResizable: PropTypes.bool,
  treeColumnsName: PropTypes.string,
  treeCheckAll: PropTypes.bool,
  colgroup: PropTypes.array,
  renderSorter: PropTypes.func
};
Thead.defaultProps = {
  showSelectAll: true
};
export default Thead;