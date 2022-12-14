import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isRTL } from '../config';
import { Component } from '../component';
import { getLocale } from '../locale';
import { compose } from '../utils/func';
import { getDirectionClass } from '../utils/classname';
import { getProps, defaultProps } from '../utils/proptypes';
import { tableClass } from './styles';
import fixedAuto from './fixedAuto';
import Datum from '../Datum';
import Spin from '../Spin';
import resizableHOC from './resizable';
import { consumer as hideableConsumer } from '../hoc/hidable';
import SeperateTable from './SeperateTable';
import SimpleTable from './SimpleTable';
import { ROW_HEIGHT_UPDATE_EVENT } from './Tr';
import { RENDER_COL_GROUP_EVENT } from './Tbody';
import select from './select';
var ResizeSeperateTable = resizableHOC(SeperateTable);
var ResizeSimpleTable = resizableHOC(SimpleTable);

var RadioWrapper = function RadioWrapper(Origin) {
  return function (props) {
    return (// eslint-disable-next-line react/prop-types
      React.createElement(Origin, _extends({}, props, {
        distinct: true,
        limit: props.radio ? 1 : 0
      }))
    );
  };
};

var Table =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Table, _Component);

  function Table(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      scrollLeft: 0,
      scrollRight: 0
    };
    _this.bindTable = _this.bindTable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Table.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(preProps) {
    var _this$props = this.props,
        datum = _this$props.datum,
        treeCheckAll = _this$props.treeCheckAll;
    datum.dispatch(ROW_HEIGHT_UPDATE_EVENT);
    datum.dispatch(RENDER_COL_GROUP_EVENT);

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
        others = _objectWithoutPropertiesLoose(_this$props3, ["striped", "bordered", "size", "hover", "height", "columns", "children", "empty", "data", "style", "fixed", "width", "loading", "verticalAlign", "columnResizable", "events"]);

    var _this$state = this.state,
        scrollLeft = _this$state.scrollLeft,
        scrollRight = _this$state.scrollRight;
    var className = classnames(tableClass('_', size, hover && 'hover', bordered && 'bordered', fixed && 'fixed', scrollLeft > 0 && 'left-float', scrollRight < 0 && 'right-float', "vertical-" + verticalAlign, columnResizable && 'resize', others.sticky && 'sticky', isRTL() && 'rtl'), this.props.className);

    var props = _objectSpread({}, others, {
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
    var ResizeSepTable = columnResizable ? ResizeSeperateTable : SeperateTable;
    var ResizeSimTable = columnResizable ? ResizeSimpleTable : SimpleTable;
    var RenderTable = useSeparate ? ResizeSepTable : ResizeSimTable;
    var newStyle = Object.assign({}, style);
    if (height) newStyle.height = height;
    if (useSeparate && !newStyle.height) newStyle.height = '100%';
    if (loading) newStyle.overflow = 'hidden';
    return React.createElement("div", _extends({
      className: className,
      ref: this.bindTable,
      style: newStyle
    }, events), React.createElement(RenderTable, _extends({}, props, {
      bordered: bordered
    })), loading && React.createElement("div", {
      className: tableClass('loading')
    }, typeof loading === 'boolean' ? React.createElement(Spin, {
      size: 40
    }) : loading), isEmpty && React.createElement("div", {
      className: tableClass(getDirectionClass('empty')),
      style: {
        visibility: loading ? 'hidden' : 'visible'
      }
    }, React.createElement("span", null, empty || getLocale('noData'))));
  };

  return Table;
}(Component);

Table.propTypes = _objectSpread({}, getProps(PropTypes, 'type', 'keygen'), {
  size: PropTypes.oneOf(['small', 'default']),
  bordered: PropTypes.bool,
  children: PropTypes.any,
  columns: PropTypes.array,
  data: PropTypes.array,
  empty: PropTypes.any,
  fixed: PropTypes.oneOf(['x', 'y', 'both']),
  height: PropTypes.number,
  hover: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  rowsInView: PropTypes.number,
  striped: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['top', 'middle']),
  width: PropTypes.number,
  columnResizable: PropTypes.bool,
  bindWrapper: PropTypes.func
});
Table.defaultProps = _objectSpread({}, defaultProps, {
  hover: true,
  rowsInView: 20,
  verticalAlign: 'top',
  columns: []
});
export default compose(RadioWrapper, Datum.hoc({
  bindProps: ['disabled', 'format', 'prediction', 'limit', 'distinct'],
  ignoreUndefined: true,
  setValueType: null,
  pure: false
}), fixedAuto, hideableConsumer, select)(Table);