import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tableClass } from './styles';
import Checkbox from './Checkbox';
export var CLASS_FIXED_LEFT = 'fixed-left';
export var CLASS_FIXED_RIGHT = 'fixed-right';

var Td =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Td, _PureComponent);

  function Td(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleExpandClick = _this.handleExpandClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleTreeExpand = _this.handleTreeExpand.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    var checkbox = React.createElement(Checkbox, {
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
    return React.createElement("span", {
      className: tableClass('expand-indicator', "icon-expand-" + (expanded ? 'sub' : 'plus')),
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
    var className = tableClass('expand-wrapped');

    if (!treeColumnsName || !data[treeColumnsName] || data[treeColumnsName].length === 0 && !treeEmptyExpand) {
      return React.createElement("span", {
        className: className,
        style: {
          marginLeft: level * treeIndent,
          paddingLeft: treeRoot ? 0 : 25
        }
      }, content);
    }

    return React.createElement("span", {
      className: className,
      style: {
        marginLeft: level * treeIndent
      }
    }, React.createElement("span", {
      key: "expand-icon",
      onClick: this.handleTreeExpand,
      className: tableClass('icon-tree-expand', "icon-tree-" + (treeExpand ? 'sub' : 'plus'))
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
    var className = classnames(this.props.className, tableClass(fixed === 'left' && CLASS_FIXED_LEFT, fixed === 'right' && CLASS_FIXED_RIGHT, firstFixed && 'fixed-first', lastFixed && 'fixed-last', (type === 'checkbox' || type === 'expand' || type === 'row-expand') && 'checkbox', align !== 'left' && "align-" + align, ignoreBorderRight && 'ignore-right-border'));
    return React.createElement("td", {
      style: style,
      className: className,
      rowSpan: rowSpan,
      colSpan: colSpan
    }, this.renderContent());
  };

  return Td;
}(PureComponent);

Td.propTypes = {
  data: PropTypes.object,
  colSpan: PropTypes.number,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  firstFixed: PropTypes.bool,
  fixed: PropTypes.string,
  index: PropTypes.number,
  lastFixed: PropTypes.bool,
  onExpand: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  originKey: PropTypes.any,
  rowSpan: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  expandKeys: PropTypes.array,
  expandClick: PropTypes.func,
  datum: PropTypes.object,
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  ignoreBorderRight: PropTypes.bool,
  treeColumnsName: PropTypes.string,
  onTreeExpand: PropTypes.func,
  treeExpand: PropTypes.bool,
  treeExpandShow: PropTypes.bool,
  treeExpandLevel: PropTypes.object,
  treeIndent: PropTypes.number,
  treeRoot: PropTypes.bool,
  treeEmptyExpand: PropTypes.bool,
  treeCheckAll: PropTypes.bool,
  resetFixAuto: PropTypes.func,
  disabled: PropTypes.func
};
Td.defaultProps = {
  fixed: '',
  style: {},
  align: 'left'
};
export default Td;