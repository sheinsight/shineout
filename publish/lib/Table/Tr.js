"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.ROW_HEIGHT_UPDATE_EVENT = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _translate = require("../utils/dom/translate");

var _styles = require("./styles");

var _styles2 = require("../Input/styles");

var _styles3 = require("../Checkbox/styles");

var _Td = _interopRequireWildcard(require("./Td"));

var _Expand = _interopRequireDefault(require("./Expand"));

var ROW_HEIGHT_UPDATE_EVENT = 'ROW_HEIGHT_UPDATE_EVENT_NAME';
exports.ROW_HEIGHT_UPDATE_EVENT = ROW_HEIGHT_UPDATE_EVENT;
var preventClasses = [(0, _styles2.inputClass)('_'), (0, _styles3.checkinputClass)('_'), (0, _styles.tableClass)('icon-tree-plus'), (0, _styles.tableClass)('icon-tree-sub')];

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
  (0, _inheritsLoose2.default)(Tr, _Component);

  function Tr(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.manualExpand = false;
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRowClick = _this.handleRowClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setRowHeight = _this.setRowHeight.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setExpandHeight = _this.setExpandHeight.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
      [].forEach.call(this.element.querySelectorAll("." + (0, _styles.tableClass)(_Td.CLASS_FIXED_LEFT)), function (td) {
        (0, _translate.setTranslate)(td, offsetLeft + "px", '0');
      });
    }

    if (offsetRight) {
      ;
      [].forEach.call(this.element.querySelectorAll("." + (0, _styles.tableClass)(_Td.CLASS_FIXED_RIGHT)), function (td) {
        (0, _translate.setTranslate)(td, "-" + offsetRight + "px", '0');
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
      var el = this.element.querySelector("." + (0, _styles.tableClass)('expand-indicator'));
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
        reset = (0, _objectWithoutPropertiesLoose2.default)(_this$props6, ["columns", "data", "rowData", "striped", "index", "expandRender", "offsetLeft", "offsetRight", "hasNotRenderRows", "rowClassName", "treeExpandKeys", "rowEvents"]);
    var other = Object.keys(reset).filter(function (key) {
      return !['format', 'prediction', 'onChange'].includes(key);
    }).reduce(function (r, key) {
      var _objectSpread2;

      return (0, _objectSpread3.default)({}, r, (_objectSpread2 = {}, _objectSpread2[key] = reset[key], _objectSpread2));
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

        var td = _react.default.createElement(_Td.default, (0, _extends2.default)({}, other, {
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

    var className = (0, _styles.tableClass)('normal', striped && (index % 2 === 1 ? 'even' : 'odd'));

    if (rowClassName) {
      className = (0, _classnames.default)(className, rowClassName(rowData, index));
    }

    var mc = (0, _classnames.default)(className, other.datum.check(rowData) && (0, _styles.tableClass)('selected'));
    var result = [_react.default.createElement("tr", (0, _extends2.default)({
      key: "0"
    }, rowEvents, {
      onClick: this.handleRowClick,
      className: mc,
      ref: this.bindElement
    }), tds)];

    if (expandRender) {
      result.push(_react.default.createElement(_Expand.default, {
        key: "1",
        setExpandHeight: this.setExpandHeight,
        colSpan: columns.length
      }, this.renderExpand()));
    }

    return result;
  };

  return Tr;
}(_react.Component);

Tr.propTypes = {
  columns: _propTypes.default.array.isRequired,
  data: _propTypes.default.array.isRequired,
  datum: _propTypes.default.object,
  expandRender: _propTypes.default.func,
  hasNotRenderRows: _propTypes.default.bool,
  index: _propTypes.default.number,
  offsetLeft: _propTypes.default.number,
  offsetRight: _propTypes.default.number,
  onExpand: _propTypes.default.func,
  onRowClick: _propTypes.default.func,
  rowClassName: _propTypes.default.func,
  rowData: _propTypes.default.object,
  striped: _propTypes.default.bool,
  setRowHeight: _propTypes.default.func,
  rowClickAttr: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  dataUpdated: _propTypes.default.bool,
  treeExpandKeys: _propTypes.default.object,
  columnResizable: _propTypes.default.bool,
  resize: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  rowEvents: _propTypes.default.object,
  lazy: _propTypes.default.bool,
  externalExpandRender: _propTypes.default.func,
  externalExpandClick: _propTypes.default.func,
  expandKeys: _propTypes.default.array,
  originKey: _propTypes.default.any
};
Tr.defaultProps = {
  rowClickAttr: ['*'],
  lazy: true
};
Tr.displayName = 'ShineoutTr';
var _default = Tr;
exports.default = _default;