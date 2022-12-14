import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDirectionClass } from '../utils/classname';
import List from '../AnimationList';
import Tree from '../Tree';
import Spin from '../Spin';
import { getLocale } from '../locale';
import { selectClass } from './styles';
import { getCustomList } from './utils';
var ScaleList = List(['fade', 'scale-y'], 'fast');
var DATA_PATH_KEY = '$PATH';

var OptionList =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(OptionList, _Component);

  function OptionList(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = OptionList.prototype;

  _proto.getText = function getText(key) {
    return this.props.text[key] || getLocale(key);
  };

  _proto.handleClick = function handleClick(data, _, p) {
    var _objectSpread2;

    var path = p.path;
    var _this$props = this.props,
        datum = _this$props.datum,
        onChange = _this$props.onChange;
    if (datum.disabled(data)) return;
    onChange(null, _objectSpread({}, data, (_objectSpread2 = {}, _objectSpread2[DATA_PATH_KEY] = path, _objectSpread2)));
  };

  _proto.renderItem = function renderItem(data) {
    var _this$props2 = this.props,
        renderItem = _this$props2.renderItem,
        datum = _this$props2.datum;
    var content = renderItem(data);
    return React.createElement("span", {
      title: typeof content === 'string' ? content : undefined,
      className: selectClass('tree-node', datum.check(data) && 'selected', datum.disabled(data) && getDirectionClass('disabled'))
    }, content);
  };

  _proto.renderTree = function renderTree() {
    var _this$props3 = this.props,
        loading = _this$props3.loading,
        treeData = _this$props3.treeData,
        keygen = _this$props3.keygen,
        onExpand = _this$props3.onExpand,
        loader = _this$props3.loader,
        expanded = _this$props3.expanded,
        defaultExpanded = _this$props3.defaultExpanded,
        defaultExpandAll = _this$props3.defaultExpandAll,
        renderPending = _this$props3.renderPending,
        childrenKey = _this$props3.childrenKey,
        expandIcons = _this$props3.expandIcons,
        emptyText = _this$props3.emptyText;
    if (loading) return React.createElement("span", {
      className: selectClass(getDirectionClass('option'))
    }, typeof loading === 'boolean' ? React.createElement(Spin, {
      size: 20
    }) : loading);
    if (treeData.length === 0 || renderPending) return React.createElement("span", {
      className: selectClass(getDirectionClass('option'))
    }, emptyText || this.getText('noData'));
    return React.createElement("div", {
      className: selectClass('tree-wrapper')
    }, React.createElement(Tree, {
      radioUpdate: true,
      onClick: this.handleClick,
      line: false,
      data: treeData,
      keygen: keygen,
      renderItem: this.renderItem.bind(this),
      onExpand: onExpand,
      loader: loader,
      expanded: expanded,
      defaultExpandAll: defaultExpandAll,
      defaultExpanded: defaultExpanded,
      childrenKey: childrenKey,
      expandIcons: expandIcons
    }));
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        focus = _this$props4.focus,
        style = _this$props4.style,
        selectId = _this$props4.selectId,
        height = _this$props4.height,
        getRef = _this$props4.getRef,
        customHeader = _this$props4.customHeader,
        renderOptionList = _this$props4.renderOptionList,
        loading = _this$props4.loading;
    var mergeStyle = Object.assign({}, {
      maxHeight: height,
      overflowY: 'auto'
    }, style);
    var result = React.createElement(React.Fragment, null, customHeader, this.renderTree());
    return React.createElement(ScaleList, {
      getRef: getRef,
      show: focus,
      style: mergeStyle,
      "data-id": selectId,
      className: selectClass('options', 'tree')
    }, getCustomList(result, renderOptionList, loading));
  };

  return OptionList;
}(Component);

OptionList.propTypes = {
  onChange: PropTypes.func,
  loader: PropTypes.func,
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  expanded: PropTypes.arrayOf(PropTypes.string),
  renderPending: PropTypes.bool,
  treeData: PropTypes.array,
  datum: PropTypes.object.isRequired,
  focus: PropTypes.bool,
  onExpand: PropTypes.func,
  keygen: PropTypes.any,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selectId: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.object,
  height: PropTypes.number,
  defaultExpandAll: PropTypes.bool,
  childrenKey: PropTypes.string,
  getRef: PropTypes.func,
  customHeader: PropTypes.node,
  expandIcons: PropTypes.array,
  emptyText: PropTypes.node,
  renderOptionList: PropTypes.func
};
export default OptionList;