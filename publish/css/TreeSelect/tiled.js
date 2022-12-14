"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.advancedFilterHOC = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _Tree = _interopRequireDefault(require("../Datum/Tree"));

var _func = require("../utils/func");

var _tree = require("../utils/tree");

var _styles = require("../Tree/styles");

var _styles2 = require("./styles");

var _component = require("../component");

var _default = (0, _func.curry)(function (options, Origin) {
  var _options$dataKey = options.dataKey,
      dataKey = _options$dataKey === void 0 ? 'data' : _options$dataKey;

  var Tiled =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(Tiled, _Component);

    function Tiled(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        tileds: []
      };
      _this.getIcon = _this.getIcon.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleFilter = _this.handleFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      if (props.onAdvancedFilter) _this.genRawDatum();
      return _this;
    }

    var _proto = Tiled.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (prevProps.rawData !== this.props.rawData && this.props.onAdvancedFilter) {
        if (this.rawDatum) this.rawDatum.setData(this.props.rawData);else this.genRawDatum();
        this.forceUpdate();
      }
    };

    _proto.getFilteredDatum = function getFilteredDatum() {
      var _this$props = this.props,
          keygen = _this$props.keygen,
          childrenKey = _this$props.childrenKey;
      var data = this.props[dataKey];
      if (this.filteredDatum && this.filteredDatum.data === data) return this.filteredDatum;
      this.filteredDatum = new _Tree.default({
        data: data,
        keygen: keygen,
        childrenKey: childrenKey
      });
      return this.filteredDatum;
    };

    _proto.getIcon = function getIcon(data) {
      var _this$props2 = this.props,
          childrenKey = _this$props2.childrenKey,
          _this$props2$expanded = _this$props2.expanded,
          expanded = _this$props2$expanded === void 0 ? [] : _this$props2$expanded;

      var originIcon = _react.default.createElement("span", {
        className: (0, _styles.treeClass)('default-icon')
      });

      var key = this.rawDatum.getKey(data);
      var rawData = this.rawDatum.getDataById(key);
      if (!data || !rawData) return originIcon;
      var sameCount = data[childrenKey] && rawData[childrenKey] && data[childrenKey].length === rawData[childrenKey].length;
      if (expanded.indexOf(key) === -1) return originIcon;
      return _react.default.createElement("span", {
        className: (0, _styles2.treeSelectClass)('match', sameCount && 'full'),
        onClick: this.handleToggle.bind(this, key)
      }, _react.default.createElement("span", null));
    };

    _proto.handleFilter = function handleFilter(text, from) {
      var onFilter = this.props.onFilter;
      if (!text) this.setState({
        tileds: []
      });
      if (onFilter) onFilter(text, from);
    };

    _proto.handleToggle = function handleToggle(key, e) {
      e.stopPropagation();
      this.setState((0, _immer.default)(function (draft) {
        var index = draft.tileds.indexOf(key);
        if (index >= 0) draft.tileds.splice(index, 1);else draft.tileds.push(key);
      }));
    };

    _proto.genRawDatum = function genRawDatum() {
      var _this$props3 = this.props,
          rawData = _this$props3.rawData,
          childrenKey = _this$props3.childrenKey,
          keygen = _this$props3.keygen;
      this.rawDatum = new _Tree.default({
        data: rawData,
        childrenKey: childrenKey,
        keygen: keygen
      });
    };

    _proto.render = function render() {
      var _objectSpread2;

      var _this$props4 = this.props,
          filterText = _this$props4.filterText,
          onAdvancedFilter = _this$props4.onAdvancedFilter;
      var tileds = this.state.tileds;
      if (!filterText || !onAdvancedFilter) return _react.default.createElement(Origin, this.props);
      var expandIcons = [this.getIcon, this.getIcon];
      var filterDatum = this.getFilteredDatum();
      var data = (0, _tree.mergeFilteredTree)(filterDatum, this.rawDatum, tileds);
      var props = (0, _objectSpread3.default)({}, this.props, (_objectSpread2 = {
        onFilter: this.handleFilter,
        expandIcons: expandIcons
      }, _objectSpread2[dataKey] = data, _objectSpread2));
      return _react.default.createElement(Origin, props);
    };

    return Tiled;
  }(_component.Component);

  (0, _defineProperty2.default)(Tiled, "propTypes", {
    rawData: _propTypes.default.array,
    keygen: _propTypes.default.any,
    onFilter: _propTypes.default.func,
    childrenKey: _propTypes.default.string,
    filterText: _propTypes.default.string,
    data: _propTypes.default.array,
    expanded: _propTypes.default.array,
    onAdvancedFilter: _propTypes.default.bool
  });
  (0, _defineProperty2.default)(Tiled, "defaultProps", {
    childrenKey: 'children'
  });
  return Tiled;
});

exports.default = _default;

var advancedFilterHOC = function advancedFilterHOC(Origin) {
  return function (props) {
    // eslint-disable-next-line react/prop-types
    var onAdvancedFilter = props.onAdvancedFilter,
        onFilter = props.onFilter;
    return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
      onFilter: onAdvancedFilter || onFilter,
      onAdvancedFilter: !!onAdvancedFilter
    }));
  };
};

exports.advancedFilterHOC = advancedFilterHOC;