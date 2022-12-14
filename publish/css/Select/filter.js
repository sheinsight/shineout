"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uid = require("../utils/uid");

var _tree = require("../utils/tree");

var _Result = require("./Result");

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(_class, _React$Component);

    function _class(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        innerFilter: undefined,
        innerData: undefined,
        filterText: '',
        text: ''
      };
      _this.handleCreate = _this.handleCreate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleFilter = _this.handleFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.getResultByValues = _this.getResultByValues.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.resultCache = new Map();
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          datum = _this$props.datum,
          multiple = _this$props.multiple;

      if (prevProps.multiple !== multiple) {
        datum.limit = multiple ? 0 : 1;
      }
    };

    _proto.getTreeResult = function getTreeResult(value, prediction) {
      var _this$props2 = this.props,
          treeData = _this$props2.treeData,
          _this$props2$children = _this$props2.childrenKey,
          childrenKey = _this$props2$children === void 0 ? 'children' : _this$props2$children;
      var finded;

      var treeNode = function treeNode(children) {
        if (finded) return false;
        if (!children || children.length === 0) return false;

        for (var i = 0; i < children.length; i++) {
          var d = children[i];
          if (prediction(value, d)) finded = d;
          treeNode(d[childrenKey]);
        }

        return false;
      };

      treeNode(treeData);
      return finded;
    };

    _proto.getResult = function getResult(value) {
      var _this$props3 = this.props,
          data = _this$props3.data,
          treeData = _this$props3.treeData,
          datum = _this$props3.datum,
          onCreate = _this$props3.onCreate;

      var prediction = datum.prediction || function (v, d) {
        return v === datum.format(d);
      };

      if (treeData) return this.getTreeResult(value, prediction);

      for (var i = 0, count = data.length; i < count; i++) {
        var d = data[i];
        if (prediction(value, d)) return d;
      }

      if (onCreate) return this.handleCreate(value);
      return undefined;
    };

    _proto.getResultByValues = function getResultByValues() {
      var _this2 = this;

      var _this$props4 = this.props,
          datum = _this$props4.datum,
          noCache = _this$props4.noCache;
      var _datum$values = datum.values,
          values = _datum$values === void 0 ? [] : _datum$values;
      var result = [];
      values.forEach(function (v) {
        var res = noCache ? undefined : _this2.resultCache.get(v);

        if (!res) {
          var _res;

          res = _this2.getResult(v);
          if (res !== undefined && !noCache) _this2.resultCache.set(v, res);else if (res === undefined) res = (_res = {}, _res[_Result.IS_NOT_MATCHED_VALUE] = true, _res.value = v, _res);
        }

        if (res !== undefined) {
          result.push(res);
        }
      });
      return result;
    };

    _proto.handleFilter = function handleFilter(text, from) {
      var _this3 = this;

      if (from === void 0) {
        from = 'edit';
      }

      var _this$props5 = this.props,
          filterDelay = _this$props5.filterDelay,
          onFilter = _this$props5.onFilter,
          onCreate = _this$props5.onCreate;
      this.setState({
        text: text
      }); // not filter

      if (!text) {
        this.setState({
          filterText: '',
          innerFilter: undefined,
          innerData: undefined
        });
        if (this.timer) clearTimeout(this.timer);
        if (onFilter) onFilter(text, from);
        return;
      }

      if (onCreate) {
        var innerData = this.handleCreate(text);
        this.setState({
          innerData: innerData
        });
      }

      if (!onFilter) return;
      this.setState({
        filterText: text
      });
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        var fn = onFilter(text, from);

        if (typeof fn === 'function') {
          _this3.setState({
            innerFilter: fn
          });
        }
      }, filterDelay);
    };

    _proto.handleCreate = function handleCreate(text) {
      var onCreate = this.props.onCreate;
      var createFn = typeof onCreate === 'boolean' ? function (t) {
        return t;
      } : onCreate;
      return createFn(text);
    };

    _proto.filterTreeData = function filterTreeData() {
      var _this$props6 = this.props,
          treeData = _this$props6.treeData,
          expanded = _this$props6.expanded,
          showHitDescendants = _this$props6.showHitDescendants,
          onAdvancedFilter = _this$props6.onAdvancedFilter,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props6, ["treeData", "expanded", "showHitDescendants", "onAdvancedFilter"]);
      var innerFilter = this.state.innerFilter;
      var filterExpandedKeys = expanded;
      var newData = treeData;

      if (innerFilter) {
        filterExpandedKeys = [];
        newData = (0, _tree.getFilterTree)(treeData, innerFilter, filterExpandedKeys, function (node) {
          return (0, _uid.getKey)(node, other.keygen);
        }, other.childrenKey, showHitDescendants, undefined, {
          advanced: onAdvancedFilter
        });
      }

      return {
        treeData: newData,
        expanded: filterExpandedKeys,
        rawData: treeData
      };
    };

    _proto.filterData = function filterData() {
      var _this$props7 = this.props,
          data = _this$props7.data,
          hideCreateOption = _this$props7.hideCreateOption,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["data", "hideCreateOption"]);
      var _this$state = this.state,
          innerFilter = _this$state.innerFilter,
          innerData = _this$state.innerData;
      var newData = data;
      if (innerFilter) newData = data.filter(function (d) {
        return innerFilter(d);
      });

      if (innerData && !hideCreateOption) {
        var newKey = (0, _uid.getKey)(innerData, other.keygen, innerData);

        if (!newData.find(function (d) {
          return (0, _uid.getKey)(d, other.keygen, d) === newKey;
        })) {
          newData = [innerData].concat(newData);
        }
      }

      return {
        data: newData
      };
    };

    _proto.render = function render() {
      var _this$props8 = this.props,
          treeData = _this$props8.treeData,
          onFilter = _this$props8.onFilter,
          onCreate = _this$props8.onCreate,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props8, ["treeData", "onFilter", "onCreate"]);
      var _this$state2 = this.state,
          filterText = _this$state2.filterText,
          innerData = _this$state2.innerData,
          text = _this$state2.text;
      var filterFn = onFilter || onCreate ? this.handleFilter : undefined;
      var dataGenerator = treeData ? this.filterTreeData : this.filterData;
      var props = (0, _objectSpread2.default)({}, other, {
        filterText: filterText,
        inputText: text,
        result: this.getResultByValues(),
        inputable: !!onCreate,
        onCreate: onCreate ? this.handleCreate : undefined,
        onFilter: filterFn,
        innerData: innerData
      }, dataGenerator.call(this));
      return _react.default.createElement(Origin, props);
    };

    return _class;
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    expanded: _propTypes.default.arrayOf(_propTypes.default.string),
    data: _propTypes.default.array,
    treeData: _propTypes.default.array,
    datum: _propTypes.default.object,
    filterDelay: _propTypes.default.number,
    keygen: _propTypes.default.any,
    onFilter: _propTypes.default.func,
    onCreate: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
    value: _propTypes.default.any,
    noCache: _propTypes.default.bool,
    multiple: _propTypes.default.bool,
    showHitDescendants: _propTypes.default.bool,
    hideCreateOption: _propTypes.default.bool,
    onAdvancedFilter: _propTypes.default.bool
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    data: [],
    filterDelay: 300,
    showHitDescendants: false
  }), _temp;
};

exports.default = _default;