"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.CLASS_FIXED_RIGHT = exports.CLASS_FIXED_LEFT = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var CLASS_FIXED_LEFT = 'fixed-left';
exports.CLASS_FIXED_LEFT = CLASS_FIXED_LEFT;
var CLASS_FIXED_RIGHT = 'fixed-right';
exports.CLASS_FIXED_RIGHT = CLASS_FIXED_RIGHT;

var Td =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Td, _PureComponent);

  function Td(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleExpandClick = _this.handleExpandClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTreeExpand = _this.handleTreeExpand.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Td.prototype;

  _proto.handleExpandClick = function handleExpandClick() {
    var _this$props = this.props,
        originKey = _this$props.originKey,
        expanded = _this$props.expanded,
        data = _this$props.data,
        expandKeys = _this$props.expandKeys,
        expandClick = _this$props.expandClick,
        resetFixAuto = _this$props.resetFixAuto;

    if (expandKeys) {
      if (expandClick) expandClick(data, !expanded);
    } else {
      this.props.onExpand(originKey, expanded ? undefined : this.cachedRender);
    }

    resetFixAuto(true);
  };

  _proto.handleTreeExpand = function handleTreeExpand() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        onTreeExpand = _this$props2.onTreeExpand,
        index = _this$props2.index;
    onTreeExpand(data, index);
  };

  _proto.renderCheckbox = function renderCheckbox() {
    var _this$props3 = this.props,
        index = _this$props3.index,
        data = _this$props3.data,
        datum = _this$props3.datum,
        treeColumnsName = _this$props3.treeColumnsName,
        treeCheckAll = _this$props3.treeCheckAll,
        disabled = _this$props3.disabled,
        render = _this$props3.render;

    var checkbox = _react.default.createElement(_Checkbox.default, {
      force: datum.check(data),
      data: data,
      index: index,
      datum: datum,
      disabled: disabled,
      treeColumnsName: treeCheckAll && treeColumnsName
    });

    if (render && typeof render === 'function') {
      return render(data, index, checkbox);
    }

    return checkbox;
  };

  _proto.renderExpand = function renderExpand(index) {
    var _this$props4 = this.props,
        expanded = _this$props4.expanded,
        render = _this$props4.render,
        data = _this$props4.data;
    if (typeof render !== 'function') return null;

    var _cachedRender = render(data, index);

    if (!_cachedRender) return null;

    if (typeof _cachedRender !== 'function') {
      _cachedRender = function cachedRender() {
        return _cachedRender;
      };
    }

    this.cachedRender = _cachedRender;
    return _react.default.createElement("span", {
      className: (0, _styles.tableClass)('expand-indicator', "icon-expand-" + (expanded ? 'sub' : 'plus')),
      onClick: this.handleExpandClick
    });
  };

  _proto.renderTreeExpand = function renderTreeExpand(content) {
    var _this$props5 = this.props,
        data = _this$props5.data,
        treeRoot = _this$props5.treeRoot,
        treeColumnsName = _this$props5.treeColumnsName,
        treeExpand = _this$props5.treeExpand,
        originKey = _this$props5.originKey,
        treeExpandLevel = _this$props5.treeExpandLevel,
        treeIndent = _this$props5.treeIndent,
        treeEmptyExpand = _this$props5.treeEmptyExpand;
    var level = treeExpandLevel.get(originKey) || 0;
    var className = (0, _styles.tableClass)('expand-wrapped');

    if (!treeColumnsName || !data[treeColumnsName] || data[treeColumnsName].length === 0 && !treeEmptyExpand) {
      return _react.default.createElement("span", {
        className: className,
        style: {
          marginLeft: level * treeIndent,
          paddingLeft: treeRoot ? 0 : 25
        }
      }, content);
    }

    return _react.default.createElement("span", {
      className: className,
      style: {
        marginLeft: level * treeIndent
      }
    }, _react.default.createElement("span", {
      key: "expand-icon",
      onClick: this.handleTreeExpand,
      className: (0, _styles.tableClass)('icon-tree-expand', "icon-tree-" + (treeExpand ? 'sub' : 'plus'))
    }), content);
  };

  _proto.renderResult = function renderResult() {
    var _this$props6 = this.props,
        render = _this$props6.render,
        data = _this$props6.data,
        index = _this$props6.index,
        treeColumnsName = _this$props6.treeColumnsName,
        treeExpandShow = _this$props6.treeExpandShow;
    var content = typeof render === 'function' ? render(data, index) : data[render];
    if (!treeColumnsName || !treeExpandShow) return content;
    return this.renderTreeExpand(content);
  };

  _proto.renderContent = function renderContent() {
    var _this$props7 = this.props,
        type = _this$props7.type,
        index = _this$props7.index;

    switch (type) {
      case 'checkbox':
        return this.renderCheckbox();

      case 'expand':
      case 'row-expand':
        return this.renderExpand(index);

      default:
        return this.renderResult();
    }
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        rowSpan = _this$props8.rowSpan,
        colSpan = _this$props8.colSpan,
        fixed = _this$props8.fixed,
        style = _this$props8.style,
        firstFixed = _this$props8.firstFixed,
        lastFixed = _this$props8.lastFixed,
        type = _this$props8.type,
        align = _this$props8.align,
        ignoreBorderRight = _this$props8.ignoreBorderRight;
    var className = (0, _classnames.default)(this.props.className, (0, _styles.tableClass)(fixed === 'left' && CLASS_FIXED_LEFT, fixed === 'right' && CLASS_FIXED_RIGHT, firstFixed && 'fixed-first', lastFixed && 'fixed-last', (type === 'checkbox' || type === 'expand' || type === 'row-expand') && 'checkbox', align !== 'left' && "align-" + align, ignoreBorderRight && 'ignore-right-border'));
    return _react.default.createElement("td", {
      style: style,
      className: className,
      rowSpan: rowSpan,
      colSpan: colSpan
    }, this.renderContent());
  };

  return Td;
}(_react.PureComponent);

Td.propTypes = {
  data: _propTypes.default.object,
  colSpan: _propTypes.default.number,
  className: _propTypes.default.string,
  expanded: _propTypes.default.bool,
  firstFixed: _propTypes.default.bool,
  fixed: _propTypes.default.string,
  index: _propTypes.default.number,
  lastFixed: _propTypes.default.bool,
  onExpand: _propTypes.default.func,
  align: _propTypes.default.oneOf(['left', 'center', 'right']),
  originKey: _propTypes.default.any,
  rowSpan: _propTypes.default.number,
  style: _propTypes.default.object,
  type: _propTypes.default.string,
  expandKeys: _propTypes.default.array,
  expandClick: _propTypes.default.func,
  datum: _propTypes.default.object,
  render: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  ignoreBorderRight: _propTypes.default.bool,
  treeColumnsName: _propTypes.default.string,
  onTreeExpand: _propTypes.default.func,
  treeExpand: _propTypes.default.bool,
  treeExpandShow: _propTypes.default.bool,
  treeExpandLevel: _propTypes.default.object,
  treeIndent: _propTypes.default.number,
  treeRoot: _propTypes.default.bool,
  treeEmptyExpand: _propTypes.default.bool,
  treeCheckAll: _propTypes.default.bool,
  resetFixAuto: _propTypes.default.func,
  disabled: _propTypes.default.func
};
Td.defaultProps = {
  fixed: '',
  style: {},
  align: 'left'
};
var _default = Td;
exports.default = _default;