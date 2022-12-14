"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = require("../utils/classname");

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _Tree = _interopRequireDefault(require("../Tree"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _locale = require("../locale");

var _styles = require("./styles");

var _utils = require("./utils");

var ScaleList = (0, _AnimationList.default)(['fade', 'scale-y'], 'fast');
var DATA_PATH_KEY = '$PATH';

var OptionList =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(OptionList, _Component);

  function OptionList(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = OptionList.prototype;

  _proto.getText = function getText(key) {
    return this.props.text[key] || (0, _locale.getLocale)(key);
  };

  _proto.handleClick = function handleClick(data, _, p) {
    var _objectSpread2;

    var path = p.path;
    var _this$props = this.props,
        datum = _this$props.datum,
        onChange = _this$props.onChange;
    if (datum.disabled(data)) return;
    onChange(null, (0, _objectSpread3.default)({}, data, (_objectSpread2 = {}, _objectSpread2[DATA_PATH_KEY] = path, _objectSpread2)));
  };

  _proto.renderItem = function renderItem(data) {
    var _this$props2 = this.props,
        renderItem = _this$props2.renderItem,
        datum = _this$props2.datum;
    var content = renderItem(data);
    return _react.default.createElement("span", {
      title: typeof content === 'string' ? content : undefined,
      className: (0, _styles.selectClass)('tree-node', datum.check(data) && 'selected', datum.disabled(data) && (0, _classname.getDirectionClass)('disabled'))
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
    if (loading) return _react.default.createElement("span", {
      className: (0, _styles.selectClass)((0, _classname.getDirectionClass)('option'))
    }, typeof loading === 'boolean' ? _react.default.createElement(_Spin.default, {
      size: 20
    }) : loading);
    if (treeData.length === 0 || renderPending) return _react.default.createElement("span", {
      className: (0, _styles.selectClass)((0, _classname.getDirectionClass)('option'))
    }, emptyText || this.getText('noData'));
    return _react.default.createElement("div", {
      className: (0, _styles.selectClass)('tree-wrapper')
    }, _react.default.createElement(_Tree.default, {
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

    var result = _react.default.createElement(_react.default.Fragment, null, customHeader, this.renderTree());

    return _react.default.createElement(ScaleList, {
      getRef: getRef,
      show: focus,
      style: mergeStyle,
      "data-id": selectId,
      className: (0, _styles.selectClass)('options', 'tree')
    }, (0, _utils.getCustomList)(result, renderOptionList, loading));
  };

  return OptionList;
}(_react.Component);

OptionList.propTypes = {
  onChange: _propTypes.default.func,
  loader: _propTypes.default.func,
  defaultExpanded: _propTypes.default.arrayOf(_propTypes.default.string),
  expanded: _propTypes.default.arrayOf(_propTypes.default.string),
  renderPending: _propTypes.default.bool,
  treeData: _propTypes.default.array,
  datum: _propTypes.default.object.isRequired,
  focus: _propTypes.default.bool,
  onExpand: _propTypes.default.func,
  keygen: _propTypes.default.any,
  loading: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.bool]),
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  selectId: _propTypes.default.string,
  style: _propTypes.default.object,
  text: _propTypes.default.object,
  height: _propTypes.default.number,
  defaultExpandAll: _propTypes.default.bool,
  childrenKey: _propTypes.default.string,
  getRef: _propTypes.default.func,
  customHeader: _propTypes.default.node,
  expandIcons: _propTypes.default.array,
  emptyText: _propTypes.default.node,
  renderOptionList: _propTypes.default.func
};
var _default = OptionList;
exports.default = _default;