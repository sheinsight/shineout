"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _AbsoluteList = _interopRequireDefault(require("../AnimationList/AbsoluteList"));

var _component = require("../component");

var _tree = require("../utils/tree");

var _styles = require("../Select/styles");

var _styles2 = require("./styles");

var _Spin = _interopRequireDefault(require("../Spin"));

var FilterItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(FilterItem, _Component);

  function FilterItem(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleSelect = _this.handleSelect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSelectItem = _this.handleSelectItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    return _react.default.createElement("div", {
      className: (0, _styles2.cascaderClass)('node'),
      onClick: this.handleSelect
    }, data.map(function (item, i) {
      var content = _react.default.createElement("div", {
        onClick: _this2.handleSelectItem.bind(_this2, i),
        key: "content",
        className: (0, _styles2.cascaderClass)('filter-list-content', _this2.checkDisabled(item) && 'disabled')
      }, _this2.renderItem(item));

      if (i === 0) return content;
      return [_react.default.createElement("span", {
        key: "separator",
        className: (0, _styles2.cascaderClass)('filter-list-separator')
      }, "/"), content];
    }));
  };

  return FilterItem;
}(_component.Component); // eslint-disable-next-line react/no-multi-comp


(0, _defineProperty2.default)(FilterItem, "propTypes", {
  renderItem: _propTypes.default.func.isRequired,
  data: _propTypes.default.array,
  datum: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onPathChange: _propTypes.default.func,
  filterText: _propTypes.default.string,
  onFilter: _propTypes.default.func,
  expandTrigger: _propTypes.default.string
});

var FilterList =
/*#__PURE__*/
function (_Component2) {
  (0, _inheritsLoose2.default)(FilterList, _Component2);

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
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["data", "childrenKey", "height", "loading"]);
    var list = (0, _tree.getFlattenTree)(data, childrenKey);
    return _react.default.createElement("div", {
      className: (0, _styles2.cascaderClass)('filter-list'),
      style: {
        maxHeight: height
      }
    }, loading ? _react.default.createElement("div", {
      className: (0, _styles2.cascaderClass)('list-loading')
    }, typeof loading === 'boolean' ? _react.default.createElement(_Spin.default, {
      size: 20
    }) : loading) : list.map(function (path) {
      return _react.default.createElement(FilterItem, (0, _extends2.default)({
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
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["focus", "getRef", "fixed", "data", "childrenKey", "renderItem", "datum", "expandTrigger", "onChange", "onPathChange", "filterText", "onFilter", "height"]);
    if (!focus) return null;
    return _react.default.createElement("div", (0, _extends2.default)({}, others, {
      ref: getRef,
      className: (0, _classnames.default)((0, _styles.selectClass)('options'), (0, _styles2.cascaderClass)('filter', expandTrigger === 'hover-only' && 'leaf-only'))
    }), this.renderList());
  };

  return FilterList;
}(_component.Component);

(0, _defineProperty2.default)(FilterList, "propTypes", {
  data: _propTypes.default.array,
  focus: _propTypes.default.bool,
  getRef: _propTypes.default.func,
  fixed: _propTypes.default.any,
  childrenKey: _propTypes.default.string,
  renderItem: _propTypes.default.any,
  expandTrigger: _propTypes.default.string,
  datum: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onPathChange: _propTypes.default.func,
  filterText: _propTypes.default.string,
  onFilter: _propTypes.default.func,
  height: _propTypes.default.number,
  loading: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node])
});

var _default = (0, _AbsoluteList.default)(FilterList);

exports.default = _default;