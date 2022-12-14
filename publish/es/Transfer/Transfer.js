import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Btns from './btns';
import { PureComponent } from '../component';
import Card from './Card';
import { transferClass } from './styles';
import Context from './context';
import splitSelecteds from './select';
import { isRTL } from '../config';
import getDataset from '../utils/dom/getDataset';

var Transfer =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Transfer, _PureComponent);

  function Transfer(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      selecteds: props.selectedKeys ? splitSelecteds(props.selectedKeys, props) : splitSelecteds(props.defaultSelectedKeys, props) || [[], []]
    };
    _this.getSelected = _this.getSelected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setSelecteds = _this.setSelecteds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getLoading = _this.getLoading.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Transfer.prototype;

  _proto.getLoading = function getLoading(index) {
    var loading = this.props.loading;
    if (Array.isArray(loading)) return loading[index];
    return loading;
  };

  _proto.getSelected = function getSelected() {
    if ('selectedKeys' in this.props) return splitSelecteds(this.props.selectedKeys, this.props);
    return this.state.selecteds;
  };

  _proto.setSelecteds = function setSelecteds(index, value) {
    var onSelectChange = this.props.onSelectChange;
    var selecteds = this.state.selecteds;
    var newSelecteds = index ? [selecteds[0], value] : [value, selecteds[1]];
    if (onSelectChange) onSelectChange(newSelecteds[0], newSelecteds[1]);
    this.setState({
      selecteds: newSelecteds
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        titles = _this$props.titles,
        data = _this$props.data,
        datum = _this$props.datum,
        keygen = _this$props.keygen,
        renderItem = _this$props.renderItem,
        footers = _this$props.footers,
        operations = _this$props.operations,
        operationIcon = _this$props.operationIcon,
        className = _this$props.className,
        style = _this$props.style,
        listClassName = _this$props.listClassName,
        listStyle = _this$props.listStyle,
        onFilter = _this$props.onFilter,
        onSearch = _this$props.onSearch,
        empty = _this$props.empty,
        disabled = _this$props.disabled,
        itemClass = _this$props.itemClass,
        rowsInView = _this$props.rowsInView,
        lineHeight = _this$props.lineHeight,
        listHeight = _this$props.listHeight,
        renderFilter = _this$props.renderFilter,
        children = _this$props.children;
    var selecteds = this.getSelected();
    var datumValues = datum.getValue(); // use this.props.value prioritized

    if ('value' in this.props && datumValues !== this.props.value) {
      this.props.datum.setValue(this.props.value);
    }

    var sources = [];
    var targets = [];

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      if (datum.check(d)) {
        targets.push(d);
      } else {
        sources.push(d);
      }
    }

    return React.createElement("div", _extends({
      className: classnames(transferClass('_', isRTL() && 'rtl'), className),
      style: style
    }, getDataset(this.props)), React.createElement(Context.Provider, {
      value: {
        selecteds: selecteds,
        setSelecteds: this.setSelecteds,
        itemClass: itemClass
      }
    }, React.createElement(Card, {
      title: titles[0],
      selecteds: selecteds[0],
      data: sources,
      keygen: keygen,
      renderItem: renderItem,
      setSelecteds: this.setSelecteds,
      index: 0,
      footer: footers[0],
      listClassName: listClassName,
      listStyle: listStyle,
      loading: this.getLoading(0),
      onFilter: onFilter,
      empty: empty,
      disabled: disabled,
      onSearch: onSearch,
      rowsInView: rowsInView,
      lineHeight: lineHeight,
      listHeight: listHeight,
      renderFilter: renderFilter,
      customRender: children,
      values: datumValues
    }), React.createElement(Btns, {
      selecteds: selecteds,
      datum: datum,
      setSelecteds: this.setSelecteds,
      keygen: keygen,
      sources: sources,
      targets: targets,
      operations: operations,
      operationIcon: operationIcon,
      data: data,
      disabled: disabled
    }), React.createElement(Card, {
      title: titles[1],
      selecteds: selecteds[1],
      data: targets,
      keygen: keygen,
      renderItem: renderItem,
      loading: this.getLoading(1),
      setSelecteds: this.setSelecteds,
      index: 1,
      footer: footers[1],
      listClassName: listClassName,
      listStyle: listStyle,
      onFilter: onFilter,
      empty: empty,
      disabled: disabled,
      onSearch: onSearch,
      rowsInView: rowsInView,
      lineHeight: lineHeight,
      listHeight: listHeight,
      renderFilter: renderFilter,
      customRender: children,
      values: datumValues
    })));
  };

  return Transfer;
}(PureComponent);

Transfer.defaultProps = {
  titles: [],
  data: [],
  footers: [],
  operations: [],
  operationIcon: true,
  renderItem: function renderItem(d) {
    return d;
  },
  rowsInView: 20,
  lineHeight: 32,
  listHeight: 180
};
Transfer.propTypes = {
  titles: PropTypes.array,
  data: PropTypes.array,
  datum: PropTypes.object,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  footers: PropTypes.array,
  operations: PropTypes.array,
  operationIcon: PropTypes.bool,
  value: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  selectedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  onSelectChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onFilter: PropTypes.func,
  itemClass: PropTypes.string,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onSearch: PropTypes.func,
  rowsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  listHeight: PropTypes.number,
  renderFilter: PropTypes.func,
  children: PropTypes.func
};
export default Transfer;