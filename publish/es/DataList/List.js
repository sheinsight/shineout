import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getLocale } from '../locale';
import LazyList from '../AnimationList/LazyList';
import { listClass } from './styles';
import { isFunc, isArray, isString } from '../utils/is';
import { getKey } from '../utils/uid';
import { removeStack, addStack } from '../utils/lazyload';
import Spin from '../Spin';
import getDataset from '../utils/dom/getDataset';
import Checkbox from '../Table/Checkbox';
import { isRTL } from '../config';

var Index =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Index, _Component);

  function Index(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.bindNode = _this.bindNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindObserver = _this.bindObserver.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.scrollLoading = _this.scrollLoading.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderItem = _this.renderItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.id = null;
    return _this;
  }

  var _proto = Index.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    removeStack(this.id, true);
    this.node = null;
    this.observer = null;
    this.id = null;
  };

  _proto.getItemClassName = function getItemClassName(value, index, flag) {
    var rowClassName = this.props.rowClassName;
    var base = listClass('item', flag && 'checkbox');
    if (isFunc(rowClassName)) return classnames(base, rowClassName(value, index));
    if (isString(rowClassName)) return classnames(base, rowClassName);
    return base;
  };

  _proto.getContent = function getContent(value, index) {
    var renderItem = this.props.renderItem;
    if (isFunc(renderItem)) return renderItem(value, index);
    if (isString(renderItem)) return value[renderItem];
    if (isString(value)) return value;
    return null;
  };

  _proto.scrollLoading = function scrollLoading() {
    var scrollLoading = this.props.scrollLoading;
    if (!isFunc(scrollLoading)) return;
    scrollLoading();
  };

  _proto.bindNode = function bindNode(node) {
    this.node = node;
  };

  _proto.bindObserver = function bindObserver(node) {
    this.observer = node;
    if (!node) return;
    removeStack(this.id, true);
    this.id = addStack({
      container: this.node,
      element: node,
      render: this.scrollLoading,
      offset: 20,
      noRemove: true
    });
  };

  _proto.renderCheckBox = function renderCheckBox(flag, data, index) {
    if (!flag) return null;
    var datum = this.props.datum;
    return React.createElement(Checkbox, {
      data: data,
      index: index,
      datum: datum,
      force: datum.check(data)
    });
  };

  _proto.renderItem = function renderItem(value, index) {
    var _this$props = this.props,
        keygen = _this$props.keygen,
        onChange = _this$props.onChange;
    var haveRowSelected = isFunc(onChange);
    return React.createElement("div", {
      className: this.getItemClassName(value, index, haveRowSelected),
      key: getKey(value, keygen, index)
    }, this.renderCheckBox(haveRowSelected, value, index), this.getContent(value, index));
  };

  _proto.renderList = function renderList(isEmpty) {
    var _this$props2 = this.props,
        data = _this$props2.data,
        empty = _this$props2.empty,
        keygen = _this$props2.keygen,
        fixed = _this$props2.fixed,
        rowsInView = _this$props2.rowsInView,
        lineHeight = _this$props2.lineHeight,
        value = _this$props2.value,
        colNum = _this$props2.colNum;
    if (isEmpty) return React.createElement("div", {
      className: listClass('item', 'empty')
    }, empty || getLocale('noData'));

    if (!fixed) {
      var items = data.map(this.renderItem);

      if (colNum && colNum > 1) {
        var frs = Array(colNum).fill('1fr').join(' ');
        return React.createElement("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: frs
          }
        }, items);
      }

      return items;
    }

    return React.createElement(LazyList, {
      lineHeight: lineHeight,
      data: data,
      keygen: keygen,
      renderItem: this.renderItem,
      itemsInView: rowsInView,
      force: value,
      colNum: colNum
    });
  };

  _proto.renderFooter = function renderFooter() {
    var footer = this.props.footer;
    if (isFunc(footer)) return React.createElement("div", {
      className: listClass('footer')
    }, footer());
    if (isValidElement(footer)) return React.createElement("div", {
      className: listClass('footer')
    }, footer);
    return null;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        data = _this$props3.data,
        loading = _this$props3.loading,
        style = _this$props3.style,
        size = _this$props3.size,
        bordered = _this$props3.bordered,
        fixed = _this$props3.fixed,
        height = _this$props3.height,
        scrollLoading = _this$props3.scrollLoading;
    var isEmpty = !isArray(data) || data.length <= 0;
    var ms = Object.assign({}, style, height && {
      height: height
    });
    return React.createElement("div", _extends({
      className: classnames(listClass('container', size, bordered && 'bordered', fixed && 'fixed', isRTL() && 'rtl'), this.props.className),
      style: ms,
      ref: this.bindNode
    }, getDataset(this.props)), loading && React.createElement("div", {
      className: listClass('loading')
    }, typeof loading === 'boolean' ? React.createElement(Spin, {
      size: 40
    }) : loading), React.createElement("div", {
      className: listClass('list', isEmpty && 'empty')
    }, this.renderList(isEmpty)), !isEmpty && isFunc(scrollLoading) && React.createElement("div", {
      ref: this.bindObserver
    }), this.renderFooter());
  };

  return Index;
}(Component);

Index.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  datum: PropTypes.object.isRequired,
  keygen: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.bool]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  style: PropTypes.object,
  scrollLoading: PropTypes.func,
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  bordered: PropTypes.bool,
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fixed: PropTypes.bool,
  rowsInView: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.number,
  value: PropTypes.array,
  colNum: PropTypes.number
};
Index.defaultProps = {
  size: 'default',
  loading: false,
  colNum: 1
};
Index.displayName = 'ShineoutList';
export default Index;