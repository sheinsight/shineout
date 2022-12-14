import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spin from '../Spin';
import filter from './filter';
import SCard from '../Card';
import Checkbox from '../Checkbox';
import { PureComponent } from '../component';
import { transferClass } from './styles';
import { getKey } from '../utils/uid';
import { createFunc } from '../utils/func';
import { isFunc } from '../utils/is';
import Item from './item';
import LazyList from '../AnimationList/LazyList';
import { getLocale } from '../locale';
import Input from '../Input';

var Card =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Card, _PureComponent);

  function Card(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.getCheckAll = _this.getCheckAll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.checkAll = _this.checkAll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRenderItem = _this.handleRenderItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindCardBody = _this.bindCardBody.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.customSetSelected = _this.customSetSelected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      listHeight: props.listHeight,
      mounted: false
    };
    return _this;
  }

  var _proto = Card.prototype;

  _proto.getCheckAll = function getCheckAll() {
    var _this$props = this.props,
        selecteds = _this$props.selecteds,
        data = _this$props.data;
    if (selecteds.length === 0) return false;
    if (selecteds.length === data.length) return true;
    return 'indeterminate';
  };

  _proto.bindCardBody = function bindCardBody(node) {
    this.cardBody = node;
    var listHeight = this.props.listHeight;

    if (node) {
      listHeight = node.offsetHeight;
    }

    this.setState({
      listHeight: listHeight,
      mounted: true
    });
  };

  _proto.checkAll = function checkAll(c) {
    var _this$props2 = this.props,
        setSelecteds = _this$props2.setSelecteds,
        index = _this$props2.index,
        data = _this$props2.data,
        keygen = _this$props2.keygen,
        disabled = _this$props2.disabled;

    if (c) {
      if (typeof disabled === 'function') setSelecteds(index, data.reduce(function (r, d, i) {
        if (disabled(d)) return r;
        r.push(getKey(d, keygen, i));
        return r;
      }, []));else setSelecteds(index, data.map(function (d, i) {
        return getKey(d, keygen, i);
      }));
    } else {
      setSelecteds(index, []);
    }
  };

  _proto.handleRenderItem = function handleRenderItem(d, i) {
    var _this$props3 = this.props,
        keygen = _this$props3.keygen,
        index = _this$props3.index,
        renderItem = _this$props3.renderItem,
        disabled = _this$props3.disabled,
        lineHeight = _this$props3.lineHeight;
    var disable = disabled === true;
    var key = getKey(d, keygen, i);
    return React.createElement(Item, {
      lineHeight: lineHeight,
      key: key,
      disabled: disable || typeof disabled === 'function' && disabled(d),
      index: index,
      checkKey: key,
      liData: d,
      content: createFunc(renderItem)(d)
    });
  };

  _proto.customSetSelected = function customSetSelected(value) {
    var _this$props4 = this.props,
        index = _this$props4.index,
        setSelecteds = _this$props4.setSelecteds,
        selecteds = _this$props4.selecteds;

    if (typeof value === 'string') {
      setSelecteds(index, [].concat(selecteds, [value]));
      return;
    }

    if (Array.isArray(value)) {
      setSelecteds(index, value);
    }
  };

  _proto.renderLazyList = function renderLazyList() {
    var _this$props5 = this.props,
        filterText = _this$props5.filterText,
        data = _this$props5.data,
        rowsInView = _this$props5.rowsInView,
        lineHeight = _this$props5.lineHeight;
    var _this$state = this.state,
        mounted = _this$state.mounted,
        listHeight = _this$state.listHeight;
    if (!mounted) return null;
    return React.createElement(LazyList, {
      stay: !filterText,
      data: data,
      itemsInView: rowsInView,
      lineHeight: lineHeight,
      height: listHeight,
      scrollHeight: lineHeight * data.length,
      renderItem: this.handleRenderItem
    });
  };

  _proto.renderBody = function renderBody() {
    var _this$props6 = this.props,
        customRender = _this$props6.customRender,
        index = _this$props6.index,
        values = _this$props6.values,
        filterText = _this$props6.filterText;

    if (isFunc(customRender)) {
      var custom = customRender({
        onSelected: this.customSetSelected,
        direction: index === 0 ? 'left' : 'right',
        selectedKeys: this.props.selecteds,
        value: values,
        filterText: filterText
      });
      if (custom) return custom;
    }

    return this.renderLazyList();
  };

  _proto.renderFilter = function renderFilter() {
    var _this$props7 = this.props,
        onFilter = _this$props7.onFilter,
        onSearch = _this$props7.onSearch,
        renderFilter = _this$props7.renderFilter,
        filterText = _this$props7.filterText,
        disabled = _this$props7.disabled;
    if (!onFilter && !onSearch) return null;

    if (renderFilter && typeof renderFilter === 'function') {
      return React.createElement("div", {
        className: transferClass('filter')
      }, renderFilter({
        value: filterText,
        disabled: disabled === true,
        onFilter: onFilter,
        placeholder: getLocale('search')
      }));
    }

    return React.createElement("div", {
      className: transferClass('filter')
    }, React.createElement(Input, {
      disabled: disabled === true,
      onChange: onFilter,
      placeholder: getLocale('search'),
      clearable: true,
      value: filterText
    }));
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        title = _this$props8.title,
        data = _this$props8.data,
        selecteds = _this$props8.selecteds,
        footer = _this$props8.footer,
        listClassName = _this$props8.listClassName,
        listStyle = _this$props8.listStyle,
        empty = _this$props8.empty,
        disabled = _this$props8.disabled,
        loading = _this$props8.loading,
        listHeight = _this$props8.listHeight,
        customRender = _this$props8.customRender;
    var check = this.getCheckAll();
    var disable = disabled === true;
    var listms = Object.assign({}, listStyle, {
      height: listHeight
    });
    return React.createElement(SCard, {
      className: transferClass('card')
    }, React.createElement(SCard.Header, {
      className: transferClass('card-header')
    }, React.createElement("div", null, React.createElement(Checkbox, {
      onChange: this.checkAll,
      checked: check,
      disabled: disable
    }, check ? selecteds.length + " " + getLocale('selected') : getLocale('selectAll'))), React.createElement("div", {
      className: transferClass('card-header-title')
    }, title)), this.renderFilter(), React.createElement(Spin, {
      loading: loading
    }, React.createElement(SCard.Body, {
      className: classnames(transferClass('card-body'), listClassName),
      style: listms
    }, React.createElement("div", {
      className: transferClass('body-container'),
      ref: this.bindCardBody
    }, this.renderBody(), !isFunc(customRender) && data.length === 0 && React.createElement("div", {
      className: transferClass('empty')
    }, empty || getLocale('noData'))))), footer && React.createElement(SCard.Footer, {
      className: transferClass('card-footer')
    }, footer));
  };

  return Card;
}(PureComponent);

Card.propTypes = {
  selecteds: PropTypes.array,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.array,
  setSelecteds: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  index: PropTypes.number,
  footer: PropTypes.object,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFilter: PropTypes.func,
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  rowsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  listHeight: PropTypes.number,
  filterText: PropTypes.string,
  renderFilter: PropTypes.func,
  customRender: PropTypes.func,
  values: PropTypes.array
};
export default filter(Card);