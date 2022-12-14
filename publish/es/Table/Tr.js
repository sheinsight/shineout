import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { setTranslate } from '../utils/dom/translate';
import { tableClass } from './styles';
import { inputClass } from '../Input/styles';
import { checkinputClass } from '../Checkbox/styles';
import Td, { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td';
import Expand from './Expand';
export var ROW_HEIGHT_UPDATE_EVENT = 'ROW_HEIGHT_UPDATE_EVENT_NAME';
var preventClasses = [inputClass('_'), checkinputClass('_'), tableClass('icon-tree-plus'), tableClass('icon-tree-sub')];

var isExpandableElement = function isExpandableElement(el) {
  var tagName = el.tagName;
  if (tagName === 'TD' || tagName === 'TR') return true;
  if (tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT') return false;
  if (preventClasses.find(function (c) {
    return el.classList.contains(c);
  })) return false;
  if (!el.parentElement) return false;
  return isExpandableElement(el.parentElement);
};

var Tr =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tr, _Component);

  function Tr(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.manualExpand = false;
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRowClick = _this.handleRowClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setRowHeight = _this.setRowHeight.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setExpandHeight = _this.setExpandHeight.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.expandHeight = 0;
    return _this;
  }

  var _proto = Tr.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        offsetLeft = _this$props.offsetLeft,
        offsetRight = _this$props.offsetRight;

    if (offsetLeft) {
      ;
      [].forEach.call(this.element.querySelectorAll("." + tableClass(CLASS_FIXED_LEFT)), function (td) {
        setTranslate(td, offsetLeft + "px", '0');
      });
    }

    if (offsetRight) {
      ;
      [].forEach.call(this.element.querySelectorAll("." + tableClass(CLASS_FIXED_RIGHT)), function (td) {
        setTranslate(td, "-" + offsetRight + "px", '0');
      });
    }

    this.manualExpand = true;
    this.setRowHeight();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var _this$props2 = this.props,
        hasNotRenderRows = _this$props2.hasNotRenderRows,
        dataUpdated = _this$props2.dataUpdated,
        columnResizable = _this$props2.columnResizable,
        resize = _this$props2.resize;

    if (hasNotRenderRows || dataUpdated || prevProps.resize !== resize) {
      var exec = columnResizable ? setTimeout : function (func) {
        return func();
      };
      exec(function () {
        _this2.setRowHeight();
      });
    }
  };

  _proto.setRowHeight = function setRowHeight(expand) {
    var _this$props3 = this.props,
        setRowHeight = _this$props3.setRowHeight,
        dataUpdated = _this$props3.dataUpdated,
        datum = _this$props3.datum,
        lazy = _this$props3.lazy;
    if (!lazy || !setRowHeight || !this.element) return;

    var _this$element$getBoun = this.element.getBoundingClientRect(),
        height = _this$element$getBoun.height;

    if (Number.isNaN(height)) height = this.lastRowHeight || 0;
    datum.unsubscribe(ROW_HEIGHT_UPDATE_EVENT, this.setRowHeight);

    if (height === 0) {
      datum.subscribe(ROW_HEIGHT_UPDATE_EVENT, this.setRowHeight);
      return;
    }

    if (height === this.lastRowHeight && this.expandHeight === this.lastExpandHeight && !dataUpdated && this.lastIndex === this.props.index) return;
    this.lastRowHeight = height;
    this.lastIndex = this.props.index;
    this.lastExpandHeight = this.expandHeight;
    setRowHeight(height + this.expandHeight, this.props.index, expand);
  };

  _proto.setExpandHeight = function setExpandHeight(height) {
    this.expandHeight = height;
    this.setRowHeight(this.manualExpand);
  };

  _proto.getRowClickAttr = function getRowClickAttr() {
    var rowClickAttr = this.props.rowClickAttr;
    var res = Array.isArray(rowClickAttr) ? rowClickAttr : [];

    if (typeof rowClickAttr === 'string') {
      res.push(rowClickAttr);
    }

    return res.map(function (v) {
      return v === '*' ? '' : v;
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.isFireElement = function isFireElement(el) {
    var rowClickAttr = this.props.rowClickAttr;
    if (rowClickAttr === true) return true;
    return this.getRowClickAttr().find(function (v) {
      return el.hasAttribute(v);
    });
  };

  _proto.handleRowClick = function handleRowClick(e) {
    var _this$props4 = this.props,
        columns = _this$props4.columns,
        rowData = _this$props4.rowData,
        index = _this$props4.index,
        onRowClick = _this$props4.onRowClick,
        externalExpandRender = _this$props4.externalExpandRender,
        externalExpandClick = _this$props4.externalExpandClick,
        expandKeys = _this$props4.expandKeys,
        onExpand = _this$props4.onExpand,
        originKey = _this$props4.originKey,
        expandRender = _this$props4.expandRender; // business needed #row click to modal drawer

    var fireAttr = this.isFireElement(e.target);

    if (fireAttr) {
      onRowClick(rowData, index, fireAttr);
      return;
    }

    if (externalExpandRender) {
      var expanded = typeof expandRender === 'function';

      if (expandKeys) {
        if (externalExpandClick) externalExpandClick(rowData, !expanded);
      } else {
        onExpand(originKey, expanded ? undefined : externalExpandRender(rowData, index));
      }
    }

    if (isExpandableElement(e.target)) {
      var el = this.element.querySelector("." + tableClass('expand-indicator'));
      if (el && el !== e.target && columns.some(function (c) {
        return c.type === 'row-expand';
      })) el.click();
      var matchBlank = this.getRowClickAttr().indexOf('') >= 0;
      if (onRowClick && e.target !== el && matchBlank) onRowClick(rowData, index);
    }
  };

  _proto.renderExpand = function renderExpand() {
    var _this$props5 = this.props,
        expandRender = _this$props5.expandRender,
        rowData = _this$props5.rowData;

    if (this.lastExpandRender !== expandRender) {
      this.lastExpandRender = expandRender;
      this.cachedExpand = expandRender(rowData);
    }

    return this.cachedExpand;
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        columns = _this$props6.columns,
        data = _this$props6.data,
        rowData = _this$props6.rowData,
        striped = _this$props6.striped,
        index = _this$props6.index,
        expandRender = _this$props6.expandRender,
        offsetLeft = _this$props6.offsetLeft,
        offsetRight = _this$props6.offsetRight,
        hasNotRenderRows = _this$props6.hasNotRenderRows,
        rowClassName = _this$props6.rowClassName,
        treeExpandKeys = _this$props6.treeExpandKeys,
        rowEvents = _this$props6.rowEvents,
        reset = _objectWithoutPropertiesLoose(_this$props6, ["columns", "data", "rowData", "striped", "index", "expandRender", "offsetLeft", "offsetRight", "hasNotRenderRows", "rowClassName", "treeExpandKeys", "rowEvents"]);

    var other = Object.keys(reset).filter(function (key) {
      return !['format', 'prediction', 'onChange'].includes(key);
    }).reduce(function (r, key) {
      var _objectSpread2;

      return _objectSpread({}, r, (_objectSpread2 = {}, _objectSpread2[key] = reset[key], _objectSpread2));
    }, {});
    var tds = [];
    var skip = 0;

    for (var i = 0, c = columns.length; i < c; i++) {
      if (skip > 0) {
        skip -= 1;
      } else if (data[i]) {
        var _columns$i = columns[i],
            _className = _columns$i.className,
            style = _columns$i.style,
            key = _columns$i.key,
            fixed = _columns$i.fixed,
            lastFixed = _columns$i.lastFixed,
            firstFixed = _columns$i.firstFixed,
            type = _columns$i.type,
            render = _columns$i.render,
            onClick = _columns$i.onClick,
            align = _columns$i.align,
            treeColumnsName = _columns$i.treeColumnsName;
        var treeExpand = false;

        if (treeExpandKeys instanceof Map) {
          treeExpand = treeExpandKeys.has(other.originKey);
        }

        var td = React.createElement(Td, _extends({}, other, {
          expanded: typeof expandRender === 'function',
          key: key,
          treeExpand: treeExpand,
          treeExpandShow: !!treeColumnsName,
          type: type,
          expandClick: onClick,
          className: _className,
          style: style,
          fixed: fixed,
          firstFixed: firstFixed,
          lastFixed: lastFixed,
          align: align,
          render: render,
          index: index
        }, data[i]));
        tds.push(td);
        if (data[i].colSpan) skip = data[i].colSpan - 1;
      }
    }

    var className = tableClass('normal', striped && (index % 2 === 1 ? 'even' : 'odd'));

    if (rowClassName) {
      className = classnames(className, rowClassName(rowData, index));
    }

    var mc = classnames(className, other.datum.check(rowData) && tableClass('selected'));
    var result = [React.createElement("tr", _extends({
      key: "0"
    }, rowEvents, {
      onClick: this.handleRowClick,
      className: mc,
      ref: this.bindElement
    }), tds)];

    if (expandRender) {
      result.push(React.createElement(Expand, {
        key: "1",
        setExpandHeight: this.setExpandHeight,
        colSpan: columns.length
      }, this.renderExpand()));
    }

    return result;
  };

  return Tr;
}(Component);

Tr.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  datum: PropTypes.object,
  expandRender: PropTypes.func,
  hasNotRenderRows: PropTypes.bool,
  index: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  onExpand: PropTypes.func,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.func,
  rowData: PropTypes.object,
  striped: PropTypes.bool,
  setRowHeight: PropTypes.func,
  rowClickAttr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  dataUpdated: PropTypes.bool,
  treeExpandKeys: PropTypes.object,
  columnResizable: PropTypes.bool,
  resize: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  rowEvents: PropTypes.object,
  lazy: PropTypes.bool,
  externalExpandRender: PropTypes.func,
  externalExpandClick: PropTypes.func,
  expandKeys: PropTypes.array,
  originKey: PropTypes.any
};
Tr.defaultProps = {
  rowClickAttr: ['*'],
  lazy: true
};
Tr.displayName = 'ShineoutTr';
export default Tr;