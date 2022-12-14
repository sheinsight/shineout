import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import absoluteList from '../AnimationList/AbsoluteList';
import { Component } from '../component';
import { getFlattenTree } from '../utils/tree';
import { selectClass } from '../Select/styles';
import { cascaderClass } from './styles';
import Spin from '../Spin';

var FilterItem =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FilterItem, _Component);

  function FilterItem(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSelectItem = _this.handleSelectItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = FilterItem.prototype;

  _proto.checkDisabled = function checkDisabled(data) {
    var datum = this.props.datum;
    var key = datum.getKey(data);
    return datum.isDisabled(key);
  };

  _proto.handleSelectItem = function handleSelectItem(index, e) {
    var _this$props = this.props,
        data = _this$props.data,
        datum = _this$props.datum,
        onChange = _this$props.onChange,
        onPathChange = _this$props.onPathChange,
        onFilter = _this$props.onFilter,
        filterText = _this$props.filterText,
        expandTrigger = _this$props.expandTrigger;
    if (expandTrigger === 'hover-only' && index !== data.length - 1) return;
    if (e) e.stopPropagation();
    var item = this.props.data[index];
    if (this.checkDisabled(item)) return;
    var keys = data.slice(0, index + 1).map(function (i) {
      return datum.getKey(i);
    });
    onChange(keys);
    onPathChange(datum.getKey(item), item, keys.slice(0, keys.length - 1), true);
    if (onFilter && filterText) onFilter('');
  };

  _proto.handleSelect = function handleSelect() {
    var data = this.props.data;
    this.handleSelectItem(data.length - 1);
  };

  _proto.renderItem = function renderItem(item) {
    var renderItem = this.props.renderItem;
    var render = renderItem;

    if (typeof render === 'string') {
      var copyRender = render;

      render = function render(n) {
        return n[copyRender];
      };
    }

    return render(item);
  };

  _proto.render = function render() {
    var _this2 = this;

    var data = this.props.data;
    return React.createElement("div", {
      className: cascaderClass('node'),
      onClick: this.handleSelect
    }, data.map(function (item, i) {
      var content = React.createElement("div", {
        onClick: _this2.handleSelectItem.bind(_this2, i),
        key: "content",
        className: cascaderClass('filter-list-content', _this2.checkDisabled(item) && 'disabled')
      }, _this2.renderItem(item));
      if (i === 0) return content;
      return [React.createElement("span", {
        key: "separator",
        className: cascaderClass('filter-list-separator')
      }, "/"), content];
    }));
  };

  return FilterItem;
}(Component); // eslint-disable-next-line react/no-multi-comp


_defineProperty(FilterItem, "propTypes", {
  renderItem: PropTypes.func.isRequired,
  data: PropTypes.array,
  datum: PropTypes.any,
  onChange: PropTypes.func,
  onPathChange: PropTypes.func,
  filterText: PropTypes.string,
  onFilter: PropTypes.func,
  expandTrigger: PropTypes.string
});

var FilterList =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(FilterList, _Component2);

  function FilterList() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = FilterList.prototype;

  _proto2.getKey = function getKey(path) {
    var datum = this.props.datum;
    return path.map(function (d) {
      return datum.getKey(d);
    }).join('-');
  };

  _proto2.renderList = function renderList() {
    var _this3 = this;

    var _this$props2 = this.props,
        data = _this$props2.data,
        childrenKey = _this$props2.childrenKey,
        height = _this$props2.height,
        loading = _this$props2.loading,
        others = _objectWithoutPropertiesLoose(_this$props2, ["data", "childrenKey", "height", "loading"]);

    var list = getFlattenTree(data, childrenKey);
    return React.createElement("div", {
      className: cascaderClass('filter-list'),
      style: {
        maxHeight: height
      }
    }, loading ? React.createElement("div", {
      className: cascaderClass('list-loading')
    }, typeof loading === 'boolean' ? React.createElement(Spin, {
      size: 20
    }) : loading) : list.map(function (path) {
      return React.createElement(FilterItem, _extends({
        key: _this3.getKey(path)
      }, others, {
        data: path
      }));
    }));
  };

  _proto2.render = function render() {
    var _this$props3 = this.props,
        focus = _this$props3.focus,
        getRef = _this$props3.getRef,
        fixed = _this$props3.fixed,
        data = _this$props3.data,
        childrenKey = _this$props3.childrenKey,
        renderItem = _this$props3.renderItem,
        datum = _this$props3.datum,
        expandTrigger = _this$props3.expandTrigger,
        onChange = _this$props3.onChange,
        onPathChange = _this$props3.onPathChange,
        filterText = _this$props3.filterText,
        onFilter = _this$props3.onFilter,
        height = _this$props3.height,
        others = _objectWithoutPropertiesLoose(_this$props3, ["focus", "getRef", "fixed", "data", "childrenKey", "renderItem", "datum", "expandTrigger", "onChange", "onPathChange", "filterText", "onFilter", "height"]);

    if (!focus) return null;
    return React.createElement("div", _extends({}, others, {
      ref: getRef,
      className: classnames(selectClass('options'), cascaderClass('filter', expandTrigger === 'hover-only' && 'leaf-only'))
    }), this.renderList());
  };

  return FilterList;
}(Component);

_defineProperty(FilterList, "propTypes", {
  data: PropTypes.array,
  focus: PropTypes.bool,
  getRef: PropTypes.func,
  fixed: PropTypes.any,
  childrenKey: PropTypes.string,
  renderItem: PropTypes.any,
  expandTrigger: PropTypes.string,
  datum: PropTypes.any,
  onChange: PropTypes.func,
  onPathChange: PropTypes.func,
  filterText: PropTypes.string,
  onFilter: PropTypes.func,
  height: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
});

export default absoluteList(FilterList);